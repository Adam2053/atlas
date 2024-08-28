import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}> 
      <h1>Welcome EveryBody to this application</h1>
      <div style={{display: 'flex', alignItems:'center', justifyContent:'center', marginTop:'1rem', gap:'2rem'}}>
        <Link to="/country">
          <button style={{padding:'0.6rem'}} >Guess The Flag</button>
        </Link>
        <Link to="/atlas">
          <button style={{padding:'0.6rem'}}>Atlas The Game</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
