import "./navbar.css";
import { Link } from "react-router-dom";
import PointsContext from "../../../context/pointsContext";
import { useContext } from "react";
const Navbar = (props) => {
  const contextValues = useContext(PointsContext);
  // console.log(contextValues);
  const user = JSON.parse(localStorage.getItem("user"));

  const page = props.page;
  const customColor = (x) => {
    return { color: page === x ? "red" : "white" };
  };
  // console.log(props.page);
  return (
    <div className="header-parent-container">
      <div className="left">
        <Link to="/" style={customColor("home")}>
          Home
        </Link>
        <Link to="/imagegenerator" style={customColor("image-generator")}>
          Image Generator
        </Link>
        <Link to="/history" style={customColor("history")}>
          History
        </Link>
        <Link to="/signup" style={customColor("signup")}>
          Signup
        </Link>
        <Link to="/login" style={customColor("login")}>
          Login
        </Link>

      </div>
      <div className="right" style={{ color: "brown", padding: "4px" }}>
        {contextValues.userPoints}
        <p style={
          {
            color: "white",
            fontSize: "12px"
          }
        }>
          {user?.email}
        </p>
      </div>
      {contextValues.isLoggedIn &&
        <button onClick={contextValues.logout}>Logout</button>
      }
    </div>
  );
};
export default Navbar;
