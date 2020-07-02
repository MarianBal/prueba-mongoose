const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('assets'));

const port = 3000;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("we're connected!");
});

app.use('/users', require('./routes/users'));

// const kittySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: 'is required',
//     minlength: [3, 'is too short'],
//     maxlength: [10, 'is too long'],
//   },
//   breed: {
//     type: String,
//     required: 'is required',
//     minlength: [3, 'is too short'],
//     maxlength: [10, 'is too long'],
//   },
//   colors: [String],
// });
// kittySchema.method('meow', () => {
//   console.log('meeeeeoooooooooooow');
// });

// kittySchema.methods.speak = function () {
//   const greeting = this.name
//     ? 'Meow name is ' + this.name
//     : "I don't have a name";
//   console.log(greeting);
// };

// const Kitten = mongoose.model('Kitten', kittySchema);

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

// app.route('/edit/:kittenId').put((req, res) => {
//   Kitten.findOneAndUpdate(
//     { _id: req.params.kittenId },
//     { name: req.body.name, breed: req.body.breed, colors: req.body.colors },
//     { new: true },
//     function (err) {
//       if (err) return console.error(err);
//       res.status(200);
//     }
//   );
// });

// app
//   .route('/:kittenId/color')
//   .put((req, res) => {
//     Kitten.update(
//       { _id: req.params.kittenId },
//       { $addToSet: { colors: { $each: req.body.colors } } },
//       { new: true },
//       (error, status) => {
//         if (error) {
//           console.log(error);
//           res.status(400).send(error);
//           return;
//         }
//         Kitten.findById(req.params.kittenId, (err, kitten) => {
//           if (err) {
//             res.status(400).send(err);
//             return;
//           }
//           res.json(kitten);
//           return;
//         });
//       }
//     );
//   })
//   .delete((req, res) => {
//     Kitten.update(
//       { _id: req.params.kittenId },
//       { $pull: { colors: req.body.color } },
//       { new: true },
//       (err, success) => {
//         if (error) {
//           console.log(error);
//           res.status(400).send(error);
//           return;
//         }
//         return res.json(success);
//       }
//     );
//   });

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
