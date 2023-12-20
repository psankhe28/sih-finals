import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../../../client';
import { MDBDataTable } from 'mdbreact';
import './ViewScheme.css';
import SortIcon from '@mui/icons-material/Sort';
import AddScheme from '../AddScheme/AddScheme';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ViewScheme = ({token}) => {
    const stateName = token.user.user_metadata.instituteName;
    const [viewScheme, setViewScheme] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);

    useEffect(() => {
        getScheme();
    }, []);

    async function getScheme() {
        const { data } = await supabase.from('Schemes').select('*').eq("State", stateName);
        setViewScheme(data || []);
    }

    async function handleDelete(id) {
        console.log(id)
        try {
            await supabase.from('Schemes').delete().eq('id', id);
            window.location.reload(true)
        } catch (error) {
            console.error('Error deleting scheme:', error);
        }
    }


    const handleUpdate = (scheme) => {
        setSelectedScheme(scheme);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedScheme(null);
    };

    const data = {
        columns: [
            {
                label: <><SortIcon /> Name</>,
                field: 'SchemeName',
                sort: 'asc',
                width: 150,
            },
            {
                label: <>Description</>,
                field: 'SchemeDesc',
                // sort: 'asc',
                width: 270,
            },
            {
                label: <>Documents</>,
                field: 'Documents',
                // sort: 'asc',
                width: 200,
            },
            {
                label: <>Details</>,
                field: 'Details',
                // sort: 'asc',
                width: 100,
            },
            {
                label: <><SortIcon /> Deadline</>,
                field: 'EndDate',
                sort: 'asc',
                width: 150,
            },
            {
                label: <>Delete</>,
                field: 'Actions',
                // sort: 'asc',
                width: 100,
            },
        ],
        rows: viewScheme.map((scheme) => ({
            SchemeName: scheme.SchemeName,
            SchemeDesc: scheme.SchemeDesc,
            Documents: scheme.Documents.join(', '),
            Details: scheme.Details.join(', '),
            EndDate: scheme.EndDate,
            Actions: (
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        style={{ background: "none", color: 'black' }}
                        onClick={(event) => {
                            // event.stopPropagation();
                            handleDelete(scheme.id);
                        }}
                    > <i className="fas fa-trash-alt" style={{ fontSize: '1.13em' }} /></button>
                </div>
            ),
        })),
    };

    const noBottomColumns = {
        columns: data.columns,
        rows: [],
    };

    return (
        <>
            <MDBDataTable
                className="custom-datatable"
                striped
                bordered
                small
                data={data}
                noBottomColumns={noBottomColumns}
            />

            {/* <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this scheme?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(selectedScheme.id)}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <AddScheme existingScheme={selectedScheme} />
        </>
    );
};

export default ViewScheme;
