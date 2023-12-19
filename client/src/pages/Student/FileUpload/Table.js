import React,{useState} from "react";
import { CSVLink } from "react-csv";
import usersData from "./users.json";
import { useMemo } from "react";
import { useTable } from "react-table";
import './Table.css';
import { supabase } from "../../../client";

const columns = [
  { Header: "Sr. No", accessor: "id" },
  { Header: "Document", accessor: "document" },
  { Header: "Document Name", accessor: "documentName" },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => (
      <div>
        <button onClick={() => handleUpload(row.original.id)} className="action-btn">Upload</button>
        <button onClick={() => handleDelete(row.original.id)} className="action-btn">Delete</button>
      </div>
    ),
  },
];

const handleUpload = (documentId) => {
  console.log(`Upload button clicked for document with ID ${documentId}`);
};

const handleDelete = (documentId) => {
  console.log(`Delete button clicked for document with ID ${documentId}`);
};


const Table = ({ studentid }) => {
    const data = useMemo(() => usersData, []);
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });
  
    const csvData = [
      ["Sr. No", "Document", "Document Name"],
      ...data.map(({ id, document, documentName }) => [
        id,
        document,
        documentName,
      ]),
    ];

    studentid = 1331;
    const [files, setFiles] = useState({
      Aadhaar: null,
      Undertaking: null,
    });
    const handleChange = async (e) => {
      setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(files);
      for (let entry of Object.entries(files)) {
        if (!entry[1]) {
          alert("Please Upload All Required Files");
          return;
        }
      }
      for (let entry of Object.entries(files)) {
        try {
          let { data, error } = await supabase.storage
            .from("Documents")
            .upload(`${studentid}/${entry[0]}`, entry[1], {
              cacheControl: "3600",
              upsert: false,
            });
          console.group(data);
          if (error) console.log(error);
        } catch (err) {
          console.log(err);
        }
      }
    };
  
    return (
      <div className="App">
        <CSVLink className="downloadbtn" filename="my-file.csv" data={csvData}>
          Export to CSV
        </CSVLink>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default Table;
