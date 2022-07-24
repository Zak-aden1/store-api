const Product = require('../models/product')
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {
  // throw new Error('testing async err')
  const {featured, company, name, sort } = req.query

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

  let result = Product.find(queryObject)
  if(sort) {
    // products = products.sort(sort)
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result= result.sort('createdAt')
  }
  const products = await result

  res.status(200).json({products})
}

module.exports = {
  getAllProducts
}