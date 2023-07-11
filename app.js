const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64ad13a3046706d96cd7b015')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  User.findOne()
  .then(data => {
    if(!data){
      const user = new User({
        name: 'Abhi',
        email: 'abhi@gmail.com',
        cart: {
          items: []
        }
      })
      user.save();
    }
  });
  app.listen(3000);
})
.catch((err) => {
  console.log(err);
})