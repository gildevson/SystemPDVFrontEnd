const { spawn } = require('child_process');
const path = require('path');

let backendProcess;

function startBackend() {
  // Caminho correto após o publish
  const apiPath = path.join(__dirname,
    '../../SystemPDV/bin/Release/net8.0/win-x64/publish/SistemaCaixa.exe'
  );

  console.log("Iniciando backend em:", apiPath);

  backendProcess = spawn(apiPath, [], {
    detached: false
  });

  backendProcess.stdout.on('data', data => console.log(data.toString()));
  backendProcess.stderr.on('data', data => console.error(data.toString()));
}

module.exports = { startBackend };
