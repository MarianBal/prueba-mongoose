const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('assets'));

const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});

const kittySchema = new mongoose.Schema({
  name: String,
});

kittySchema.methods.speak = function () {
  const greeting = this.name
    ? 'Meow name is ' + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);

// const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'

// const fluffy = new Kitten({ name: 'fluffy' });
// //fluffy.speak();
// silence.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   silence.speak();
// });

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();

app.all('/', (req, res, next) => {
  console.log('¡Hello World!');
  next();
});

app.get('/', (req, res) => {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log('kittens:', kittens);
    res.json(kittens);
  });
});

app.post('/', (req, res) => {
  console.log(req.body);
  const newKitten = new Kitten({ name: req.body.name });

  newKitten.save(function (err, kitten) {
    if (err) return console.error(err);
    kitten.speak();
  });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log('kittens:', kittens);
    res.json(kittens);
  });

  res.status(200);
});

// app.delete('/:userId', (req, res) => {
//   const id = parseInt(req.params.userId);

//   users.filter((user, i) => user.id === id && users.splice(i, 1));

//   res.json(users);
// });

// app.put('/:userId/edit', (req, res) => {
//   const editUser = req.body;
//   const id = parseInt(req.params.userId);

//   users.find((user) => {
//     if (id === user.id) {
//       user.name = editUser.name;
//       user.phone = editUser.phone;
//       user.email = editUser.email;
//       user.address = editUser.address;

//       return res.json(users);
//     }

//     return '';
//   });
// });

// app.get('/search/:search', (req, res) => {
//   const searchUser = req.params.search;

//   const found = users.filter((user) => {
//     if (
//       user.name.match(searchUser.toLowerCase()) ||
//       user.email.match(searchUser) ||
//       user.address.match(searchUser) ||
//       user.phone.match(searchUser)
//     ) {
//       return user;
//     }
//     return '';
//   });
//   res.json(found.length ? found : users);
// });

// app.get('/search/', (req, res) => {
//   res.json(users);
// });

// app
//   .route('/users/')
//   .all(function (req, res, next) {
//     console.log('¡Hello World! from Router');
//     next();
//   })
//   .get((req, res) => {
//     res.json(users);
//   })

//   .post((req, res) => {
//     const newUser = req.body;

//     newUser.id = nextId(users);
//     users.push(newUser);
//     res.json(users);
//   })
//   .delete(function (req, res, next) {
//     next(new Error('not implemented'));
//   });

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
