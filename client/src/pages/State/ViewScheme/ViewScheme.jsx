import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../../../client';
import { MDBDataTable } from 'mdbreact';
import './ViewScheme.css';
import SortIcon from '@mui/icons-material/Sort';
import AddScheme from '../AddScheme/AddScheme';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ViewScheme = () => {
    const [viewScheme, setViewScheme] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);

    useEffect(() => {
        getScheme();
    }, []);

    async function getScheme() {
        const { data } = await supabase.from('Schemes').select('*');
        setViewScheme(data || []);
    }

    //   async function handleDelete(id) {
    //     console.log(id);
    //     try {
    //       await supabase.from('Schemes').delete().eq('id', id);
    //       window.location.reload(true)
    //     } catch (error) {
    //       console.error('Error deleting scheme:', error);
    //     } 
    //     // finally {
    //     //   setShowDeleteModal(false);
    //     //   setSelectedScheme(null);
    //     // }
    //   }
    async function handleDelete(id) {
        console.log(id)
        // const { error } = await supabase
        //     .from('Schemes')
        //     .delete()
        //     .eq('id', id)

        try {
            await supabase.from('Schemes').delete().eq('id', id);
            window.location.reload(true)
        } catch (error) {
            console.error('Error deleting scheme:', error);
        }
        // finally {
        //   setShowDeleteModal(false);
        //   setSelectedScheme(null);
        // }

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
                label: <><SortIcon /> Description</>,
                field: 'SchemeDesc',
                sort: 'asc',
                width: 270,
            },
            {
                label: <><SortIcon /> Documents</>,
                field: 'Documents',
                sort: 'asc',
                width: 200,
            },
            {
                label: <><SortIcon /> Details</>,
                field: 'Details',
                sort: 'asc',
                width: 100,
            },
            {
                label: <><SortIcon /> Deadline</>,
                field: 'EndDate',
                sort: 'asc',
                width: 150,
            },
            {
                label: <><SortIcon /> Actions</>,
                field: 'Actions',
                sort: 'asc',
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
                    <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleUpdate(scheme)}
                        className="mx-2"
                    >
                        Update
                    </Button>
                    {/* <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setSelectedScheme(scheme);
              setShowDeleteModal(true);
            }}
            className="mx-2"
          >
            Delete
          </Button> */}
                    <button
                        style={{ background: "none", color: 'black' }}
                        onClick={(event) => {
                            // event.stopPropagation();
                            handleDelete(scheme.id);
                        }}
                    > <i className="fas fa-trash-alt" /></button>
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
