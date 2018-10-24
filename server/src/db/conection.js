const monk = require('monk')
const conectionString = 'localhost/messageboard';
const db = monk(conectionString);

module.exports = db;