// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');

const start = document.getElementById('convert');
const log = document.getElementById('log');

start.addEventListener('click', () => {
  // Start conversion.
  ipcRenderer.send('converter', 'START');
});

ipcRenderer.on('log', (event, arg) => {
  log.innerHTML = arg;
});
