import jsQR from 'jsqr';
import React, { useEffect, useState } from "react";
import { MDBDataTable } from 'mdbreact';
import SortIcon from '@mui/icons-material/Sort';
import { supabase } from "../client";
import './verifyDigitalId.css';
import { Link } from 'react-router-dom';


const QRCodeDecoder = () => {
  const [students, setStudents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState("Aadhaar");
  const [documentUrl, setDocumentUrl] = useState("");
  const [flag, setFlag] = useState(false);
  const [upload, setUpload] = useState();

  const verifyDigitalID = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageUrl = URL.createObjectURL(file);
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
            setUpload(code.data);
          } else {
            console.log('No QR code found.');
          }
        };
      } catch (error) {
        console.error('Error decoding QR code:', error);
      }
    }
  };

  const handleDocument = async (studentid, value) => {
    setDocumentName(value);

    try {
      const { data, error } = await supabase.storage
        .from("Documents")
        .getPublicUrl(`${studentid}/${value}`);

      if (error) {
        console.error('Error fetching document URL:', error);
        return;
      }

      setDocumentUrl(data.publicUrl);
    } catch (err) {
      console.error('Error fetching document URL:', err);
    }
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select("*")
          .eq("InstituteVerified", true)
          .eq("SchemeVerified", true)
          .eq('uid','19')
        
        console.log(data);

        if (error) {
          console.error('Error fetching students:', error);
          return;
        }

        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    getStudents();
  }, []);

  const data = {
    columns: [
      {
        label: <><SortIcon /> Name</>,
        field: 'Name',
        sort: 'asc',
        width: 150,
      },
      // ... other columns
      {
        label: <>HomeState</>,
        field: 'HomeState',
        width: 200,
      },
      {
        label: <>Institute</>,
        field: 'Institute',
        width: 200,
      },
      {
        label: <>Status</>,
        field: 'verify',
        width: 200,
      }
    ],
    rows: students.map((student) => ({
      Name: student.Name,
      HomeState: student.HomeState,
      Institute: student.Institute,
      verify: student.cid === upload ? 'VERIFIED' : 'NOT VERIFIED',
      // ... other fields
      Documents: (
        <>
          {flag && (
            <select
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
            </select>
          )}
        </>
      )
    })),
  };

  const noBottomColumns = {
    columns: data.columns,
    rows: [],
  };

  return (
    <div className='m-5'>
      <h1>Verify NSID</h1>
      <input type="file" accept="image/*" onChange={verifyDigitalID} />
      <p>Student uploads NSID</p>
      <MDBDataTable
        className="custom-datatable"
        striped
        bordered
        small
        data={data}
        noBottomColumns={noBottomColumns}
      />

<Link to='/'><button className="button transparent" id="sign-up-button" >
                  Back to Homepage
                  </button></Link>
    </div>
  );
};

export default QRCodeDecoder;