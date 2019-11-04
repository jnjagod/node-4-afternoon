require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authCtrl')
const cartCtrl = require('./controllers/cartCtrl')
const searchCtrl = require('./controllers/searchCtrl')
const { SERVER_PORT, SESSION_SECRET } = process.env
const app = express()

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.get('/api/swag', swagCtrl.read)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.post('/api/cart/:id', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)

app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} flying bagels`))