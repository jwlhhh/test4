const express = require('express'); //npm下载并引入express模块 npm -express -D

const app = express();
console.log("========")
app.use(express.static('./dist')) // ../dist 为vue打包后dist文件夹的路径
app.listen(9081,function(err){  //9080 想要监听项目的端口号
    if(err){
        console.log(err)
    }else {
        console.log('项目启动成功')
    }
})
