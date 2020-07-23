const electron = require('electron')
const fs = require('fs')
const BrowserWindow = electron.remote.BrowserWindow;
const screen =  electron.screen
const ipcRenderer = electron.ipcRenderer
const remote = electron.reomte

// webview 实例
// const wb = document.getElementById('wb')
// const loading = document.getElementById('loading')
// wb.addEventListener('did-start-loading', ()=>{
//     loading.innerHTML = 'loading...';
// })
// wb.addEventListener('did-stop-loading', ()=>{
//     loading.innerHTML = 'loading finish';
//     // 注册css
//     wb.insertCSS(`
//         #su{
//             background:red !important;
//         }
//     `)
//     // 注入脚本
//     wb.executeJavaScript(`
//         setTimeout(()=>{
//             console.log(document.getElementById('su').value)
//         },2000);
//     `)
//     // 打开渲染器的中webview的控制台
//     // wb.openDevTools()
// })
//



function getProcessInfo(){
    console.log("getCPUUsage", process.getCPUUsage());
    console.log("env", process.env);
    console.log("arch", process.arch);
    console.log("platform", process.platform);
}
// 拖动实例
const dragWrapper = document.getElementById('drag_test');
dragWrapper.addEventListener('drop',(e)=>{
    e.preventDefault();
    const file = e.dataTransfer.files;
    if(file && file.length > 0){
        const path = file[0].path
        console.log('path:',path);
        const content = fs.readFileSync(path);
        console.log(content.toString())
    }
})
dragWrapper.addEventListener('dragover',(e)=>{
    e.preventDefault()
})


// 开启子窗口
function openNewWindow() {
    // subwin = window.open('./popup_page.html','popup')
    // 查找父窗口
    browser_list = BrowserWindow.getAllWindows()
    for(let i=0;i<browser_list.length;i++){
        if(browser_list[i].title == "Hello World!"){
            win_browser =  browser_list[i]
        }
    }
    // 保存全局对象
    require('electron').remote.getGlobal('temp_data').msg = win_browser

    const subwin = new BrowserWindow({
        width: 800,
        height: 600,
        // 绑定父窗口
        parent:win_browser,
        // web选项
        webPreferences: {
            nodeIntegration: true,
        },
    })
    require('electron').remote.getGlobal('temp_data').son = subwin

    subwin.loadFile('./popup_page.html')

    // subwin.on('move',()=>{
    //     console.log('x:',screen.getPrimaryDisplay().workAreaSize.width)
    //     console.log('y:',screen.getPrimaryDisplay().workAreaSize.width)
    // })
    // console.log(ipcRenderer.sendSync('say-hello', 'lala'))

}

// 关闭子窗口
function closeWindow() {
    let browser_list = BrowserWindow.getAllWindows()
    let current_borwser = () => {
        for(let i=0;i<browser_list.length;i++){
            let current_browser = browser_list[i]
            if(current_browser.title == 'Title'){
                console.log(current_browser.title)
                return current_browser
            }
        }
    }

    console.log(browser_list)
    // 将子窗口的对象关闭
    current_borwser().close()
}


// move移动
//在渲染器进程 (网页) 中。
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"



// 监听子窗口的信息
ipcRenderer.on('render-info', (event, arg) => {
    console.log(999999999,arg)
});
