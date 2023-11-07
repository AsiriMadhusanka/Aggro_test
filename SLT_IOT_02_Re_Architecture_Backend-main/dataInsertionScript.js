const axios = require('axios');
const cassandra = require('cassandra-driver');

// Define the columns that each value in the tuple corresponds to
const columns = ['b', 'device_id', 'farmid',"datetime", 'hum', 'k', 'n', 'p', 'ph', 'r', 'sec', 'si', 'smois', 'stemp', 'temp', 'userid'];

// Convert the data set into an array of objects
const dataset = [
 [6.4, '550e8400-d29b-41d4-a716-446655440002', '550e8400-f29b-41d4-a716-446655440002','2023-11-04 19:28:39.138000+0000', 16.69, 29.7, 49.4, 34, 0.5, 7, 2, 1, 4, 202, 0, '550e8400-e29b-41d4-a716-446655440002'],
 // Add more data here
].map(row => {
 let obj = {};
 columns.forEach((column, i) => {
 obj[column] = row[i];
 });
 return obj;
});

let index = 0;

setInterval(() => {
 const data = dataset[index];

 // generate UUIDs for dataid, userid, and farmid
//  data.dataid = cassandra.types.uuid();
//  data.userid = cassandra.types.uuid();
//  data.farmid = cassandra.types.uuid();

//  // assign device_id from dataset to device_id in data_value table
//  data.device_id = data.device_id;

 // assign temp from dataset to temp in data_value table
 data.temp = data.hum;

 // assign other fields from dataset to data_value table
 data.farmid = farmid.toString()
 data.device_id = device_id.toString();
 data.userid = dataid.toString();
 data.datetime = (data.datetime);
 data.smois = data.smois.toString();
 data.hum = data.hum.toString();
 data.stemp = data.stemp.toString();
 data.sec = data.sec.toString();
 data.ph = data.ph.toString();
 data.n = data.n.toString();
 data.p = data.p.toString();
 data.k = data.k.toString();
 data.r = data.r.toString();
 data.si = data.si.toString();
 data.b = data.b.toString();

 axios.post('http://localhost:3000/data/insert', data)
   .then(response => {
     console.log(response.data.message);
   })
   .catch(error => {
     console.error(error);
   });

 // Move to the next data in the dataset
 index = (index + 1) % dataset.length;

}, 2000);
