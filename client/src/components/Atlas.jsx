import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Atlas = () => {
  const [input, setInput] = useState("");
  const [alpha, setAlpha] = useState("");
  const [next, setNext] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    // set the input value to the new value
    setInput(e.target.value);
    // clear the input element
  };

  const randomAlphabet = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const handleClick = async () => {
    // make the api call to get if the input is availabe in the database
    const response = await axios.post(`http://localhost:3000/api/get/${input}`);

    if (response.data.success) {
      alert(`The city ${input} is available in the database!`);
      setAlpha(input[input.length - 1].toUpperCase());
      inputRef.current.value = "";
    } else {
      alert(`The city ${input} is not available in the database!`);
      inputRef.current.value = "";
    }

    // update the next state to true
  };

  useEffect(() => {
    setAlpha(randomAlphabet());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7fd1b9",
      }}
    >
      <h1>Atlas The Game</h1>
      <h1>Your Letter : {alpha}</h1>
      <input
        ref={inputRef}
        onChange={handleChange}
        style={{
          padding: "1rem",
          marginTop: "1rem",
          borderRadius: "0.4rem",
          backgroundColor: "#eff7f6",
          border: "none",
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
        type="text"
        placeholder="enter the cities name"
      />
      <button
        style={{
          marginTop: "1rem",
          padding: "1rem",
          borderRadius: "0.4rem",
          border: "none",
          background: "#ece2d0",
          fontWeight: "700",
          fontSize: "1rem",
          cursor: "pointer",
        }}
    
        type="submit"
        onClick={handleClick}
      >
        Submit the name
      </button>
    </div>
  );
};

export default Atlas;
