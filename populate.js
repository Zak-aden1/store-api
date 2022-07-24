require('dotenv').config();

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json');

connectDB(process.env.MONGO_URI)
  .then(() => {
    Product.create(jsonProducts)
    .then(() => {console.log('success'); process.exit(0)})
    .catch(err => console.log(err))
  })
  .catch(err => {console.log(err); process.exit(1)})