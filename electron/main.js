const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const { startBackend } = require('./api-runner');

// ===============================
// Lê a URL do backend publicada
// ===============================

function getBackendUrl() {
  const portFile = path.join(
    __dirname,
    '../../SystemPDV/publish/backend-port.txt'
  );

  if (fs.existsSync(portFile)) {
    return fs.readFileSync(portFile).toString().trim();
  }
  return null;
}


// ===============================
// Tela de splash
// ===============================

function createSplash() {
  return new BrowserWindow({
    width: 400,
    height: 260,
    frame: false,
    alwaysOnTop: true
  });
}

// ===============================
// Tela principal com Angular
// ===============================

function createMainWindow(urlBackend) {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // ⚠️ Caminho correto para o Angular build
  const angularIndex = path.join(
    __dirname,
    '../dist/frontend/browser/index.html'
  );

  console.log("📄 Carregando Angular:", angularIndex);

  win.loadFile(angularIndex);

  // Enviar URL do backend para o frontend Angular
  win.webContents.on('did-finish-load', () => {
    if (!urlBackend) {
      console.log("❌ Backend URL não encontrada!");
    }
    win.webContents.send("backend-url", urlBackend);
  });
}

// ===============================
// Inicialização do Electron
// ===============================

app.whenReady().then(async () => {
  const splash = createSplash();
  splash.loadFile(path.join(__dirname, 'splash.html'));

  // Inicia o backend publicado
  await startBackend();

  // Aguarda o backend gerar o backend-port.txt
  setTimeout(() => {
    const backendUrl = getBackendUrl();
    createMainWindow(backendUrl);
    splash.close();
  }, 2500); // pode aumentar se o backend demorar
});
