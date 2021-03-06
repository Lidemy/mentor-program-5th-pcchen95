const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'commentPlugin'
  },
  devtool: 'inline-source-map'
}
