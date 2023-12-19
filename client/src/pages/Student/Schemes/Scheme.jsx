import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
const Scheme = ({ stateName }) => {
  stateName = "Maharashtra";
  const [schemes, setSchemes] = useState([]);
  useEffect(() => {
    const getSchemes = async () => {
      try {
        let { data, error } = await supabase
          .from("Schemes")
          .select("*")
          .eq("State", stateName);
        console.log(data);
        setSchemes(data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(schemes);
    getSchemes();
  }, []);
  return <></>;
};

export default Scheme;
