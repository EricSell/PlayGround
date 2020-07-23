const { app, BrowserWindow,screen,ipcMain,ipcRenderer } = require('electron')

function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // web选项
    webPreferences: {
      nodeIntegration: true,
      // 使用webview
      webviewTag:true,
      enableRemoteModule: true,
    },


    // 开启无边框模式
    // frame:false,

    // "优雅"的显示
    show:false,
    // backgroundColor:'#ff0000',

  })

  // 只调用一次, 显示主窗口
  win.once('ready-to-show',()=>{
    win.show()
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')



  // 子窗口,绑定父窗口后,与父窗口同时存在
  childWin = new BrowserWindow({
    // 绑定父窗口
    parent:win,
    // 设置模态窗口, 此时对父窗口不可操作
    // modal:true,
    show:false,
  })

  // 打开开发者工具
  win.webContents.openDevTools()
  win.webContents.on('did-finish-load',() => {
    console.log('---did finish load---')
  })
  win.webContents.on('dom-ready',() => {
    console.log('---dom-ready---')
  })

  win.loadURL('./index.html')
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 通信 -> 子窗口
// ipcMain.on('say-hello',(event,arg)=>{
//   console.log(arg)
//   event.reply('hello~','lala')
// })


// app.on('activate', () => {
//   // 在macOS上，当单击dock图标并且没有其他窗口打开时，
//   // 通常在应用程序中重新创建一个窗口。
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })

app.on('browser-window-focus', () => {
  // console.log(111)
})

// app.on('browser-window-blur',()=>{
//     app.quit()
// })

// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。

// 在主进程中.
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.reply('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })
// global.shareObject = {
//   msg:'nihao'
// }

// 全局对象 可用作临时存储
global.temp_data = {
  msg: 'hello',
  son:'',
}
// require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
// ipcRenderer.on('ping', (event, message) => {
//   console.log(message) // Prints 'whoooooooh!'
// })
const  electron = require('electron')


