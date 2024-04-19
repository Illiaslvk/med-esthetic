import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchMessages } from "../../Components/services/userService";

const Home = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessagesB();
    }, []);

    const fetchMessagesB = async () => {
        try {
            const response = await fetchMessages();
            setMessages(response);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to MedEsthetic</h1>
                <p>Your journey to beauty and health starts here.</p>
            </header>

            <section className="home-content">
                <div className="row">
                    <div className="col-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Backend response</h5>
                                <p className="card-text">Content:</p>
                                <ul>
                                    {messages.map((message, index) => (
                                        <li key={index}>{message}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-services">
                    <h2>Our Services</h2>
                    <p>Explore our wide range of services designed to give you the care you deserve.</p>
                </div>
                <div className="home-testimonials">
                    <h2>What Our Clients Say</h2>
                    <p>"I had an amazing experience at MedEsthetic. Highly recommend!" - Jane Doe</p>
                </div>
            </section>

            <footer className="home-footer">
                <p>Contact us for more information.</p>
            </footer>
        </div>
    );
};

export default Home;
