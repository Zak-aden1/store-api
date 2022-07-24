const getAllProducts = (req, res) => {
  throw new Error('testing async err')
  res.status(200).json({data: 'get all products'})
}

module.exports = {
  getAllProducts
}