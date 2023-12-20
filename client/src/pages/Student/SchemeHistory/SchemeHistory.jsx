import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
import SortIcon from '@mui/icons-material/Sort';
import { MDBDataTable } from 'mdbreact';

const SchemeHistory = ({ token }) => {
  const email = token.user.user_metadata.email;
  const name = token.user.user_metadata.full_name;

  let id;
  const [schemes, setSchemes] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select("id")
          .eq("Email", email)
          .eq("Name", name)
        console.log(data);
        id = data[0]['id'];
      } catch (err) {
        console.log(err);
      }
    };
    getInfo()
    const getSchemes = async () => {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select("*")
          .eq("id", id)
          .neq("schemeName", null);

        console.log(data);
        setSchemes(data);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(schemes);
    getSchemes();
  }, []);

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
      SchemeName: scheme.schemeName,
      SchemeVerified: scheme.SchemeVerified === 'TRUE' || 'true' ? 'Verified' : 'Not verified'
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
