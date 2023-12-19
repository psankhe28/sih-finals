import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../../../client'; import { MDBDataTable } from 'mdbreact';
import './StudentScheme.css'
import SortIcon from '@mui/icons-material/Sort';

const StudentScheme = () => {
    const [viewScheme, setViewScheme] = useState();
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
                field: 'salary',
                sort: 'asc',
                width: 100
            }
        ],
        rows: viewScheme ? viewScheme.map(scheme => ({
            SchemeName: scheme.SchemeName,
            SchemeDesc: scheme.SchemeDesc,
            Documents: scheme.Documents.join(', '),
            Details: scheme.Details.join(', '),
            EndDate: scheme.EndDate,
            Actions: (
                <button
                    style={{ background: 'none', color: 'black' }}
                    onClick={(event) => {
                        event.stopPropagation();
                        // Assuming you have a handleDelete function
                        handleDelete(scheme.id);
                    }}
                >
                    <i className="fas fa-trash-alt" />
                </button>
            )
        })) : []
    };

    const noBottomColumns = {
        columns: data.columns,
        rows: []
    };

    return (
        <MDBDataTable
            className="custom-datatable"
            striped
            bordered
            small
            data={data}
            noBottomColumns={noBottomColumns}
        />
    );
}

export default StudentScheme;

