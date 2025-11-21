const { spawn } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function isBackendRunning() {
  const portFile = path.join(
    __dirname,
    '../../SystemPDV/bin/Release/net8.0/win-x64/publish/backend-port.txt'
  );

  if (!fs.existsSync(portFile)) return false;

  try {
    const url = fs.readFileSync(portFile).toString().trim();
    await axios.get(url);
    return true;
  } catch {
    return false;
  }
}

async function startBackend() {
  const exePath = path.join(
  __dirname,
  '../../SystemPDV/publish/SistemaCaixa.exe'
);

  if (await isBackendRunning()) {
    console.log("⚠️ Backend já está rodando.");
    return;
  }

  console.log("🚀 Iniciando backend:", exePath);

  const backend = spawn(exePath, [], { detached: false });

  backend.stdout.on('data', d => console.log("[BACKEND]", d.toString()));
  backend.stderr.on('data', d => console.error("[BACKEND ERROR]", d.toString()));
}

module.exports = { startBackend };
