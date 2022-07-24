require('dotenv').config()
const express = require('express');

const app = express();

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
 res.send('store api')
})

app.listen(process.env.PORT)