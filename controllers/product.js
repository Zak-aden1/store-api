const Product = require('../models/product')
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {
  // throw new Error('testing async err')
  const {featured, company, name } = req.query

  const queryObject = {}

  if(featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company) {
    queryObject.company = company
  }
  if(name) {
    queryObject.name = {$regex: name, $options: 'i'}
  }

  console.log(queryObject);

  const products = await Product.find(queryObject)
  res.status(200).json({products})
}

module.exports = {
  getAllProducts
}