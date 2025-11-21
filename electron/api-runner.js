const { spawn } = require('child_process');
const path = require('path');

let backendProcess;

function startBackend() {
  const apiPath = path.join(__dirname, '../../SystemPDV/SystemPDV.exe');

  backendProcess = spawn(apiPath, [], {
    detached: false
  });

  backendProcess.stdout.on('data', data => console.log(data.toString()));
  backendProcess.stderr.on('data', data => console.error(data.toString()));
}

module.exports = { startBackend };
