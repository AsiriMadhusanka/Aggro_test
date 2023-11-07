import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function IoTDataPage() {
  // State variables
  const [userIds, setUserIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [iotData, setIotData] = useState(null);

  // Fetch user IDs from backend
  useEffect(() => {
    fetch('http://localhost:3000/data/fetchAllUserIds')
      .then(response => response.json())
      .then(data => {
        // Remove duplicates
        const uniqueUserIds = [...new Set(data.userids)];
        setUserIds(uniqueUserIds);
      });
  }, []);

  // Fetch IoT data when selected user ID changes
  useEffect(() => {
    if (selectedUserId) {
      fetch(`http://localhost:3000/data/fetchDataByUserId/${selectedUserId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data);
          setIotData(data.data[data.data.length - 1]); // set to the last object in the data array
        });
    }
  }, [selectedUserId]);

  return (
    <div>
      {/* Dropdown list of user IDs */}
      <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
        <option value="">Select a user ID</option>
        {userIds.map(userId => (
          <option key={userId} value={userId}>{userId}</option>
        ))}
      </select>

      {/* Display IoT data */}
      {iotData && (
        <div style={{width: '100px', height: '100px'}}>
          <CircularProgressbar
            value={Number(iotData.temp)}
            text={`${iotData.temp}°C`}
          />

          <CircularProgressbar
            value={Number(iotData.b)}
            text={`${iotData.b}b`}
          />

          <CircularProgressbar
            value={Number(iotData.k)}
            text={`${iotData.k} k`}
          />

          <CircularProgressbar
            value={Number(iotData.n)}
            text={`${iotData.n} n`}
          />

          <CircularProgressbar
            value={Number(iotData.p)}
            text={`${iotData.p} p`}
          />

          <CircularProgressbar
            value={Number(iotData.ph)}
            text={`${iotData.ph} ph`}
          />

          <CircularProgressbar
            value={Number(iotData.r)}
            text={`${iotData.r} r`}
          />

           <CircularProgressbar
            value={Number(iotData.sec)}
            text={`${iotData.sec} sec`}
          />

          <CircularProgressbar
            value={Number(iotData.si)}
            text={`${iotData.si} si`}
          />

          <CircularProgressbar
            value={Number(iotData.smois)}
            text={`${iotData.smois} smois`}
          />

          <CircularProgressbar
            value={Number(iotData.stemp)}
            text={`${iotData.stemp} stemp`}
          />
        </div>
      )}
    </div>
  );
}

export default IoTDataPage;













/*********************************************************************************************************************** */





// import { useState, useEffect } from 'react';

// function IoTDataPage() {
//  // State variables
//  const [userIds, setUserIds] = useState([]);
//  const [selectedUserId, setSelectedUserId] = useState(null);
//  const [iotData, setIotData] = useState(null);

//  // Fetch user IDs from backend
//  useEffect(() => {
//    fetch('http://localhost:3000/data/fetchAllUserIds')
//      .then(response => response.json())
//      .then(data => {
//        // Remove duplicates
//        const uniqueUserIds = [...new Set(data.userids)];
//        setUserIds(uniqueUserIds);
//      });
//  }, []);

//  // Fetch IoT data when selected user ID changes
//  useEffect(() => {
//    if (selectedUserId) {
//      fetch(`http://localhost:3000/data/fetchDataByUserId/${selectedUserId}`)
//        .then(response => response.json())
//        .then(data => setIotData(data.data));
//    }
//  }, [selectedUserId]);

//  return (
//    <div>
//      {/* Dropdown list of user IDs */}
//      <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
//        <option value="">Select a user ID</option>
//        {userIds.map(userId => (
//          <option key={userId} value={userId}>{userId}</option>
//        ))}
//      </select>

//      {/* Display IoT data */}
//      {iotData && (
//        <div>
//          {/* Replace this with how you want to display the IoT data */}
//          <pre>{JSON.stringify(iotData, null, 2)}</pre>
//        </div>
//      )}
//    </div>
//  );
// }

// export default IoTDataPage;