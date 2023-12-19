import React, { useEffect, useState } from "react";
import { Image, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../client";

const PendingApplicants = ({ SchemeName }) => {
  SchemeName = "Rajarshri Chhatrapati Shahu Maharaj Merit Scholarship";
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function getStudents() {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select("*")
          .eq("SchemeName", SchemeName)
          .eq("InstituteVerified", true)
          .eq("SchemeVerified", false);
        setStudents(data);
      } catch (err) {
        console.log(err);
      }
    }
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
          <th className="border-0">Accept</th>
        </tr>
      </thead>
      <tbody>
        {students.length &&
          students.map((student) => {
            return (
              <tr>
                <td>{student.Name}</td>
                <td>{student.Institute}</td>
                <td>
                  <button className="btn">click me</button>
                </td>
                <td>
                  <button className="btn">click me</button>
                </td>
                <td>
                  <button className="btn">Accept</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default PendingApplicants;