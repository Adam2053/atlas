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
  const [options, setOptions] = useState([]);

  const [isloading, setIsLoading] = useState(false);
  //   const [display, setDisplay] = useState("none");
  const [next, setNext] = useState(false);

  const fetchFlag = async () => {
    try {
      const response = await axios
        .get("http://localhost:3000/random")
        .then((res) => res.data.data);
      console.log(response);
      setCountryData(response);
      let array = [response.mainCountry.name, ...response.options];
      const randomAns = (array) => {
        const ans = array.shift();
        const rand = Math.floor(Math.random() * array.length);
        array.splice(rand, 0, ans);

        // console.log('random',array)
        setOptions(array);
      };
      randomAns(array);
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

    // console.log(countryData);
    // setDisplay("block");
  }, [next]);

  return (
    <div>
      <div style={{ padding: "0.5rem", background: "grey" }}>
        <div>
          <h1>Country's Name : {countryData.mainCountry?.name}</h1>
          {isloading ? (
            <div>Loading ...</div>
          ) : (
            <img
              style={{ height: "300px", width: "500px" }}
              src={countryData.mainCountry?.flag}
              alt=""
            />
          )}
        </div>
        <div>
          <h2>
            Capital:{" "}
            {`${
              countryData.mainCountry?.capital
                ? countryData.mainCountry?.capital
                : "Not Designated"
            }`}
          </h2>
          <h2>
            Region:{" "}
            {`${
              countryData.mainCountry?.region
                ? countryData.mainCountry?.region
                : "Not Designated"
            }`}
          </h2>
        </div>
      </div>
      <div>
        Options:{" "}
        {options?.map((opt) => (
          <div key={opt}>
            <button style={{ padding: "0.5rem", marginBlock: "0.5rem" }}>
              {opt}
            </button>
          </div>
        ))}
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
