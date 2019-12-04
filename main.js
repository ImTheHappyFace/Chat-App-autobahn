/*jshint esversion: 6 */
const { app, BrowserWindow , Notification, ipcMain, Tray , Menu , application } = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var AutoLaunch = require('auto-launch');
const path = require('path');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },

  });
  // and load the index.html of the app.
  win.loadFile('index.html');

  win.setMenuBarVisibility(false);
  //
  // Open the DevTools.
  win.webContents.openDevTools();

  win.setIcon(path.join(__dirname, 'assets/icons/png/electron.png'));

  // Emitted when the window is closed.
  win.on('close', function (event) {
      if (!app.isQuiting) {
        event.preventDefault();
        win.hide();
        event.returnValue = null;
      }
    });

}

    //menu

app.on('ready',function(){
  createWindow()
  Menu.setApplicationMenu(null);
});

function createAddWindow(){
  AddWindow = new BrowserWindow({
    width: 200,
    height: 200,
    title:'Settings'
});

AddWindow.setMenuBarVisibility(false);

AddWindow.loadFile('sub.html');

AddWindow.setIcon(path.join(__dirname, 'assets/icons/png/settings.png'))

// Emitted when the window is closed.
AddWindow.on('closed', () => {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  AddWindow = null;
});
}

//tray

let tray = null;
  app.on('ready', () => {
  tray = new Tray(path.join(__dirname, 'assets/icons/png/tray.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
               label: 'Show App', click: function () {
                   win.show();
               }
           },
           {
             label:'Settings',
             click(){
               createAddWindow();
             }
           },
           {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();
            }
        }
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);


      win.on('close', function (event) {
          win.hide();
      })


});

// app.on('ready', createWindow);
//
// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

  //auto-launch

var minecraftAutoLauncher = new AutoLaunch({
    name: 'My-First-App',
    path: process.execPath
});

minecraftAutoLauncher.enable();

//minecraftAutoLauncher.disable();

minecraftAutoLauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    minecraftAutoLauncher.enable();
})
.catch(function(err){
    // handle error
});

function onSubmit() {
  app.on('window-all-closed', () => {
    app.quit()
  })
}
