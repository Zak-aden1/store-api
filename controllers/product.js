const Product = require('../models/product')
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {
  // throw new Error('testing async err')
  const {featured, company, name, sort, fields, numericFilters } = req.query

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
  if(numericFilters) {
    // queryObject.name = {$regex: name, $options: 'i'}
    console.log(numericFilters);
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<=)\b/g
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)

    const options = ['price', 'rating']
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-')
      console.log('item', value);

      if (options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)}
      }
    })
  }

  console.log(queryObject);

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

  // add pagination logic 
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