const client = require('../../dbconfig/cassandra');
const cassandra = require('cassandra-driver');

const insertData = (req, res) => {
  // Define an array of required fields
  const requiredFields = ['b', 'device_id', 'farmid', 'hum', 'k', 'n', 'p', 'ph', 'r', 'sec', 'si', 'smois', 'stemp', 'temp', 'userid'];

  // Check if each required field is present in the request body
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `Please provide all required fields, missing: ${field}` });
    }
  }

  const query = 'INSERT INTO data_value (dataid, b, datetime, device_id, farmid, hum, k, n, p, ph, r, sec, si, smois, stemp, temp, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [cassandra.types.uuid(), req.body.b, new Date(), req.body.device_id, req.body.farmid, req.body.hum, req.body.k, req.body.n, req.body.p, req.body.ph, req.body.r, req.body.sec, req.body.si, req.body.smois, req.body.stemp, req.body.temp, req.body.userid];

  client.execute(query, params, { prepare: true }, (err) => {
    if (err) {
      console.error(err); // Log the error to the console
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).send({ message: 'Data inserted successfully' });
    }
  });
};














// const client = require('../../dbconfig/cassandra');
// const cassandra = require('cassandra-driver');

// const insertData = (req, res) => {
//   if (!req.body.value) {
//         return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//   const query = 'INSERT INTO data_value (dataid,b, datetime, device_id, farmid, hum, k, n, p, ph, r, sec, si, smois, stemp, temp, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   const params = [cassandra.types.uuid(), new Date(),req.body.b, req.body.device_id, req.body.farmid, req.body.hum, req.body.k, req.body.n, req.body.p, req.body.ph, req.body.r, req.body.sec, req.body.si, req.body.smois, req.body.stemp, req.body.temp, req.body.userid];


//   client.execute(query, params, { prepare: true }, (err) => {
//     if (err) {
//       res.status(500).send({ message: 'Internal server error' });
//     } else {
//       res.status(200).send({ message: 'Data inserted successfully' });
//     }
//   });
// };



/********************************************************************************************************************** */

//Update
/********************************************************************************************************************** */
const updateData = (req, res) => {
  // Define an array of required fields
  const requiredFields = ['dataid', 'b', 'farmid', 'hum', 'k', 'n', 'p', 'ph', 'r', 'sec', 'si', 'smois', 'stemp', 'temp', 'userid'];

  // Check if each required field is present in the request body
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `Please provide all required fields, missing: ${field}` });
    }
  }

  const query = 'UPDATE data_value SET b = ?, farmid = ?, hum = ?, k = ?, n = ?, p = ?, ph = ?, r = ?, sec = ?, si = ?, smois = ?, stemp = ?, temp = ?, userid = ? WHERE dataid = ?';
  const params = [req.body.b, req.body.farmid, req.body.hum, req.body.k, req.body.n, req.body.p, req.body.ph, req.body.r, req.body.sec, req.body.si, req.body.smois, req.body.stemp, req.body.temp, req.body.userid, req.body.dataid];

  client.execute(query, params, { prepare: true }, (err) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).send({ message: 'Data updated successfully' });
    }
  });
};









// const updateData = (req, res) => {
//     if (!req.body.id || !req.body.value) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }
  
//     const query = 'UPDATE data SET value = ? WHERE id = ?';
//     const params = [req.body.value, req.body.id];
  
//     client.execute(query, params, { prepare: true }, (err) => {
//       if (err) {
//         res.status(500).send({ message: 'Internal server error' });
//       } else {
//         res.status(200).send({ message: 'Data updated successfully' });
//       }
//     });
//   };


  /************************************************************************************************************ */

//Delete
  /*********************************************************************************************************** */

  const deleteData = (req, res) => {
    if (!req.body.dataid) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    const query = 'DELETE FROM data_value WHERE dataid = ?';
    const params = [req.body.dataid];
  
    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        res.status(500).send({ message: 'Internal server error' });
      } else {
        res.status(200).send({ message: 'Data deleted successfully' });
      }
    });
  };
  







  // const deleteData = (req, res) => {
  //   if (!req.body.id) {
  //     return res.status(400).json({ message: 'Please provide all required fields' });
  //   }
  
  //   const query = 'DELETE FROM data WHERE id = ?';
  //   const params = [req.body.id];
  
  //   client.execute(query, params, { prepare: true }, (err) => {
  //     if (err) {
  //       res.status(500).send({ message: 'Internal server error' });
  //     } else {
  //       res.status(200).send({ message: 'Data deleted successfully' });
  //     }
  //   });
  // };

  /************************************************************************************************************* */
//Fetch

  /************************************************************************************************************* */


  const fetchData = (req, res) => {
    const query = 'SELECT * FROM data_value';
  
    client.execute(query, [], { prepare: true }, (err, result) => {
      if (err) {
        res.status(500).send({ message: 'Internal server error' });
      } else {
        console.log(result.rows);
        res.status(200).send({ message: 'Data fetched successfully', data: result.rows });
      }
    });
  };


//Fetch deviceIds
const fetchDeviceIds = (req, res) => {
  const query = 'SELECT device_id FROM data_value';


  client.execute(query, [], { prepare: true }, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).send({ message: 'DeviceIds fetched successfully', data: result.rows.map(row => row.device_id) });
    }
  });
};



//fetchDataByDeviceId
const fetchDataByDeviceId = (req, res) => {
  if (!req.params.device_id) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const query = 'SELECT datetime, b, hum, k, n, p, ph, r, sec, si, smois, stemp, temp FROM data_value WHERE device_id = ?';
  const params = [req.params.device_id];

  client.execute(query, params, { prepare: true }, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).send({ message: 'Data fetched successfully', data: result.rows });
    }
  });
};

//Fetch userIds
const fetchAllUserIds = (req, res) => {
  const query = 'SELECT userid FROM data_value';

  client.execute(query, [], { prepare: true }, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      // Extract userids from result
      const userids = result.rows.map(row => row.userid);
      res.status(200).send({ message: 'User IDs fetched successfully', userids: userids });
    }
  });
};



//fetchDataByUserId
const fetchDataByUserId = (req, res) => {
  if (!req.params.userid) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const query = 'SELECT datetime, b, hum, k, n, p, ph, r, sec, si, smois, stemp, temp FROM data_value WHERE userid = ?';
  const params = [req.params.userid];

  client.execute(query, params, { prepare: true }, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.status(200).send({ message: 'Data fetched successfully', data: result.rows });
    }
  });
}





// const fetchDataByDeviceId = (req, res) => {
//   if (!req.params.device_id) {
//     return res.status(400).json({ message: 'Please provide all required fields' });
//   }

//   const query = 'SELECT timestamp, value FROM data WHERE device_id = ?';
//   const params = [req.params.device_id];

//   client.execute(query, params, { prepare: true }, (err, result) => {
//     if (err) {
//       res.status(500).send({ message: 'Internal server error' });
//     } else {
//       res.status(200).send({ message: 'Data fetched successfully', data: result.rows });
//     }
//   });
// };







module.exports = {
    insertData,
    updateData,
    deleteData,
    fetchData,
    fetchDeviceIds,
    fetchDataByDeviceId,
    fetchDataByUserId,
    fetchAllUserIds
  };