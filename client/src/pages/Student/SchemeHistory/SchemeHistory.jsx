import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";

const SchemeHistory = ({ studentid }) => {
  studentid = 5;
  const [schemes, setSchemes] = useState([]);
  useEffect(() => {
    const getSchemes = async () => {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select("*")
          .eq("id", studentid)
          .neq("SchemeName", null);

        console.log(data);
        setSchemes(data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(schemes);
    getSchemes();
  }, []);
  return <>SchemeHistory</>;
};

export default SchemeHistory;
