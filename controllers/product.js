const Product = require('../models/product')
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {
  // throw new Error('testing async err')
  const {featured, company, name, sort, fields } = req.query

  const queryObject = {}

  // filter
  if(featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company) {
    queryObject.company = company
  }
  if(name) {
    queryObject.name = {$regex: name, $options: 'i'}
  }

  let result = Product.find(queryObject)
  // sort logic
  if(sort) {
    // products = products.sort(sort)
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result= result.sort('createdAt')
  }

  // show only chosen fields by user
  if(fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  // limit
  // if(limit) {
  //   result = result.limit(Number(limit))
  // }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page -1) * limit;

  result = result.skip(skip).limit(limit)
  const products = await result

  res.status(200).json({products})
}

module.exports = {
  getAllProducts
}