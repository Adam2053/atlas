import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Country = () => {
  // hooks and states
  const [countryData, setCountryData] = useState({
    name: "",
    flag: "",
    capital: "",
    region: "",
  });
  const [options, setOptions] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [next, setNext] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnwer] = useState(false);
  const [score, setScore] = useState(0);
  const [isClickable, setIsClickable] = useState(true);
  const [timer, setTimer] = useState(30); // Timer state
  const correctRef = useRef([]);
  const intervalRef = useRef(null); // Ref to store the interval ID

  // fetching data from the server
  const fetchFlag = async () => {
    try {
      const response = await axios
        .get("http://localhost:3000/api/random")
        .then((res) => res.data.data);

      setCountryData(response);

      let array = [response.mainCountry.name, ...response.options];
      const randomAns = (array) => {
        const ans = array.shift();
        const rand = Math.floor(Math.random() * array.length);
        array.splice(rand, 0, ans);
        setOptions(array);
      };
      randomAns(array);
    } catch (err) {
      console.log(err);
    }
  };

  // handle the clicks
  const handleClick = async () => {
    if (next) {
      setNext(false);
    } else {
      setNext(true);
    }
  };

  const handleAnswer = async (e, i) => {
    clearInterval(intervalRef.current); // Clear the interval when the answer is selected

    if (e.target.value === countryData.mainCountry.name) {
      setIsCorrectAnwer(true);
      setScore((s) => s + 1);

      // Change the button color to green if the answer is correct
      correctRef.current[i].style.backgroundColor = "green";
    } else {
      correctRef.current[i].style.backgroundColor = "red";
      setScore(0);
    }

    // Disable buttons for 1 second
    setIsClickable(false);
    setTimeout(() => {
      fetchFlag();
      // Reset the button colors after fetching the next question
      correctRef.current.forEach((ref) => {
        if (ref) ref.style.backgroundColor = "";
      });
      setIsClickable(true); // Re-enable buttons after 1 second
      setTimer(30); // Reset the timer
      startTimer(); // Restart the timer
    }, 1000);
  };

  // Timer logic
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalRef.current);
          setScore(0);
          fetchFlag();
          setTimer(30); // Reset the timer for the next question
          startTimer(); // Restart the timer for the next question
          return 30;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFlag();
    setIsLoading(false);
    setTimer(30); // Set the timer to 30 seconds for each new question
    startTimer(); // Start the timer

    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
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
          <h2>Score: {`${score}`}</h2>
          <h2>Time Remaining: {timer} seconds</h2>
        </div>
      </div>
      <div>
        Options:{" "}
        {options?.map((opt, i) => (
          <div key={opt}>
            <button
              ref={(el) => (correctRef.current[i] = el)}
              onClick={(e) => handleAnswer(e, i)}
              value={opt}
              disabled={!isClickable} // Disable button if not clickable
              style={{
                padding: "0.5rem",
                marginBlock: "0.5rem",
              }}
            >
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
