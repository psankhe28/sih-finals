import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Scheme = ({ token }) => {
  const email = token.user.user_metadata.email;
  const name = token.user.user_metadata.full_name;
  console.log(email)
  console.log(name)
  const [state, setState] = useState(null);
  const [id, setId] = useState(null);

  // let id, state;


  const [show, setShow] = useState(false);
  const [schemeData, setSchemeData] = useState({
    schemeName: '', schemeDesc: '', details: '', documents: '', state: '', endDate: ''
  })

  const [details, setDetails] = useState([])
  const [documents, setDocuments] = useState([])
  const [applyschemeData, setApplyschemeData] = useState('')
  const [schemeName, setSchemeName] = useState()
  const [studentSchemeDetails, setStudentSchemeDetails] = useState({});
  const [schemes, setSchemes] = useState([]);
  const [files, setFiles] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleChange(event) {
    setStudentSchemeDetails((prevSchemeData) => {
      return {
        ...prevSchemeData,
        [event.target.name]: event.target.value
      }
    })
    console.log(studentSchemeDetails)

  }

  const handleDocChange = async (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  useEffect(() => {
    // Function to get information about a student
    const getInfo = async () => {
        try {
            // Making a request to the Supabase database to get student information
            let { data, error } = await supabase
                .from("Students")
                .select('*')
                .eq("Email", email)
                .eq("Name", name);

            // Extracting the HomeState and ID from the received data
            const studentState = data[0].HomeState;
            const studentId = data[0].id;

            // Updating the component state using set functions
            setState(studentState);
            setId(studentId);

            console.log(studentState);
            // data[0]['InstituteVerified'] = InstituteVerified;
        } catch (err) {
            // Handling errors if any occur during the database request
            console.log(err);
        }
    };

    // Function to get schemes based on the state of the student
    const getSchemes = async () => {
        try {
            // Logging the state value to the console
            console.log(state);

            // Making a request to the Supabase database to get schemes based on the state
            let { data, error } = await supabase
                .from("Schemes")
                .select("*")
                .eq("State", state);

            // Logging the retrieved schemes to the console
            console.log(data);

            // Setting the retrieved schemes in the component's state
            setSchemes(data);
        } catch (err) {
            // Handling errors if any occur during the database request
            console.log(err);
        }
    };

    // Logging the schemes to the console
    console.log(schemes);

    // Calling the getInfo and getSchemes functions when the component is rendered
    getInfo();
    getSchemes();
}, [email, name, state]); // Include relevant dependencies in the dependency array




  // const getInfo = async () => {
  //   try {
  //     let { data, error } = await supabase
  //       .from("Students")
  //       .select('*')
  //       .eq("Email", email)
  //       .eq("Name", name)
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setState = data[0].HomeState;
  //       setId = data[0].id;
  //       setId = data[0].id;
  //       setId = data[0].id;
  //       setId = data[0].id;
  //     console.log(state);
  //     // data[0]['InstituteVerified'] = InstituteVerified;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
   
  //   getInfo();
  //   const getSchemes = async () => {
  //     try {
  //       console.log(state)
  //       let { data, error } = await supabase
  //         .from("Schemes")
  //         .select("*")
  //         .eq("State", state);
  //       console.log(data);
  //       setSchemes(data);

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   console.log(schemes);
   
  //   getSchemes();
  // },[state]);

  async function handleApply(id) {

    console.log(id);

    try {
      let { data, error } = await supabase
        .from("Schemes")
        .select("*")
        .eq("id", id);
      setApplyschemeData(data);

      setSchemeName(data[0].SchemeName);

      setDetails(Object.values(applyschemeData[0].Details));
      setDocuments(Object.values(applyschemeData[0].Documents));
      console.log(data);
      console.log(applyschemeData[0].Details);
      console.log(details);
      setShow(true);
    } catch (err) {
      console.log(err);
    }

  }
  async function handleSchemeApply() {

    const { data, error } = await supabase
      .from('Students')
      .insert([
        { 'additionalDetails': studentSchemeDetails, 'id': id,'SchemeName': schemeName  }

      ])
      .select()

    console.log(data);
    console.log(files);
    for (let entry of Object.entries(files)) {
      if (!entry[0]) {
        alert("Please Upload All Required Files");
        return;
      }
    }
    for (let entry of Object.entries(files)) {
      try {
        let { data, error } = await supabase.storage
          .from("Documents")
          .upload(`${id}/${entry[0]}`, entry[1], {
            cacheControl: "3600",
            upsert: false,
          });
        console.group(data);
        if (error) console.log(error);
      } catch (err) {
        console.log(err);
      }
    }


  }
  return (
    <div>
      <Table responsive striped bordered hover variant="light">
        <thead>
          <tr class="thead">
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Documents</th>
            <th scope="col">Details</th>
            <th scope="col">Deadline</th>

            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {schemes?.map((scheme, index) => {
            return (
              <tr>
                <td data-label="scheme" style={{ whiteSpace: 'wrap' }}>{scheme.SchemeName}</td>
                <td data-label="desc" style={{ whiteSpace: 'wrap' }}>{scheme.SchemeDesc}</td>
                <td data-label="documents" style={{ whiteSpace: 'wrap' }}>{scheme.Documents.join(', ')}</td>
                <td data-label="details" style={{ whiteSpace: 'wrap' }}>{scheme.Details.join(', ')}</td>
                <td data-label="date" style={{ whiteSpace: 'wrap' }}>{scheme.EndDate}</td>
                <td data-label="Delete">
                  <button
                    style={{ background: "none", color: 'black' }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleApply(scheme.id);
                    }}
                  >Apply</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Apply to Scheme</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form style={{ alignItems: "normal", padding: 0 }}>

              {details?.map((scheme, index) => {
                return (
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>{scheme}</Form.Label>
                    <Form.Control
                      name={scheme}
                      placeholder="Scheme Name"
                      onChange={handleChange}
                    />
                  </Form.Group>
                );
              })}
              {documents?.map((scheme, index) => {
                return (

                  <Form.Group className="position-relative mb-3">
                    <Form.Label>{scheme}</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      name={scheme}
                      onChange={handleDocChange}
                    />

                  </Form.Group>

                );
              })}

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSchemeApply}>
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>

  );
};

export default Scheme;