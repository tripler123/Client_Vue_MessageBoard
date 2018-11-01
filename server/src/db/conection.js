const monk = require('monk')
const conectionString = process.env.MONGO_URI || 'localhost/messageboard';
const db = monk(conectionString);

module.exports = db;