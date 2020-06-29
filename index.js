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
  colors: [String],
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

// app.put('/edit/:kittenId', (req, res) => {
//   Kitten.findOneAndUpdate(
//     { _id: req.params.kittenId },
//     { name: req.body.name, breed: req.body.breed, colors: req.body.colors },
//     { new: true },
//     function (err) {
//       if (err) return console.error(err);
//       res.status(200);
//     }
//   );

//   Kitten.find(function (err, kittens) {
//     if (err) return console.error(err);
//     res.json(kittens);
//   });
// });

// app.put('/:kittenId/color', (req, res) => {
//   Kitten.update(
//     { _id: req.params.kittenId },
//     { $push: { colors: req.body.color } },
//     { new: true },
//     function (error, success) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(success);
//       }
//     }
//   );
//   Kitten.find(function (err, kittens) {
//     if (err) return console.error(err);
//     res.json(kittens);
//   });
// });

// app.delete('/:kittenId/color', (req, res) => {
//   Kitten.update(
//     { _id: req.params.kittenId },
//     { $pull: { colors: req.body.color } },
//     { new: true },
//     function (err, success) {
//       if (err) return console.error(err);
//       res.status(200);
//       Kitten.find(function (err, kittens) {
//         if (err) return console.error(err);
//         res.json(kittens);
//       });
//       return;
//     }
//   );
// });

app
  .route('/')
  .all((req, res, next) => {
    console.log('¡Hello World!');
    next();
  })

  .get((req, res) => {
    Kitten.find(function (err, kittens) {
      if (err) return console.error(err);
      res.json(kittens);
    });
  })
  .post((req, res) => {
    const newKitten = new Kitten({
      name: req.body.name,
      breed: req.body.breed,
      colors: req.body.colors,
    });

    newKitten.save(function (err, kitten) {
      if (err) {
        console.error(err);
        for (let key in err.errors) {
          let error = err.errors[key];
          console.log(error);
        }
        res.status(400).json(err);
        return;
      } else {
        Kitten.find((err, kittens) => {
          if (err) {
            res.status(400);
            return;
          }
          res.status(200);
          res.json(kittens);
        });
      }
    });
  });

app.route('/:kittenId').delete((req, res) => {
  Kitten.findOneAndRemove(
    { _id: req.params.kittenId },
    { new: true },
    (err, kitten) => {
      if (err) return console.error(err);
      res.status(200);

      Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        res.json(kittens);
      });
    }
  );
});

app.route('/edit/:kittenId').put((req, res) => {
  Kitten.findOneAndUpdate(
    { _id: req.params.kittenId },
    { name: req.body.name, breed: req.body.breed, colors: req.body.colors },
    { new: true },
    function (err) {
      if (err) return console.error(err);
      res.status(200);
    }
  );
});

app
  .route('/:kittenId/color')
  .put((req, res) => {
    Kitten.update(
      { _id: req.params.kittenId },
      { $addToSet: { colors: { $each: req.body.colors } } },
      { new: true },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    Kitten.find(function (err, kittens) {
      if (err) return console.error(err);
      res.json(kittens);
    });
  })
  .delete((req, res) => {
    Kitten.update(
      { _id: req.params.kittenId },
      { $pull: { colors: req.body.color } },
      { new: true },
      function (err, success) {
        if (err) return console.error(err);
        res.status(200);
        Kitten.find(function (err, kittens) {
          if (err) return console.error(err);
          res.json(kittens);
        });
        return;
      }
    );
  });

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
