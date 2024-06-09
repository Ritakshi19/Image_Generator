
import { useState, useContext } from "react";
import Navbar from "../common/Navbar/navbar.js";
import "./imageGenerator.css";
import PointsContext from "../../context/pointsContext";

const ImageGntr = (props) => {
  const { userPoints, setUserPoints } = props;
  const cValue = useContext(PointsContext);
  const [searchText, setSearchText] = useState();
  const [imageSrc, setImgSrc] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const func = (e) => {
    setSearchText(e.target.value);
  };
  const handleClick = async () => {
    cValue.setUserPoints(cValue.userPoints - 1);
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/v1/images`, {
        method: "POST",
        body: JSON.stringify({
          searchText: searchText,
          userId
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data?.status === "success") {
        setImgSrc(data.data.imageUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar
        page="image-generator"
        userPoints={userPoints}
        setUserPoints={setUserPoints}
      />
      <div className="image-generator-main-container">
        <h1>Image Generator</h1>
        <p>Generate image by entering the text below</p>
      </div>
      <div className="image-search">
        <img className="image-display" src={imageSrc} />
        <input
          onChange={(e) => {
            func(e);
          }}
        ></input>
        <button onClick={handleClick}>Generate</button>
      </div>
    </div>
  );
};
export default ImageGntr;
