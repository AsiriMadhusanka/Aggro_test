import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function IoTDataPage() {
  // State variables
  const [userIds, setUserIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [iotData, setIotData] = useState([]);
  const [filterByDay, setFilterByDay] = useState(false);
  const [filterByWeek, setFilterByWeek] = useState(false);
  const [filterByMonth, setFilterByMonth] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

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

  // Date range picker
const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  
  // Fetch IoT data when selected user ID changes
  useEffect(() => {
    if (selectedUserId) {
      fetch(`http://localhost:3000/data/fetchDataByUserId/${selectedUserId}`)
        .then(response => response.json())
        .then(data => {
          let filteredData = data.data;
          if (filterByDay) {
            const oneDayAgo = new Date();
            oneDayAgo.setDate(oneDayAgo.getDate() - 1);
            filteredData = filteredData.filter(item => new Date(item.datetime) > oneDayAgo);
          }
          if (filterByWeek) {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            filteredData = filteredData.filter(item => new Date(item.datetime) > oneWeekAgo);
          }
          if (filterByMonth) {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            filteredData = filteredData.filter(item => new Date(item.datetime) > oneMonthAgo);
          }
          if (startDate && endDate) {
            filteredData = filteredData.filter(item => new Date(item.datetime) >= startDate && new Date(item.datetime) <= endDate);
          }
          setIotData(filteredData);
        });
    }
  }, [selectedUserId, filterByDay, filterByWeek, filterByMonth, startDate, endDate]);

  // Buttons to filter data by day, week, and month
const handleFilterByDayButtonClick = () => {
    setFilterByDay(true);
    setFilterByWeek(false);
    setFilterByMonth(false);
  };
  
  const handleFilterByWeekButtonClick = () => {
    setFilterByDay(false);
    setFilterByWeek(true);
    setFilterByMonth(false);
  };
  
  const handleFilterByMonthButtonClick = () => {
    setFilterByDay(false);
    setFilterByWeek(false);
    setFilterByMonth(true);
  };
  
  
  // Display IoT data
  return (
    <div>
      {/* Dropdown list of user IDs */}
      <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
        <option value="">Select a user ID</option>
        {userIds.map(userId => (
          <option key={userId} value={userId}>{userId}</option>
        ))}
      </select>
  
      {/* Buttons to filter data by day, week, and month */}
      <button onClick={handleFilterByDayButtonClick}>Filter by day</button>
      <button onClick={handleFilterByWeekButtonClick}>Filter by week</button>
      <button onClick={handleFilterByMonthButtonClick}>Filter by month</button>
  
      {/* Date range picker */}
      <DateRangePicker
        startDate={startDate}
        startDateId="start_date_id"
        endDate={endDate}
        endDateId="end_date_id"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />

      {/* Display IoT data */}
      {iotData && (
        <div>
           <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="b" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hum" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="k" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="n" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="p" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="r" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sec" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="si" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="smois" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>

          <LineChart
            width={500}
            height={300}
            data={iotData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="stemp" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      )}
    </div>
  );
}

export default IoTDataPage;







/************************************************************************************************************************************ */


// import { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// function IoTDataPage() {
//   // State variables
//   const [userIds, setUserIds] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [iotData, setIotData] = useState([]);
//   const [filterByDay, setFilterByDay] = useState(false); // New state variable
//   const [filterByWeek, setFilterByWeek] = useState(false); // New state variable
//   const [filterByMonth, setFilterByMonth] = useState(false); // New state variable

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
//           // Filter data by day, week, and month if corresponding filter is true
//           let filteredData = data.data;
//           if (filterByDay) {
//             const oneDayAgo = new Date();
//             oneDayAgo.setDate(oneDayAgo.getDate() - 1);
//             filteredData = filteredData.filter(item => new Date(item.datetime) > oneDayAgo);
//           }
//           if (filterByWeek) {
//             const oneWeekAgo = new Date();
//             oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//             filteredData = filteredData.filter(item => new Date(item.datetime) > oneWeekAgo);
//           }
//           if (filterByMonth) {
//             const oneMonthAgo = new Date();
//             oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//             filteredData = filteredData.filter(item => new Date(item.datetime) > oneMonthAgo);
//           }
//           setIotData(filteredData);
//         });
//     }
//   }, [selectedUserId, filterByDay, filterByWeek, filterByMonth]); // Add filters to dependency array

//   // Buttons to filter data by day, week, and month
//   const handleFilterByDayButtonClick = () => {
//     setFilterByDay(true);
//     setFilterByWeek(false);
//     setFilterByMonth(false);
//   };

//   const handleFilterByWeekButtonClick = () => {
//     setFilterByDay(false);
//     setFilterByWeek(true);
//     setFilterByMonth(false);
//   };

//   const handleFilterByMonthButtonClick = () => {
//     setFilterByDay(false);
//     setFilterByWeek(false);
//     setFilterByMonth(true);
//   };

//   return (
//     <div>
//       {/* Dropdown list of user IDs */}
//       <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
//         <option value="">Select a user ID</option>
//         {userIds.map(userId => (
//           <option key={userId} value={userId}>{userId}</option>
//         ))}
//       </select>

//       {/* Buttons to filter data by day, week, and month */}
//       <button onClick={handleFilterByDayButtonClick}>Filter by day</button>
//       <button onClick={handleFilterByWeekButtonClick}>Filter by week</button>
//       <button onClick={handleFilterByMonthButtonClick}>Filter by month</button>

//       {/* Display IoT data */}
//       {iotData && (
//         <div>
//     <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="ph" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="b" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="hum" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="k" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="n" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="p" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="r" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="sec" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="si" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="smois" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="stemp" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </div>
//       )}
//     </div>
//   );
// }

// export default IoTDataPage;


/********************************************************************************************************************************** */


// import { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// function IoTDataPage() {
//   // State variables
//   const [userIds, setUserIds] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [iotData, setIotData] = useState([]);
//   const [filterByDay, setFilterByDay] = useState(false); // New state variable

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
//           // Filter data by day if filterByDay is true
//           if (filterByDay) {
//             const oneDayAgo = new Date();
//             oneDayAgo.setDate(oneDayAgo.getDate() - 1);
//             const filteredData = data.data.filter(item => new Date(item.datetime) > oneDayAgo);
//             setIotData(filteredData);
//           } else {
//             setIotData(data.data);
//           }
//         });
//     }
//   }, [selectedUserId, filterByDay]); // Add filterByDay to dependency array

//   // Button to filter data by day
//   const handleFilterButtonClick = () => {
//     setFilterByDay(true);
//   };

//   return (
//     <div>
//       {/* Dropdown list of user IDs */}
//       <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
//         <option value="">Select a user ID</option>
//         {userIds.map(userId => (
//           <option key={userId} value={userId}>{userId}</option>
//         ))}
//       </select>

//       {/* Button to filter data by day */}
//       <button onClick={handleFilterButtonClick}>Filter by day</button>

//       {/* Display IoT data */}
//       {iotData && (
//         <div>
//     <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="ph" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="b" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="hum" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="k" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="n" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="p" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="r" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="sec" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="si" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="smois" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="stemp" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </div>
//       )}
//     </div>
//   );
// }

// export default IoTDataPage;


/********************************************************************************************************************************** */



// import { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// function IoTDataPage() {
//   // State variables
//   const [userIds, setUserIds] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [iotData, setIotData] = useState([]);

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
//         .then(data => setIotData(data.data));
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
//         <div>
//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="ph" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="b" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="hum" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="k" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="n" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="p" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="r" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="sec" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="si" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="smois" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>

//           <LineChart
//             width={500}
//             height={300}
//             data={iotData}
//             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="datetime" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="stemp" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </div>
        
//       )}
//     </div>
//   );
// }

// export default IoTDataPage;



/************************************************************************************************************************************ */

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
