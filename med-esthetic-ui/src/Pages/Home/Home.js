import React from "react";
import "./Home.css";

const Home = () => {

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to MedEsthetic</h1>
                <p>Your journey to beauty and health starts here.</p>
            </header>
            <section className="home-content">
                <div className="home-services">
                    <h2>Our Services</h2>
                    <p>Explore our wide range of services designed to give you the care you deserve.</p>
                </div>
                <div className="home-testimonials">
                    <h2>What Our Clients Say</h2>
                    <p>"I had an amazing experience at MedEsthetic. Highly recommend!"</p>
                </div>
            </section>
            <footer className="home-footer">
                <p>Contact us for more information.</p>
            </footer>
        </div>
    );
};

export default Home;
