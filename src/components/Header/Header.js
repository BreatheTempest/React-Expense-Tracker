import ProfilePicture from "../../assets/profil-picutre.svg";
import ArrowDown from "../../assets/arrow-down.svg";
import "./Header.css";

export default function Header() {
    
  const changeTitle = () => {
    switch (window.location.pathname) {
      case "/settings":
        return "Settings";
      case "/transactions":
        return "Expenses";
      default:
        return "Dashboard";
    }
  };

  const title = changeTitle()

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
