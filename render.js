const electron = require('electron')
const fs = require('fs')

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
    subwin = window.open('./popup_page.html','popup')
}
// 关闭子窗口
function closeWindow() {
    // 将子窗口的对象关闭
    subwin.close()
}
// 监听子窗口 向父窗口发送信息
window.addEventListener('message',(msg)=>{
    console.log('接收到的消息:',msg)
})

