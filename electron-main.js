/** Electron desktop client start script **/
const {app, BrowserWindow} = require('electron');
let mainWindow;
app.on('window-all-closed', function () {
    app.quit();
});
const webPreferences = { devTools: false };
app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 1024, height: 768, webPreferences: webPreferences});
    mainWindow.setTitle(require('./package.json').name);
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    if(webPreferences.devTools)
        mainWindow.openDevTools();
});
