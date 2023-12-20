import React, { useEffect, useState } from "react";
import { supabase } from "../../../client";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Scheme.css'

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
    const getInfo = async () => {
      try {
        let { data, error } = await supabase
          .from("Students")
          .select('*')
          .eq("Email", email)
          .eq("Name", name);

        const studentState = data[0].HomeState;
        const studentId = data[0].id;

        setState(studentState);
        setId(studentId);

        console.log(studentState);
      } catch (err) {
        console.log(err);
      }
    };

    const getSchemesFilter = async () => {
      try {
        console.log(state);

        let { data, error } = await supabase
          .from("Schemes")
          .select("*")
          .eq("State", state);

        console.log(data);

        setSchemes(data);
      } catch (err) {
        console.log(err);
      }
    };

    console.log(schemes);

    getSchemesFilter();
    getInfo();
  }, [email, name, state]);

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
        { 'additionalDetails': studentSchemeDetails, 'id': id, 'SchemeName': schemeName }

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
      <Table responsive striped bordered hover variant="light" className='mt-3'>
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