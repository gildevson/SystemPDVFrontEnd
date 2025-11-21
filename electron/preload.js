const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('backend', {
  onUrlReady: (callback) => {
    ipcRenderer.on("backend-url", (_, url) => callback(url));
  }
});
