import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { supabase } from '../../../client';
// import './css/table.css'

export default function ViewScheme() {
    const [veiwScheme, setViewScheme] = useState();
    useEffect(() => {
        getScheme()
    }, []);
    async function getScheme() {
        const { data } = await supabase
            .from('Schemes')
            .select('*')
        setViewScheme(data);
        console.log(data);
    }
    async function handleDelete(id) {

        const { error } = await supabase
            .from('Schemes')
            .delete()
            .eq('id', id)

            window.location.reload(true);

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
                    {veiwScheme?.map((scheme, index) => {
                        return (
                            <tr>
                                <td data-label="scheme" style={{whiteSpace: 'wrap'}}>{scheme.SchemeName}</td>
                                <td data-label="desc" style={{whiteSpace: 'wrap'}}>{scheme.SchemeDesc}</td>
                                <td data-label="documents" style={{whiteSpace: 'wrap'}}>{scheme.Documents.join(', ')}</td>
                                <td data-label="details" style={{whiteSpace: 'wrap'}}>{scheme.Details.join(', ')}</td>
                                <td data-label="date" style={{whiteSpace: 'wrap'}}>{scheme.EndDate}</td>
                                <td data-label="Delete">
                                    <button
                                        style={{ background: "none", color: 'black' }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleDelete(scheme.id);
                                        }}
                                    > <i class="fas fa-trash-alt" /></button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
    
        </div>
    )
}
