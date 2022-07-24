require('dotenv').config()
require('express-async-errors');

const express = require('express');
const connectDB = require('./db/connect');
const productRouter = require('./routes/product');

const app = express();

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
 res.send('store api')
})

app.use('/api/v1/products', productRouter)

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