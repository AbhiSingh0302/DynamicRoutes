const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://abhi:Pranshu_0302@cluster0.yl1q0b8.mongodb.net/?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected');
    callback(client);
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = mongoConnect;