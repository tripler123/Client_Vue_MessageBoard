const db = require('./conection');
const Joi = require('joi');

const schema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  subject: Joi.string().required(),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme:[
      /http?/
    ]
  })
});

const messages = db.get('messages');

function create(message) {
  if(!message.username) message.username = 'Anonymous'
  if(!message.imageURL) message.imageURL = 'http://www.losprincipios.org/images/default.jpg'
  const result = Joi.validate(message, schema);
  if(result.error == null){
    message.created = new Date();
    return messages.insert(message);
  }else {
    return Promise.reject(result.error)
  }
}
function getAll() {
  return messages.find();
}

module.exports = {
  create,
  getAll
};