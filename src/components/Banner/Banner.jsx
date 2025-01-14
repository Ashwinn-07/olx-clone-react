import React from "react";
import "./Banner.css";
import Arrow from "../../assets/Arrow.jsx";

function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <a href="#" className="category-link">
              ALL CATEGORIES
            </a>
            <Arrow></Arrow>
          </div>
          <div className="otherQuickOptions">
            <a href="#" className="category-link">
              Cars
            </a>
            <a href="#" className="category-link">
              Motorcycles
            </a>
            <a href="#" className="category-link">
              Mobile Phones
            </a>
            <a href="#" className="category-link">
              For Sale: Houses & Apartments
            </a>
            <a href="#" className="category-link">
              Scooters
            </a>
            <a href="#" className="category-link">
              Commercial Vehicles
            </a>
            <a href="#" className="category-link">
              For Rent: Houses & Apartments
            </a>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
