// service/file.js

import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

export const updateFile = (basePath, files) => {
   // 同步递归创建目录
    mkdirp.sync(basePath)
    const filePaths = []
    for (let key in files) {
      const file = files[key]
      const ext = file.name.split('.').pop()
      // 重命名文件
      const filename = len ? `${Math.random().toString(32).substr(2)}.${ext}` : file.name
      const filePath = path.join(basePath, filename)
      const reader = fs.createReadStream(file.path)
      const writer = fs.createWriteStream(filePath)
      // 写入文件
      reader.pipe(writer)
      filePaths.push(filePath)
    }
    
    return filePaths
}