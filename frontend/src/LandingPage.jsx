import "./styles/FooterLP.css";
import "./styles/HeaderLP.css";
import "./styles/GeneralLP.css";
import "./styles/FormLP.css";
import "./styles/Navigation.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import { checkToken } from "./global";

const cardData = [
  {
    id: 1,
    title: "WE",
  },
  {
    id: 2,
    title: "SIMPLY",
  },
  {
    id: 3,
    title: "DO",
  },
  {
    id: 4,
    title: "EVERYTHING",
  },
  {
    id: 5,
    title: "YOU",
  },
  {
    id: 6,
    title: "DESIRE",
    description: "Yes we do.",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isTokenValid = checkToken(token);

    if (isTokenValid) navigate("/trips");
  }, []);

  return (
    <>
      <section className="header">
        <img src={logo} alt="ITSM Logo" />
        <div className="navigation-bar">
          <div className="navigation-item">
            <Link to="/">About</Link>
          </div>
          <div className="navigation-item">
            <Link to="/">Contact</Link>
          </div>
          <div className="navigation-item">
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </div>
        </div>
      </section>

      <div className="slogan">
        Best <span className="buzzword">TRIP PLANNER</span> out there!
      </div>

      <section className="itsm-section">
        {cardData.map((card) => (
          <div key={card.id} className="itsm-card">
            <div className="itsm-number">
              {String(card.id).padStart(2, "0")}
            </div>
            <div className="itsm-title">{card.title}</div>
            <div className="itsm-description">{card.description}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export default LandingPage;
