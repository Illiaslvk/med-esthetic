import React, { useState, useEffect } from 'react';
import { request } from "../api/axios_helper";
import 'react-toastify/dist/ReactToastify.css';
import './Services.css'
const Services = () => {
    const [serviceList, setServiceList] = useState([]);

    useEffect(() => {
        fetchServiceList();
    }, []);

    const fetchServiceList = async () => {
        try {
            const response = await request('GET', '/services/admin/list');
            if (response.status === 200) {
                setServiceList(response.data);
            } else {
                console.error('Failed to fetch service list');
            }
        } catch (error) {
            console.error('Error fetching service list:', error.message);
        }
    };

    return (
        <div className='service-list-page'>
            <div className="service-header-container-page">
                <h1 className="main-heading-service">Welcome to our Service page!</h1>
            </div>
            <div className="table-container">
                <table className='service-table-page'>
                    <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {serviceList.map(service => (
                        <tr key={service.id}>
                            <td>{service.serviceName}</td>
                            <td>{service.duration} minutes</td>
                            <td>{service.price}</td>
                            <td>{service.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Services;
