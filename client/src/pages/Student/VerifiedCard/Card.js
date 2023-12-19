import Card from "react-bootstrap/Card";
import React from "react";

function VerifiedId({ token }) {
  console.log(token.user);
  return (
    <Card
      style={{
        width: "28rem",
        textAlign: "center",
        backgroundColor: "black",
        margin: "15px",
        borderRadius: "20px",
      }}
    >
      <div style={{ margin: "15px" }}>
        <Card.Img
          variant="top"
          src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          height="350"
        />
      </div>
      <div style={{ textAlign: "center", color: "white" }}>
        <Card.Body>
            <Card.Title><h2 style={{ color: "white" }}>Pratiksha</h2></Card.Title>
          <Card.Text>
            <div>
              {/* <h3>Name: {token.user.full_name}</h3>
            <h3>Email: {token.user.email}</h3>
            <h3>Phone No: {token.user.phone}</h3>
            <h3>Home State: {token.user.state}</h3> */}
              <h3 style={{ fontSize: "23px", color: "white" }}>
                Email: <span style={{ fontSize: "20px" }}>a@gmail.com</span>
              </h3>
              <h3 style={{ fontSize: "23px", color: "white" }}>
                Phone no: <span style={{ fontSize: "20px" }}>9847364785</span>
              </h3>
              <h3 style={{ fontSize: "23px", color: "white" }}>
                HomeState: <span style={{ fontSize: "20px" }}>Maharashtra</span>
              </h3>
            </div>
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
}

export default VerifiedId;