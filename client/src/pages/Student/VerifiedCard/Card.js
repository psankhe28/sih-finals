import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";


function VerifiedId({ token }) {
  const email = token.user.user_metadata.email;
  const name = token.user.user_metadata.full_name;
  console.log(email)
  console.log(name)

  let InstituteVerified;

  useEffect(() => {
    const getInfo = async () => {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select('*')
          .eq("Email", email)
          .eq("Name", name)
        console.log(data);
        data[0]['InstituteVerified'] = InstituteVerified;
      } catch (err) {
        console.log(err);
      }
    };
    getInfo()
  }, []);
  return (
    <div>
      {
        InstituteVerified ? (
          <div>
            <Card
              style={{
                width: "28rem",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                margin: "15px",
                borderRadius: "20px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                fontFamily: "'Arial', sans-serif",
                color: "#333",
              }}
            >
              <div style={{ margin: "15px" }}>
                <Card.Img
                  variant="top"
                  src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
                  height="350"
                  style={{ borderRadius: "20px 20px 0 0" }}
                />
              </div>
              <div style={{ textAlign: "center", color: "#333" }}>
                <Card.Body>
                  <Card.Title>
                    <h2 style={{ color: "#333", fontFamily: "'Roboto', sans-serif", marginBottom: "10px" }}>Pratiksha</h2>
                  </Card.Title>
                  <Card.Text>
                    <div>
                      <h3 style={{ fontSize: "18px", color: "#555", marginBottom: "8px" }}>
                        Email: <span style={{ fontSize: "16px", color: "#777" }}>a@gmail.com</span>
                      </h3>
                      <h3 style={{ fontSize: "18px", color: "#555", marginBottom: "8px" }}>
                        Phone no: <span style={{ fontSize: "16px", color: "#777" }}>9847364785</span>
                      </h3>
                      <h3 style={{ fontSize: "18px", color: "#555" }}>
                        Home State: <span style={{ fontSize: "16px", color: "#777" }}>Maharashtra</span>
                      </h3>
                    </div>
                  </Card.Text>
                </Card.Body>
              </div>
            </Card>
          </div>
        ) : <h1>Your phase 1 is not completed yet!</h1>
      }
    </div>
  );
}

export default VerifiedId;
