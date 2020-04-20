import React from "react";

function AboutPage() {
  return (
    <>
      <h4 style={{ color: "#19aeb1", textAlign: 'center', width: '50%', margin: '65px auto' }}>
      DIY Center is a MERN (MongoDB, Express.js, React.js, and Node.js) based social media platform 
      where people can share their crafts and the “Do It Yourself” (DIY) projects there and others can 
      like and leave comments for each post.

      </h4>
      <footer
        style={{
          backgroundColor: "#19aeb1",
          color: "white",
          bottom: 0,
          position: "absolute",
          width: "100%",
          textAlign: "center"
        }}
      >
        <h5>Ⓒ<script>document.write( new Date().getFullYear() );</script></h5>
      </footer>
    </>
  );
}
export default AboutPage;