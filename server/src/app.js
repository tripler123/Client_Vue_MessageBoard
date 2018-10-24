const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const messages = require('./db/messages');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'full stack message board!'
  });
});

app.get('/messages', (req, res) => {
  messages.getAll().then((messages) => {
    res.json(messages);
  });
});

app.post('/messages', (req, res) => {
  console.log(req.body)
  messages.create(req.body).then((message) =>{
    res.json(message);
  }).catch((error)=> {
    res.status(500);
    res.json(error);
  }); 
});

//Listening Server
app.listen(app.get('port'),() => {
 console.log('server on port', app.get('port'));
});
