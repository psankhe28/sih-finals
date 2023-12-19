import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { supabase } from '../../../client';

function AddScheme() {
    const [show, setShow] = useState(false);

    const [schemeData, setSchemeData] = useState({
        schemeName: '', schemeDesc: '', details: '', documents: '', state: '', endDate: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(event) {
        setSchemeData((prevSchemeData) => ({
            ...prevSchemeData,
            [event.target.name]: event.target.value,
        }));
        console.log(schemeData);
    }

    async function showDetails(e) {
        e.preventDefault();

        try {
            let { data, error } = await supabase
                .from('Schemes')
                .select('Details');

            console.log(data);
            if (error) {
                throw error;
            }
            alert('Successfully added scheme');
        } catch (error) {
            alert(error);
        }
    }

    async function addScheme(e) {
        e.preventDefault();
    
        try {
            const det = schemeData.details.split(',');
            const doc = schemeData.documents.split(',');
    
            const { data, error } = await supabase
                .from('Schemes')
                .insert([
                    {
                        SchemeName: schemeData.schemeName,
                        SchemeDesc: schemeData.schemeDesc,
                        Details: det,
                        Documents: doc,
                        State: schemeData.state,
                        EndDate: schemeData.endDate,
                    },
                ]);
    
            console.log(data);
            if (error) {
                throw error;
            }
    
            alert('Successfully added scheme');
            
            // Reload the page after adding the scheme
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }
    

    return (
        <div className="text-center mb-3">
            <Button variant="primary" onClick={handleShow}>
                Add New Scheme
            </Button>
    
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Schemes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ alignItems: "normal", padding: 0 }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Scheme Name</Form.Label>
                        <Form.Control
                            name='schemeName'
                            placeholder="Scheme Name"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Scheme Description</Form.Label>
                        <Form.Control name='schemeDesc' onChange={handleChange} placeholder="Description ..." as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Details Required</Form.Label>
                        <Form.Control
                            name='details'
                            placeholder="Name,Address,Marks"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Documents Required</Form.Label>
                        <Form.Control
                            name='documents'
                            placeholder="Aadhaar,Income,Pan,Voter"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            name='state'
                            placeholder="Applicable State"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Last Date to Apply</Form.Label>
                        <Form.Control
                            type='date'
                            name='endDate'
                            placeholder="EndDate"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={addScheme}>
                    Add Scheme
                </Button>
            </Modal.Footer>
        </Modal>

        </div>
    );
    
}

export default AddScheme;








