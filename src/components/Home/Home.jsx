import React, { Component } from 'react';

function Home() {
    return (
      <div style={{ 
          margin: "0 auto", 
          textAlign: 'center' }}>
        <h2>Did You "Do It Yourself?"<br></br> Share It with "DIY Center" Members</h2>
        <img
          src="./images/diycenter.png"
          style={{ width: "45%" }}
          alt=""
        />
        {/* <footer
          style={{
            backgroundColor: "lightblue",
            color: "white",
            bottom: 0,
            position: "absolute",
            width: "100%",
            textAlign: "center"
          }}
        >
          <h5>Ⓒ<script>document.write( new Date().getFullYear() );</script></h5>
        </footer> */}
      </div>
    );
  }
export default Home;