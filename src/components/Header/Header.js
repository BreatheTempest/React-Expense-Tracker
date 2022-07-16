import ProfilePicture from "../../assets/profil-picutre.svg";
import ArrowDown from "../../assets/arrow-down.svg";
import "./Header.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {

    const [title, setTitle] = useState("");
    const location = useLocation();

    useEffect(() => {
        setTitle(changeTitle());
    }, [location])

  const changeTitle = () => {
    switch (window.location.pathname) {
      case "/settings":
        return "Settings";
      case "/expenses":
        return "Expenses";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="header-container">
      <h1>{title}</h1>
      <div className="header-profile">
        <p>
          <img src={ProfilePicture} alt={ProfilePicture} />
          Mahfuzul Nabil
        </p>
        <img src={ArrowDown} alt={ArrowDown} />
      </div>
    </div>
  );
}
