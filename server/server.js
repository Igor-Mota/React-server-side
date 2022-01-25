import React from 'react'
import express from 'express'
import path from 'path'
import fs from 'fs'
import App from '../src/App'
import reactDomServer from 'react-dom/server'

const app = express()

const PORT = 8080;

app.use('^/$', (req, res, next) => {

  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if(err){
      console.log(err)
      return res.status(500).send('Some error happend')
    }
    
    return res.send(data.replace('<div id="root"></div>',
    ` <div id="root">${reactDomServer.renderToString(<App />)}</div>`))
  })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
  console.log(`Server is running in port:${PORT}`)
})
