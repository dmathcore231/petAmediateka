import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { initLocalDataState } from './middlewares/initLocalDataState'
import { refrechAcccessTokenMiddleware } from './middlewares/refrechAcccessTokenMiddleware'
import { authRouter } from './routes/Auth'
import { contentRouter } from './routes/Content'
import { myRouter } from './routes/My'

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Vary', 'Origin')
  next()
})

app.use('/public', express.static(path.join(__dirname, '..', 'public')))

app.use(initLocalDataState)
app.use(refrechAcccessTokenMiddleware)
app.use(authRouter)
app.use(contentRouter)
app.use(myRouter)

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/petAmediateka')
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000')
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('SIGINT', async () => {
  await mongoose.disconnect()
  console.log('Server closed')
  process.exit()
})
