import React, { useState, useEffect } from 'react';

const TotalUser = () => {
    const [usersCount, setUserCount] = useState(0);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3001/admin/user-count');
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setUserCount(data.count);
        };
    fetchUsers();
    }, []);
  return (
    <div style={{
        padding:'40px',
        width:'500px',
        height:'300px',
        margin:'10px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center ',
        justifyContent:'center'
    }}>
        <h5><b>TotalUser</b></h5>
        <div style={{ fontSize: '100px' }}><b>{usersCount}</b></div>
    </div>
  )
}

export default TotalUser