const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));