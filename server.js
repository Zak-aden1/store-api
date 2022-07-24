require('dotenv').config()
const express = require('express');
const connectDB = require('./db/connect')

const app = express();

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
 res.send('store api')
})

// product routes
app.use(notFoundMiddleware)
app.use(errorMiddleware)

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('server is running in port 3000');
    })
  })
  .catch(err => console.log(err))