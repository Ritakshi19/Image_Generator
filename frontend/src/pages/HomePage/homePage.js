import Navbar from "../common/Navbar/navbar.js";
import "./homePage.css";
const HomePage = (props) => {
  const { userPoints, setUserPoints } = props;
  return (
    <div>
      <Navbar
        page="home"
        userPoints={userPoints}
        setUserPoints={setUserPoints}
      />
      <div className="homepage-main-container">
        <h1>Welcome to the Home Page</h1>
        <p>Click on the links above to navigate to different pages</p>
      </div>
    </div>
  );
};
export default HomePage;
