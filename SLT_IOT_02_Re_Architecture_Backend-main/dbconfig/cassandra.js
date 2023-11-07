
const cassandra = require('cassandra-driver');


const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINTS],
  localDataCenter: process.env.CASSANDRA_LOCAL_DATACENTER,
  keyspace: process.env.CASSANDRA_KEYSPACE,
});



client.connect(function(err) {
  if(err) {
    console.error('Unable to connect to Cassandra:', err);
  } else {
    console.log('Connected to Cassandra');
  }
});

module.exports = client;

