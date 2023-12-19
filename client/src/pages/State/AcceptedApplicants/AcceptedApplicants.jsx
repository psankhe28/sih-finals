import React, { useEffect, useState } from "react";
import { Image, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../client";

const AcceptedApplicants = ({ SchemeName }) => {
  SchemeName = "Rajarshri Chhatrapati Shahu Maharaj Merit Scholarship";
  const [students, setStudents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState("Aadhaar");
  const [documentUrl, setDocumentUrl] = useState("");
  const [flag, setFlag] = useState(false);
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
  });
  return (
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
        {students.length === 1 ? (
          students.map((student) => {
            return (
              <tr>
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
                    <td>
                      <iframe src={documentUrl}></iframe>
                      <h1>{ documentUrl}</h1>
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
          <tr>No data Found</tr>
        )}
      </tbody>
    </Table>
  );
};

export default AcceptedApplicants;