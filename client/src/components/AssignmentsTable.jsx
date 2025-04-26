import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssignmentTable() {
    const [data, setData] = useState([]);
    const [sortField, setSortField] = useState("start_date");
    const [asc, setAsc] = useState(false);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/project_assignments');
            console.log('Fetched Data:', res.data); // Check if data is being fetched
            let sorted = res.data.sort((a, b) => {
                let valA = a[sortField]?.full_name ?? a[sortField];
                let valB = b[sortField]?.full_name ?? b[sortField];
            
                return asc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
            });
            setData(sorted); // Fetch all records from seed.js
        } catch (err) {
            console.error("Error fetching data:", err.message);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 6000); // Fetch data every minute
        return () => clearInterval(interval);
    }, [sortField, asc]);

    const handleSort = (field) => {
        setSortField(field);
        setAsc(!asc);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('employee_id')}>Employee ID</th>
                        <th onClick={() => handleSort('employee_id')}>Employee Name</th>
                        <th onClick={() => handleSort('project_code')}>Project Name</th>
                        <th onClick={() => handleSort('start_date')}>Start Date</th>
                    </tr>
                </thead>
                <tbody>

    {data.length > 0 ? ( // Check if data is not empty
        data.map((a, i) => ( 
            <tr key={i}>
                <td>{a.employee_id?.employee_id || 'N/A'}</td>
                <td>{a.employee_id?.full_name || 'N/A'}</td>
                <td>{a.project_code?.project_name || 'N/A'}</td>
                <td>{a.start_date ? new Date(a.start_date).toLocaleDateString() : 'N/A'}</td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="4">No data available</td>
        </tr>
    )}
</tbody>
            </table>
        </div>
    );
}

export default AssignmentTable;