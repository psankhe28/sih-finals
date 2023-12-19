import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../../../client'; 
import { MDBDataTable } from 'mdbreact';
import './StudentScheme.css'
import SortIcon from '@mui/icons-material/Sort';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const StudentScheme = ({ stateName }) => {
    const id = 1;
    const [show, setShow] = useState(false);
    const [schemeData, setSchemeData] = useState({
        schemeName: '', schemeDesc: '', details: '', documents: '', state: '', endDate: ''
    })
    const [details, setDetails] = useState([])
    const [documents, setDocuments] = useState([])
    const [applyschemeData, setApplyschemeData] = useState('')
    const [studentSchemeDetails, setStudentSchemeDetails] = useState({});
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

    stateName = "Maharashtra";
    const [schemes, setSchemes] = useState([]);
    useEffect(() => {
        const getSchemes = async () => {
            try {
                let { data, error } = await supabase
                    .from("Schemes")
                    .select("*")
                    .eq("State", stateName);
                console.log(data);
                setSchemes(data);
            } catch (err) {
                console.log(err);
            }
        };
        console.log(schemes);
        getSchemes();
    }, []);
    async function handleApply(id) {

        console.log(id);

        try {
            let { data, error } = await supabase
                .from("Schemes")
                .select("*")
                .eq("id", id);
            setApplyschemeData(data);
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
                { 'additionalDetails': studentSchemeDetails, 'id': id }

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
    const data = {
        columns: [
            {
                label: <><SortIcon /> Name</>,
                field: 'SchemeName',
                sort: 'asc',
                width: 150
            },
            {
                label: <><SortIcon /> Description</>,
                field: 'SchemeDesc',
                sort: 'asc',
                width: 270
            },
            {
                label: <><SortIcon /> Documents</>,
                field: 'Documents',
                sort: 'asc',
                width: 200
            },
            {
                label: <><SortIcon /> Details</>,
                field: 'Details',
                sort: 'asc',
                width: 100
            },
            {
                label: <><SortIcon />Deadline</>,
                field: 'EndDate',
                sort: 'asc',
                width: 150
            },
            {
                label: <><SortIcon /> Actions</>,
                field: 'Actions',
                sort: 'asc',
                width: 100
            }
        ],
        rows: schemes ? schemes.map(scheme => ({
            SchemeName: scheme.SchemeName,
            SchemeDesc: scheme.SchemeDesc,
            Documents: scheme.Documents.join(', '),
            Details: scheme.Details.join(', '),
            EndDate: scheme.EndDate,
            Actions: (
                <button
                    style={{ background: 'black', color: 'white', padding: '8px', borderRadius: '5px' }}
                    onClick={(event) => {
                        event.stopPropagation();
                        handleApply(scheme.id);
                    }}
                >
                    Apply
                </button>
            )
        })) : []
    };

    const noBottomColumns = {
        columns: data.columns,
        rows: []
    };

    return (
        <div>
            <MDBDataTable
                className="custom-datatable"
                striped
                bordered
                small
                data={data}
                noBottomColumns={noBottomColumns}
            />
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

        </div>

    );
}

export default StudentScheme;

