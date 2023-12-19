import React, { useEffect, useState, useRef } from "react";
import { Image, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../client";
import { Modal } from "react-bootstrap";


const AcceptedApplicants = ({ SchemeName }) => {

  SchemeName = "Rajarshri Chhatrapati Shahu Maharaj Merit Scholarship";
  const [students, setStudents] = useState([]);
  const [fullscreen, setFullscreen] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState("Aadhaar");
  const [documentUrl, setDocumentUrl] = useState("");
  const [flag, setFlag] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  // Accessing the img tag inside the iframe and applying styles

  const handleCloseModal = () => {
    setShowModal(false);
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
          .eq("SchemeVerified", true);
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudents();
    console.log(students)
  });
  return (
    <>
      <Table>
        <thead className="thead-light">
          <tr>
            <th className="border-0">Student Name</th>
            <th className="border-0">College Name</th>
            <th className="border-0">Verified ID</th>
            <th className="border-0">Uploaded Documents</th>
            <th className="border-0">View Documents</th>
          </tr>
        </thead>
        <tbody>
          {students ? (
            students.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.Name}</td>
                  <td>{student.Institute}</td>
                  {flag && (
                    <>
                      <td>
                        <select
                          name="documents"
                          id="documents"
                          onChange={(e) =>
                            handleDocument(student.id, e.target.value)
                          }
                        >
                          {documents.map((document) => {
                            return (
                              <option key={document} value={document}>
                                {document}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </>
                  )}
                  <td>
                    <button type="button" onClick={getDocuments}>
                      Get Documents
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No data Found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal fullscreen={fullscreen} show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title>kjl</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "hidden" }}><iframe
          style={{ width: "100%", height: "100%" }}
          // src={documentUrl}
          src='https://tslsjnmdnlctukoilrux.supabase.co/storage/v1/object/public/Documents/5/Undertaking'
          title="ha"

        ></iframe></Modal.Body>
      </Modal>
      {/* <Modal
        show={showModal}
        onHide={handleCloseModal}
 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedDocument}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
           style={{ width: "100%", height: "100%" }}
            src={documentUrl}
            title="ha"
           
          ></iframe>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default AcceptedApplicants;
