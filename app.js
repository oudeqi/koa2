// 注意，启动文件必须用 require
require("babel-register")
({
    "presets": ["es2015", "stage-1"],
    "plugins": [
        [
          "transform-runtime",
          {
            "helpers": false,
            "polyfill": false,
            "regenerator": true,
            "moduleName": "babel-runtime"
          }
        ]
    ]
})

// 引入 koa 的主文件
require('./server.js')