import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = () => {
  const [flag, setFlag] = useState("");
  const [countryData, setCountryData] = useState({
    name: "",
    flag: "",
    capital: "",
    region: "",
  });
  const [isloading, setIsLoading] = useState(false);
  //   const [display, setDisplay] = useState("none");
  const [next, setNext] = useState(false);

  const fetchFlag = async () => {
    try {
      const response = await axios
        .get("http://localhost:3000/random")
        .then((res) => res.data.data);
      setCountryData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    if (next) {
      setNext(false);
    } else {
      setNext(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFlag();
    setIsLoading(false);
    // setDisplay("block");
  }, [next]);
  return (
    <div>
      <div style={{ padding: "0.5rem", background: "grey" }}>
        <div>
          <h1>Country's Name : {countryData.name}</h1>
          {isloading ? (
            <div>Loading ...</div>
          ) : (
            <img
              style={{ height: "300px", width: "500px" }}
              src={countryData.flag}
              alt=""
            />
          )}
        </div>
        <div>
          <h2>
            Capital:{" "}
            {`${countryData.capital ? countryData.capital : "Not Designated"}`}
          </h2>
          <h2>Region: {`${countryData.region ? countryData.region : "Not Designated"}`}</h2>
        </div>
      </div>
      <button
        style={{
          marginTop: "2rem",
          padding: "0.5rem",
          color: "white",
          background: "red",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Get the Next Country
      </button>
    </div>
  );
};

export default Country;
