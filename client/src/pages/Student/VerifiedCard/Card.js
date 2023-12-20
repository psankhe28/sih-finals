import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
import './Card.css'

function VerifiedId({ token }) {
  const email = token.user.user_metadata.email;
  const name = token.user.user_metadata.full_name;
  const phone = token.user.phone;
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
        !InstituteVerified ? (
          <div>

            <div className="container">
              <div className="svg-background"></div>
              <div className="svg-background2"></div>
              <img className="circle" src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYRBILjERIPIkY5_fkQ_Oyj5h3pkQnSjhQmIP58TXSlCSKLLV8DJc3rPoYz_mn6YAPed0y02q5pz69lmmSo3uPJNsZxdXA=s2560" />
              <img className="menu-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX8bwMUY5bEE4hbboV3x_GDRVXQ92gruVu7Wr9-PqDqQ&s" />
              <div className="text-container">
                <p className="title-text">{name}</p>
                <p className="desc-text">+{phone}</p>
                <p className="desc-text">Veermata Jijabai Technological Institute</p>
                <p className="desc-text">Validity: <b>2024</b></p>
              </div>
            </div>
          </div>
        ) : <h1>Your phase 1 is not completed yet!</h1>
      }
    </div>
  );
}

export default VerifiedId;
