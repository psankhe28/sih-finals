import React, { useEffect, useState, useRef } from "react";
import { Image, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../client";
import { Modal } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import SortIcon from "@mui/icons-material/Sort";
import Button from "react-bootstrap/Button";
import "./Accepted.css";

const AcceptedApplicants = ({ token }) => {
  
  const InstituteName = token.user.user_metadata.instituteName;
  // console.log(InstituteName)
  const [students, setStudents] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const documents = ["aadhaar", "domicile", "collegeid"];
  const [documentName, setDocumentName] = useState("Aadhaar");
  const [documentUrl, setDocumentUrl] = useState("");
  const [flag, setFlag] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDocument = async (studentid, value) => {
    setDocumentName(value);
    setShowModal(true);
    // console.log("hello");
    console.log(value);
    try {
      const { data, error } = supabase.storage
        .from("Documents")
        .getPublicUrl(`${studentid}/${value}`);
      // console.log(data.publicUrl);
      setDocumentUrl(data.publicUrl);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getStudents = async () => {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select("*")
          .eq("Institute", InstituteName)
          .eq("InstituteVerified", true)
          .eq("SchemeVerified", false);
        setStudents(data);
        // console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
    // console.log(students)
  });

  const data = {
    columns: [
      {
        label: (
          <>
            <SortIcon /> Name
          </>
        ),
        field: "Name",
        sort: "asc",
        width: 150,
      },
      {
        label: <>College Name</>,
        field: "ClgName",
        sort: "asc",
        width: 270,
      },
    ],
    rows: students.map((student) => ({
      Name: student.Name,
      ClgName: student.Institute,
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

export default AcceptedApplicants;
