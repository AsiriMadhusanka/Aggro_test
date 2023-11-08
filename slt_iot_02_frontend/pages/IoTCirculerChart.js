import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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
    <div style={{ position: 'relative', height: '110vh', backgroundColor: '#182035'}}>
      {/* Dropdown list of user IDs */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
          <option value="">Select a user ID</option>
          {userIds.map(userId => (
            <option key={userId} value={userId}>{userId}</option>
          ))}
        </select>
      </div>

      {/* Display IoT data */}
      {iotData && (
        <div>
              <div style={{position: 'absolute',top: '5%',left: '5%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Soil</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '0%', margin: '10px',color: '#98a5b8' }}>Temperature</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.temp}°C`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.temp)}
                        text={`${iotData.temp}°C`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

{/* ------------------------------------------------------------------------------------------------------------------------------------------- */}

             <div style={{position: 'absolute',top: '5%',left: '21%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Soil</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '0%', margin: '10px',color: '#98a5b8' }}>Moisture</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.smois}%`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.smois)}
                        text={`${iotData.smois} %`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */}  

             <div style={{position: 'absolute',top: '5%',left: '37%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Ambient</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '0%', margin: '10px',color: '#98a5b8' }}>Temperature</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.stemp}°C`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.stemp)}
                        text={`${iotData.stemp} °C`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */} 

              <div style={{position: 'absolute',top: '5%',left: '53%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Relative air</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '10%', margin: '10px',color: '#98a5b8' }}>Humidity</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.hum} %`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.hum)}
                        text={`${iotData.hum} %`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */} 

               <div style={{position: 'absolute',top: '5%',left: '69%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Soil</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '10%', margin: '10px',color: '#98a5b8' }}>PH</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.ph}`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.ph)}
                        text={`${iotData.ph}`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */}   

                <div style={{position: 'absolute',top: '5%',left: '85%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Soil Electrical</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '10%', margin: '10px',color: '#98a5b8' }}>Conductivity</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.sec}`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.sec)}
                        text={`${iotData.sec}`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */}    



 <div style={{position: 'absolute',top: '50%',left: '5%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Soil</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '0%', margin: '10px',color: '#98a5b8' }}>Nitrogen</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.n}ppm`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.n)}
                        text={`${iotData.n}°C`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

{/* ------------------------------------------------------------------------------------------------------------------------------------------- */}

             <div style={{position: 'absolute',top: '50%',left: '21%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Soil</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '0%', margin: '10px',color: '#98a5b8' }}>Posphorus</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.p}ppm`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.p)}
                        text={`${iotData.p} `}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */}  

             <div style={{position: 'absolute',top: '50%',left: '37%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Soil</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '0%', margin: '10px',color: '#98a5b8' }}>Potasium</h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.k}ppm`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.k)}
                        text={`${iotData.k}`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */} 

              {/* <div style={{position: 'absolute',top: '50%',left: '53%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>B</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '10%', margin: '10px',color: '#98a5b8' }}></h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.b} %`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.b)}
                        text={`${iotData.b} %`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div> */}

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */} 

               {/* <div style={{position: 'absolute',top: '50%',left: '69%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Si</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '10%', margin: '10px',color: '#98a5b8' }}></h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.ph}`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.si)}
                        text={`${iotData.si}`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div> */}

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */}   

                <div style={{position: 'absolute',top: '50%',left: '85%',width: '200px',height: '300px',backgroundColor: '#1d2941',display: 'flex',alignItems: 'center',borderRadius: '10px'}}>
                 <h5 style={{ position: 'absolute', top: '0', right: '10%', margin: '10px',color: '#98a5b8'}}>Rain fall</h5>
                 <h5 style={{ position: 'absolute', top: '5%', right: '10%', margin: '10px',color: '#98a5b8' }}></h5>
                 <h4 style={{ position: 'absolute', top: '15%', right: '5%', margin: '10px',color: '#98a5b8' }}>{`${iotData.r}mm`}</h4>
          
                    <div style={{position: 'absolute', top: '35%',left: '15%',width: '140px', height: '195px',backgroundColor: '#1d2941'}}>
                      <CircularProgressbar
                        value={Number(iotData.r)}
                        text={`${iotData.r}`}
                        styles={buildStyles({
                          pathColor: '#52c896', 
                        })}
                      />
                      <h6 style={{ position: 'absolute', top: '80%', left: '-15%', margin: '10px',color: '#98a5b8' }}>Σ  Average: 20</h6>
                    </div>
             </div>

 {/* ------------------------------------------------------------------------------------------------------------------------------------------- */}      
          </div> 
      )}
    </div>
  );
}

export default IoTDataPage;


/**************************************************************************************************************** */

// import { useState, useEffect } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// function IoTDataPage() {
//   // State variables
//   const [userIds, setUserIds] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [iotData, setIotData] = useState(null);

//   // Fetch user IDs from backend
//   useEffect(() => {
//     fetch('http://localhost:3000/data/fetchAllUserIds')
//       .then(response => response.json())
//       .then(data => {
//         // Remove duplicates
//         const uniqueUserIds = [...new Set(data.userids)];
//         setUserIds(uniqueUserIds);
//       });
//   }, []);

//   // Fetch IoT data when selected user ID changes
//   useEffect(() => {
//     if (selectedUserId) {
//       fetch(`http://localhost:3000/data/fetchDataByUserId/${selectedUserId}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log('Fetched data:', data);
//           setIotData(data.data[data.data.length - 1]); // set to the last object in the data array
//         });
//     }
//   }, [selectedUserId]);

//   return (
//     <div>
//       {/* Dropdown list of user IDs */}
//       <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
//         <option value="">Select a user ID</option>
//         {userIds.map(userId => (
//           <option key={userId} value={userId}>{userId}</option>
//         ))}
//       </select>

//       {/* Display IoT data */}
//       {iotData && (
//         <div style={{width: '100px', height: '100px'}}>
//           <CircularProgressbar
//             value={Number(iotData.temp)}
//             text={`${iotData.temp}°C`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.b)}
//             text={`${iotData.b}b`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.k)}
//             text={`${iotData.k} k`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.n)}
//             text={`${iotData.n} n`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.p)}
//             text={`${iotData.p} p`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.ph)}
//             text={`${iotData.ph} ph`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.r)}
//             text={`${iotData.r} r`}
//           />

//            <CircularProgressbar
//             value={Number(iotData.sec)}
//             text={`${iotData.sec} sec`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.si)}
//             text={`${iotData.si} si`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.smois)}
//             text={`${iotData.smois} smois`}
//           />

//           <CircularProgressbar
//             value={Number(iotData.stemp)}
//             text={`${iotData.stemp} stemp`}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default IoTDataPage;













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