const express     = require('express')
const cors        = require('cors')
var   http        = require('http')
const bodyParser  = require('body-parser')
const account     = require('./routers/accounts')
const searchBook  = require('./routers/searchBook')
const app         = express()

app.use(bodyParser.json({limit: '50mb',       extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.use(cors())

app.use('/api/accounts',  account)
app.use('/api/searchBook',  searchBook)

var httpServer = http.createServer(app)

const port = 3003

httpServer.listen(port, () => {
  console.log('HTTP Server running on port ' + port + '...')
})

module.exports = httpServer