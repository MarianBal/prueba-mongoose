const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('assets'));

const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!");
});

const kittySchema = new mongoose.Schema({
  name: String,
  breed: String,
});

kittySchema.path('name').validate((v) => {
  return v.length > 5;
}, 'my error type');

kittySchema.path('breed').validate((v) => {
  return v.length > 5;
}, 'my error type');

kittySchema.methods.speak = function () {
  const greeting = this.name
    ? 'Meow name is ' + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model('Kitten', kittySchema);

app.all('/', (req, res, next) => {
  console.log('¡Hello World!');
  next();
});

app.get('/', (req, res) => {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    res.json(kittens);
  });
});

app.post('/', (req, res) => {
  const newKitten = new Kitten({ name: req.body.name, breed: req.body.breed });

  newKitten.save(function (err, kitten) {
    if (err) {
      console.error(err);
      return res.send(400);
    } else {
      Kitten.find((err, kittens) => {
        if (err) return console.error(err);
        res.json(kittens);
        res.status(200);
      });
    }
  });

  // Kitten.find(function (err, kittens) {
  //   if (err) return console.error(err);
  //   res.json(kittens);
  //   res.status(200);
  // });
});

app.delete('/:userId', (req, res) => {
  Kitten.findOneAndRemove({ _id: req.params.userId }, (err, kitten) => {
    if (err) return console.error(err);
    res.status(200);

    Kitten.find(function (err, kittens) {
      if (err) return console.error(err);
      res.json(kittens);
    });
  });
});

app.put('/edit/:userId', (req, res) => {
  Kitten.findOneAndUpdate(
    { _id: req.params.userId },
    { name: req.body.name, breed: req.body.breed },
    function (err) {
      if (err) return console.error(err);
      res.status(200);
    }
  );

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    res.json(kittens);
  });
});

app.get('/search/:search', (req, res) => {
  const found = [];
  console.log('found 1:', found);

  Kitten.find({ _id: req.params.search }, (err, kitten) => {
    if (err) return console.error(err);
    found.push(...kitten);
  });

  Kitten.find({ name: req.params.search }, (err, kitten) => {
    if (err) return console.error(err);

    kitten.forEach((k) => found.push(k));

    console.log('found 2: ' + found);
  });
  res.status(200);
  //found.length && res.json(found);
  console.log(found);
});

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
