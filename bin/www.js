'use strict'

const http = require('http')
const path = require('path')


const express = require('express')
const chalk = require('chalk')
const socket = require('socket.io')
const debug = require('debug')('front-end:web')
const app = express()
const www = http.createServer(app)


//Una variable de entorno para no poner el nombre del port en los parametros del sistema.
//estas variables se declaran en produccion y sirve para esconder datos sencibles como contraseñas
const port = process.env.PORT || 3000

const io = socket(www)

io.on('connect', socket => {
  //debug(`Socket.IO Cliente ${chalk.green.bold('connected')} connected with id: ${chalk.yellow.bold(socket.id)}`)
  console.log(`Socket.IO Cliente ${chalk.green.bold('connected')} connected with id: ${chalk.yellow.bold(socket.id)}`);
})

app.use(express.static(path.join(__dirname, '../public')))

//control de erroresm

function handleFatalError(err){

    console.log(`${chalk.red.bold('Error fatal:')} ${chalk.red(err.message)}`)
    console.log('Error Stack', err.stack)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

www.listen(port, ()=>{
  console.log(`Servidor Web Express escuchando peticiones en puerto ${port}`);
})
