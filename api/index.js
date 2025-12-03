const express = require('express')
const cors = require('cors')
const trips = require('./trips')
const webrtc = require('./webrtc')
const notifications = require('./notifications')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/trips', trips)
app.use('/api/webrtc', webrtc)
app.use('/api/notifications', notifications)

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log('Backend running on', port))

module.exports = app
