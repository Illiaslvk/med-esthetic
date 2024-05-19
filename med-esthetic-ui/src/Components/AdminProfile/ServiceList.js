import React, { useState, useEffect } from 'react';
import { request } from "../../Pages/api/axios_helper";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminProfile.css'
import AddServiceForm from "./Forms/AddServiceForm";
import EditServiceForm from "./Forms/EditServiceForm";
import AssignServiceForm from "./Forms/AssignServiceForm";

const ServiceList = () => {
    const [serviceList, setServiceList] = useState([]);
    const [isAddServiceFormVisible, setIsAddServiceFormVisible] = useState(false);
    const [isAssignServiceFormVisible, setIsAssignServiceFormVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

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

    const handleEditService = async (serviceId, updatedService) => {
        try {
            const response = await request('PUT', `/services/${serviceId}`, updatedService);
            if (response.status === 200) {
                console.log(`Service with ID ${serviceId} updated successfully`);
                fetchServiceList();
                toast.success("Service updated successfully");
                setSelectedService(null);
            } else {
                console.error('Failed to update service');
                toast.error("Failed to update service");
            }
        } catch (error) {
            console.error('Error updating service:', error.message);
            toast.error("Error updating service");
        }
    };

    const handleEditClick = (service) => {
        setSelectedService(service);
    };

    const handleDeleteService = async (serviceId) => {
        try {
            const response = await request('DELETE', `/services/delete/${serviceId}`);
            if (response.status === 200) {
                console.log(`Service with ID ${serviceId} deleted successfully`);
                fetchServiceList();
                toast.success("Service deleted successfully");
            } else {
                console.error('Failed to delete service');
                toast.error("Failed to delete service");
            }
        } catch (error) {
            console.error('Error deleting service:', error.message);
            toast.error("Error deleting service");
        }
    };

    const handleAddServiceClick = () => {
        setIsAddServiceFormVisible(true);
    };

    const handleCloseAddServiceForm = () => {
        setIsAddServiceFormVisible(false);
    };

    const handleAssignServiceClick = () => {
        setIsAssignServiceFormVisible(true);
    };

    const handleCloseAssignServiceForm = () => {
        setIsAssignServiceFormVisible(false);
    };

    return (
        <div className='service-list'>
            <div className="service-header-container">
                <h1 className="main-heading-service">Service List</h1>
                <div className="button-container">
                    <button className='assign-service-button' onClick={handleAssignServiceClick}>Assign Service</button>
                    <button className="add-service-button" onClick={handleAddServiceClick}>Add Service</button>
                </div>
            </div>
            <div className="table-container">
                <table className='service-table'>
                    <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {serviceList.map(service => (
                        <tr key={service.id}>
                            <td>{service.serviceName}</td>
                            <td>{service.duration} minutes</td>
                            <td>{service.price}</td>
                            <td>
                                <button className='edit-button' onClick={() => handleEditClick(service)}>Edit</button>
                                <button className='delete-button-serv' onClick={() => handleDeleteService(service.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isAddServiceFormVisible && (
                <AddServiceForm onClose={handleCloseAddServiceForm} onServiceAdded={fetchServiceList} />
            )}
            <ToastContainer position="bottom-right" autoClose={3000} />
            {selectedService && (
                <EditServiceForm
                    service={selectedService}
                    onSubmit={handleEditService}
                    onCancel={() => setSelectedService(null)}
                />
            )}
            {isAssignServiceFormVisible && (
                <AssignServiceForm
                    onCancel={handleCloseAssignServiceForm}
                    onServiceAssigned={fetchServiceList}
                />
            )}
        </div>
    );
};

export default ServiceList;
