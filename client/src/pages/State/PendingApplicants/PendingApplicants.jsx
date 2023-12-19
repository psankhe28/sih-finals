import React, { useEffect, useState, useRef } from "react";
import { Image, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../client";
import { Modal } from "react-bootstrap";
import { MDBDataTable } from 'mdbreact';
import SortIcon from '@mui/icons-material/Sort';
import Button from "react-bootstrap/Button";
import './PendingApplicants.css'

const PendingApplicants = ({ SchemeName }) => {

  SchemeName = "Rajarshri Chhatrapati Shahu Maharaj Merit Scholarship";
  const [students, setStudents] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState("Aadhaar");
  const [documentUrl, setDocumentUrl] = useState("");
  const [flag, setFlag] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onAccept = async (studentid) => {
    try {
      const { data, error } = await supabase
        .from("Students")
        .update({ SchemeVerified: true })
        .eq("id", studentid)
        .select();

      let newStudents = students.filter((student) => student.id !== studentid);
      setStudents(newStudents);
    } catch (err) {
      console.log(err);
    }
  };

  const onReject = async (studentid) => {
    try {
      const { error } = await supabase
        .from("Students")
        .delete()
        .eq("id", studentid);

      let newStudents = students.filter((student) => student.id !== studentid);
      setStudents(newStudents);
    } catch (err) {
      console.log(err);
    }
  };

  const getDocuments = async () => {
    try {
      let { data, error } = await supabase
        .from("Schemes")
        .select("Documents")
        .eq("SchemeName", SchemeName);
      console.log(data[0].Documents);
      setDocuments(data[0].Documents);

      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDocument = async (studentid, value) => {
    setDocumentName(value);
    setShowModal(true);
    console.log("hello");
    console.log(value);
    try {
      const { data, error } = supabase.storage
        .from("Documents")
        .getPublicUrl(`${studentid}/${value}`);
      console.log(data.publicUrl);
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
          .eq("SchemeName", SchemeName)
          .eq("InstituteVerified", true)
          .eq("SchemeVerified", false);
        setStudents(data);
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
    console.log(students)
  });

  const data = {
    columns: [
      {
        label: <><SortIcon /> Name</>,
        field: 'Name',
        sort: 'asc',
        width: 150,
      },
      {
        label: <>College Name</>,
        field: 'ClgName',
        sort: 'asc',
        width: 270,
      },
      {
        label: <>Scheme Name</>,
        field: 'SchemeName',
        sort: 'asc',
        width: 270,
      },
      {
        label: <>Details</>,
        field: 'additionalDetails',
        sort: 'asc',
        width: 270,
      },
      {
        label: <>Documents</>,
        field: 'Documents',
        // sort: 'asc',
        width: 200,
      },
      {
        label: <>Actions</>,
        field: 'Actions',
        // sort: 'asc',
        width: 200,
      }
    ],
    rows: students.map((student) => ({
      Name: student.Name,
      ClgName: student.Institute,
      SchemeName:student.SchemeName,
      additionalDetails:student.additionalDetails,
      Documents: (
        <>
          {flag ? <select
            name="documents"
            id="documents"
            className="custom-dropdown"
            onChange={(e) => handleDocument(student.id, e.target.value)}
          >
            <option value="">Select document</option>
            {documents.map((document) => (
              <option key={document} value={document}>
                {document}
              </option>
            ))}
          </select> : ''}
        </>
      ),
      Actions: (
        <>
          <Button
            variant="success"
            onClick={() => onAccept(student.id)}
            type="button"
          >
            Accept
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => onReject(student.id)}
            type="button"
          >
            Reject
          </Button>
        </>
      ),
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
      <Button variant="primary" onClick={getDocuments}>
        Get Documents
      </Button>
      <Modal fullscreen={fullscreen} show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title>kjl</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "hidden" }}><iframe
          style={{ width: "100%", height: "100%" }}
          src={documentUrl}
          title="ha"

        ></iframe></Modal.Body>
      </Modal>
    </>
  );

  // {
  //   flag && (
  //     <>
  //       <td>
  //         <select
  //           name="documents"
  //           id="documents"
  //           onChange={(e) =>
  //             handleDocument(student.id, e.target.value)
  //           }
  //         >
  //           {documents.map((document) => {
  //             return (
  //               <option key={document} value={document}>
  //                 {document}
  //               </option>
  //             );
  //           })}
  //         </select>
  //       </td>
  //       <td>
  //         <Button
  //           variant="success"
  //           onClick={() => onAccept(student.id)}
  //           type="button"
  //         >
  //           Accept
  //         </Button>{" "}
  //         <Button
  //           variant="danger"
  //           onClick={() => onReject(student.id)}
  //           type="button"
  //         >
  //           Reject
  //         </Button>
  //       </td>
  //     </>
  //   )
  // }
}


export default PendingApplicants;