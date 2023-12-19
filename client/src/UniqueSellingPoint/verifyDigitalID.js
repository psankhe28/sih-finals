import jsQR from 'jsqr';
import React, { useEffect, useState, useRef } from "react";
import { Image, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../client";
import { Modal } from "react-bootstrap";
import { MDBDataTable } from 'mdbreact';
import SortIcon from '@mui/icons-material/Sort';
import Button from "react-bootstrap/Button";
import './verifyDigitalId.css'

const QRCodeDecoder = () => {
  const verifyDigitalID = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageUrl = URL.createObjectURL(file);
        // const imageUrl = "https://i.ibb.co/YfPkbGY/Screenshot.png";
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            console.log('QR Code value:', code.data);
          } else {
            console.log('No QR code found.');
          }
        };
      } catch (error) {
        console.error('Error decoding QR code:', error);
      }
    }
  };

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



  const handleDocument = async (studentid, value) => {
    setDocumentName(value);
    setShowModal(true);
    // console.log("hello");
    console.log(value);
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
          // .eq("SchemeName", SchemeName)
          .eq("InstituteVerified", true)
          .eq("SchemeVerified", true);
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
      }
    ],
    rows: students.map((student) => ({
      Name: student.Name,
      ClgName: student.Institute,
      SchemeName: student.SchemeName,
      additionalDetails: student.additionalDetails,
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
      )
    })),
  };

  const noBottomColumns = {
    columns: data.columns,
    rows: [],
  };

  return (
    <div>
      <h1>QR Code Decoder</h1>
      <input type="file" accept="image/*" onChange={verifyDigitalID} />
      <p>Select an image file to decode QR code.</p>
      <p>Check the console for QR code value.</p>
      <MDBDataTable
        className="custom-datatable"
        striped
        bordered
        small
        data={data}
        noBottomColumns={noBottomColumns}
      />
    </div>
  );
};

export default QRCodeDecoder;