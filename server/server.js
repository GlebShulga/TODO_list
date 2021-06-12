/* eslint-disable no-underscore-dangle */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import { nanoid } from 'nanoid'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log('run npm build:prod to enable ssr')
}

const template = {
  taskId: '',
  title: '',
  _isDeleted: false,
  _createdAt: 0,
  _deletedAt: 0,
  status: 'new'
}

const toWriteFile = (fileData) => {
  const text = JSON.stringify(fileData)
  writeFile(`${__dirname}/tasks/commonList.json`, text, { encoding: 'utf8' })
}

const toReadFile = () => {
  return readFile(`${__dirname}/tasks/commonList.json`, { encoding: 'utf8' }).then((file) =>
    JSON.parse(file)
  )
}

const removeSpecialFields = (tasks) => {
  return tasks
    .filter((task) => !task._isDeleted)
    .map((obj) => {
      return Object.keys(obj).reduce((acc, key) => {
        if (key[0] !== '_') {
          return { ...acc, [key]: obj[key] }
        }
        return acc
      }, {})
    })
}

const FilterDeletedTasks = (tasks) => {
  return tasks.filter((task) => !task._isDeleted)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.post('/api/v1/tasks', async (req, res) => {
  const { title } = req.body
  const newTask = {
    ...template,
    taskId: nanoid(),
    title,
    status: 'new',
    _createdAt: +new Date()
  }
  const taskList = await toReadFile()
    .then((file) => {
      const list = [...file, newTask]
      toWriteFile(list)
      return list
    })
    .catch(async () => {
      await toWriteFile([newTask])
      return [newTask]
    })
  res.json(FilterDeletedTasks(taskList))
})

server.get('/api/v1/tasks', async (req, res) => {
  const data = await toReadFile()
    .then((file) => {
      return file.sort((a, b) => b.status.localeCompare(a.status))
    })
    .then((file) => removeSpecialFields(file))
    .catch(() => {
      res.status(404)
      res.end()
    })
  res.json(data)
})

server.patch('/api/v1/tasks/:id', async (req, res) => {
  const { id } = req.params

  let { status, title } = req.body
  const statusArray = ['done', 'new', 'in progress']
  const check = statusArray.includes(status)
  if (status && !check) {
    res.status(501)
    res.json({ status: 'error', message: 'incorrect status' })
    res.end()
  }
  const data = await toReadFile()
    .then((file) => {
      return file?.map((task) => {
        if (task.taskId !== id) {
          return task
        }
        if (status === undefined) {
          status = task.status
        }
        if (title === undefined) {
          title = task.title
        }
        return { ...task, status, title }
      })
    })
    .then((file) => {
      return file.sort((a, b) => b.status.localeCompare(a.status))
    })
    .catch(() => {
      res.status(404)
      res.end()
    })
  toWriteFile(data)
  res.json(FilterDeletedTasks(data))
})

server.delete('/api/v1/tasks/:id', async (req, res) => {
  const { id } = req.params
  const data = await toReadFile()
    .then((file) =>
      file.map((task) => {
        return task.taskId !== id ? task : { ...task, _isDeleted: true, _deletedAt: +new Date() }
      })
    )
    .catch(() => {
      res.status(404)
      res.end()
    })
  await toWriteFile(data)
  res.json(FilterDeletedTasks(data))
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Just TODO List'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
