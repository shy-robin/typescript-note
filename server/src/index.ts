import express from "express"
import loginRouter from "./routes/login"
import bodyParser from "body-parser"
import cookieSession from "cookie-session"

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cookieSession({
  keys: ['jfsafdfd']
}))

app.use(loginRouter)

app.listen(3000, () => {
  console.log('listening on port 3000...')
})
