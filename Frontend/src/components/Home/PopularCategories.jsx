import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Graphics & Design", icon: <MdOutlineDesignServices /> },
    { id: 2, title: "Mobile App Development", icon: <TbAppsFilled /> },
    { id: 3, title: "Frontend Web Development", icon: <MdOutlineWebhook /> },
    { id: 4, title: "MERN STACK Development", icon: <FaReact /> },
    { id: 5, title: "Account & Finance", icon: <MdAccountBalance /> },
    {
      id: 6,
      title: "Artificial Intelligence",
      icon: <GiArtificialIntelligence />,
    },
    { id: 7, title: "Video Animation", icon: <MdOutlineAnimation /> },
    { id: 8, title: "Game Development", icon: <IoGameController /> },
  ];

  const handleCategoryClick = (category) => {
    // Navigate to a static route or perform any client-side action
    navigate(`/category/${category}`);
  };

  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => (
          <div
            className="card"
            key={element.id}
            onClick={() => handleCategoryClick(element.title)}
            style={{ cursor: "pointer" }} // Added cursor pointer style for better UX
          >
            <div className="icon">{element.icon}</div>
            <div className="text">
              <p>{element.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
