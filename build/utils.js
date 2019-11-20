const path = require('path')

exports.resolve = (_path) => path.join(__dirname, '..', _path)