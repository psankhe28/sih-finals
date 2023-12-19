// import React from 'react'
// import { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import Table from 'react-bootstrap/Table';
// import { supabase } from '../../../client';
// import './Table.css'

// export default function Table1({ studentid }) {
//   studentid = 1331;
//   const [files, setFiles] = useState({
//     Aadhaar: null,
//     Undertaking: null,
//   });
//   const handleChange = async (e) => {
//     setFiles({ ...files, [e.target.name]: e.target.files[0] });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(files);
//     for (let entry of Object.entries(files)) {
//       if (!entry[0]) {
//         alert("Please Upload All Required Files");
//         return;
//       }
//     }
//     for (let entry of Object.entries(files)) {
//       try {
//         let { data, error } = await supabase.storage
//           .from("Documents")
//           .upload(`${studentid}/${entry[0]}`, entry[1], {
//             cacheControl: "3600",
//             upsert: false,
//           });
//         console.group(data);
//         if (error) console.log(error);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
//   const doc = ["Id"];


//   return (
//     <div>
//       <Table responsive striped bordered hover variant="light">
//         <thead>
//           <tr className="thead">
//             <th scope="col">Id</th>
//             <th scope="col">Document Needed</th>
//             <th scope="col">Documents</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doc?.map((doc1, index) => {
//             return (
//               <tr>
//                 <td data-label="id" style={{ whiteSpace: 'wrap' }}>{index + 1}</td>
//                 <td data-label="doc-needed" style={{ whiteSpace: 'wrap' }}>{doc1}</td>
//                 <td data-label="doc" style={{ whiteSpace: 'wrap' }}>HFHGF</td>
//                 <td data-label="Actions">
//                   <form onSubmit={handleSubmit} className="file-upload-form">
//                     <div className="file-input-container">
//                       <input
//                         type="file"
//                         onChange={handleChange}
//                         id={doc1}
//                         name={doc1}
//                       />
//                     </div>
//                     <button type="submit" className="action-btn">Upload</button>
//                   </form>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>

//     </div>
//   )
// }
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { supabase } from '../../../client';
import './Table.css';

export default function Table1({ studentid }) {
  studentid = 1332;
  const [files, setFiles] = useState({
    Aadhaar: null,
    Undertaking: null,
  });

  const handleChange = async (e, doc) => {
    setFiles({ ...files, [doc]: e.target.files[0] });
  };

  const handleSubmit = async (e, doc) => {
    e.preventDefault();
    console.log(files);
    if (!files[doc]) {
      alert("Please Upload the Required File");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("Documents")
        .upload(`${studentid}/${doc}`, files[doc], {
          cacheControl: "3600",
          upsert: false,
        });
      console.group(data);
      if (error) console.log(error);
    } catch (err) {
      console.log(err);
    }
  };

  const docList = [
    { id: 1, name: "Aadhaar" },
    { id: 2, name: "Undertaking" }
  ];

  return (
    <div>
      <Table responsive striped bordered hover variant="light">
        <thead>
          <tr className="thead">
            <th scope="col">Id</th>
            <th scope="col">Document Needed</th>
            <th scope="col">Documents</th>
          </tr>
        </thead>
        <tbody>
          {docList.map((doc, index) => (
            <tr key={doc.id}>
              <td data-label="id">{index + 1}</td>
              <td data-label="doc-needed">{doc.name}</td>
              <td data-label="doc">
                {/* Display the uploaded file or a file input */}
                {files[doc.name] ? (
                  <span>Uploaded: {files[doc.name].name}</span>
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleChange(e, doc.name)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Upload button outside the table */}
      <form onSubmit={(e) => e.preventDefault()}>
        <button
          onClick={(e) => {
            e.preventDefault();
            for (let entry of Object.entries(files)) {
              handleSubmit(e, entry[0]);
            }
          }}
          className="action-btn"
        >
          Upload All
        </button>
      </form>
    </div>
  );
}
