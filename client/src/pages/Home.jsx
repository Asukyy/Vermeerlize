import React, { useEffect, useState } from 'react';
import bannerlogo from '../assets/dkx22ajr63lbzud9wbsp.png';
import '../styles/Home.css';

const Home = ({ user }) => {


  return (
    <div className="home-container">
      {/* Banner Section */}
      <div className="banner">
        <img src={bannerlogo} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Your Creative Space</h1>
          <p>Connect with creators around the world and share your passion for art and design</p>
        </div>
      </div>

      {/* Titles Section */}
      <div className="home-titles">
        <button className="title-button radius-title-button-start">Realtime Canvas</button>
        <button className="title-button">Realtime Gen</button>
        <button className="title-button">Motion</button>
        <button className="title-button">Image Creation</button>
        <button className="title-button radius-title-button-end">Canvas Editor</button>
      </div>

      <div className="featured-guides">
        <h2 className="home-text-spe">Featured Guides</h2>
        <div className="cards-grid">
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Guide 1" />
            <p>Guide 1</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Guide 2" />
            <p>Guide 2</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Guide 3" />
            <p>Guide 3</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Guide 4" />
            <p>Guide 4</p>
          </div>
        </div>
      </div>

      <div className="community-creations">
        <h2 className="home-text-spe">Community Creations</h2>
        <div className="cards-grid">
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Creation 1" />
            <p>Creation 1</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Creation 2" />
            <p>Creation 2</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Creation 3" />
            <p>Creation 3</p>
          </div>
          <div className="card">
            <img src="https://via.placeholder.com/300x200" alt="Creation 4" />
            <p>Creation 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
