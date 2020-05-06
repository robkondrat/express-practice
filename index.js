const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'action'},
  { id: 2, name: 'comedy'},
  { id: 3, name: 'romance'},
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The course with the given ID was not found');
  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const genre = {
    id: genres.length + 1, 
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));

  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }

  genre.name = req.body.name;
  res.send(genre);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
};