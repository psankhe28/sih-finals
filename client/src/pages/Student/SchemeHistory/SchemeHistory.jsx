import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
import SortIcon from '@mui/icons-material/Sort';
import { MDBDataTable } from 'mdbreact';

const SchemeHistory = ({ token }) => {
  const email = token.user.user_metadata.email;
  const name = token.user.user_metadata.full_name;
// const [id,setId] = useState();
//   const [schemes, setSchemes] = useState([]);
//   useEffect(() => {
//     const getInfo = async () => {
//       try {
//         let { data, error } = await supabase
//           .from("Students")
//           .select("id")
//           .eq("Email", email)
//           .eq("Name", name)
//         console.log(data);
//         // data[0]['id'] = id;
//         setId = data[0]['id'];
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     const getSchemes = async () => {
//       try {
//         let { data, error } = await supabase
//           .from("Students")
//           .select("SchemeName")
//           .eq("id", id)
//           .eq("Name", null);

//         console.log(data);
//         setSchemes(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     console.log(schemes);
//     getInfo();
//     getSchemes();
    
//   }, [id,name,email]);

const [id, setId] = useState();
const [schemes, setSchemes] = useState([]);

useEffect(() => {
  const getInfo = async () => {
    try {
      let { data, error } = await supabase
        .from("Students")
        .select("id")
        .eq("Email", email)
        .eq("Name", name);

      console.log(data);

      // Update the state using the setId function
      // setId(data[0]['id']);
      if (data && data.length > 0) {
        setId(data[0]?.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSchemes = async () => {
    try {
      let { data, error } = await supabase
          .from("Students")
          .select("*")
          .eq("id", id)
          .neq("SchemeName", null);

      console.log(data);
      setSchemes(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(schemes);

  getInfo();
  getSchemes();

}, [id, name, email, supabase]);


  const data = {
    columns: [
      {
        label: <><SortIcon /> Name</>,
        field: 'SchemeName',
        sort: 'asc',
        width: 150,
      },
      {
        label: <>SchemeVerified</>,
        field: 'SchemeVerified',
        // sort: 'asc',
        width: 270,
      },
    ],
    rows: schemes?.map((scheme) => ({
      SchemeName: scheme.SchemeName,
      SchemeVerified: scheme.SchemeVerified === 'TRUE'  ? 'Verified' : 'Not verified'
    })),
  };

  const noBottomColumns = {
    columns: data.columns,
    rows: [],
  };

  return (
    <>
      <MDBDataTable
        className="custom-datatable"
        striped
        bordered
        small
        data={data}
        noBottomColumns={noBottomColumns}
      />
    </>
  );
};


export default SchemeHistory;
