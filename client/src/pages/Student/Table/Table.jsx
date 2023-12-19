import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './Table.css'
import SortIcon from '@mui/icons-material/Sort';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: <><SortIcon /> Name</>,
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: <><SortIcon /> Position</>,
        field: 'position',
        sort: 'asc',
        width: 270
      },
      {
        label: <><SortIcon /> Office</>,
        field: 'office',
        sort: 'asc',
        width: 200
      },
      {
        label: <><SortIcon /> Age</>,
        field: 'age',
        sort: 'asc',
        width: 100
      },
      {
        label: <><SortIcon /> Start Date</>,
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: <><SortIcon /> Salary</>,
        field: 'salary',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
          {
            name: 'Jennifer Chang',
            position: 'Regional Director',
            office: 'Singapore',
            age: '28',
            date: '2010/11/14',
            salary: '$357'
          },
          {
            name: 'Brenden Wagner',
            position: 'Software Engineer',
            office: 'San Francisco',
            age: '28',
            date: '2011/06/07',
            salary: '$206'
          },
          {
            name: 'Fiona Green',
            position: 'Chief Operating Officer (COO)',
            office: 'San Francisco',
            age: '48',
            date: '2010/03/11',
            salary: '$850'
          },
          {
            name: 'Shou Itou',
            position: 'Regional Marketing',
            office: 'Tokyo',
            age: '20',
            date: '2011/08/14',
            salary: '$163'
          },
          {
            name: 'Michelle House',
            position: 'Integration Specialist',
            office: 'Sidney',
            age: '37',
            date: '2011/06/02',
            salary: '$95'
          },
          {
            name: 'Suki Burks',
            position: 'Developer',
            office: 'London',
            age: '53',
            date: '2009/10/22',
            salary: '$114'
          },
          {
            name: 'Prescott Bartlett',
            position: 'Technical Author',
            office: 'London',
            age: '27',
            date: '2011/05/07',
            salary: '$145'
          },
          {
            name: 'Gavin Cortez',
            position: 'Team Leader',
            office: 'San Francisco',
            age: '22',
            date: '2008/10/26',
            salary: '$235'
          },
          {
            name: 'Martena Mccray',
            position: 'Post-Sales support',
            office: 'Edinburgh',
            age: '46',
            date: '2011/03/09',
            salary: '$324'
          },
          {
            name: 'Unity Butler',
            position: 'Marketing Designer',
            office: 'San Francisco',
            age: '47',
            date: '2009/12/09',
            salary: '$85'
          },
          {
            name: 'Howard Hatfield',
            position: 'Office Manager',
            office: 'San Francisco',
            age: '51',
            date: '2008/12/16',
            salary: '$164'
          },
          {
            name: 'Hope Fuentes',
            position: 'Secretary',
            office: 'San Francisco',
            age: '41',
            date: '2010/02/12',
            salary: '$109'
          },
          {
            name: 'Vivian Harrell',
            position: 'Financial Controller',
            office: 'San Francisco',
            age: '62',
            date: '2009/02/14',
            salary: '$452'
          },
          {
            name: 'Timothy Mooney',
            position: 'Office Manager',
            office: 'London',
            age: '37',
            date: '2008/12/11',
            salary: '$136'
          },
          {
            name: 'Jackson Bradshaw',
            position: 'Director',
            office: 'New York',
            age: '65',
            date: '2008/09/26',
            salary: '$645'
          },
          {
            name: 'Olivia Liang',
            position: 'Support Engineer',
            office: 'Singapore',
            age: '64',
            date: '2011/02/03',
            salary: '$234'
          },
          {
            name: 'Bruno Nash',
            position: 'Software Engineer',
            office: 'London',
            age: '38',
            date: '2011/05/03',
            salary: '$163'
          },
          {
            name: 'Sakura Yamamoto',
            position: 'Support Engineer',
            office: 'Tokyo',
            age: '37',
            date: '2009/08/19',
            salary: '$139'
          },
          {
            name: 'Thor Walton',
            position: 'Developer',
            office: 'New York',
            age: '61',
            date: '2013/08/11',
            salary: '$98'
          },
          {
            name: 'Finn Camacho',
            position: 'Support Engineer',
            office: 'San Francisco',
            age: '47',
            date: '2009/07/07',
            salary: '$87'
          },
          {
            name: 'Serge Baldwin',
            position: 'Data Coordinator',
            office: 'Singapore',
            age: '64',
            date: '2012/04/09',
            salary: '$138'
          },
          {
            name: 'Zenaida Frank',
            position: 'Software Engineer',
            office: 'New York',
            age: '63',
            date: '2010/01/04',
            salary: '$125'
          },
          {
            name: 'Zorita Serrano',
            position: 'Software Engineer',
            office: 'San Francisco',
            age: '56',
            date: '2012/06/01',
            salary: '$115'
          },
          {
            name: 'Jennifer Acosta',
            position: 'Junior Javascript Developer',
            office: 'Edinburgh',
            age: '43',
            date: '2013/02/01',
            salary: '$75'
          },
          {
            name: 'Cara Stevens',
            position: 'Sales Assistant',
            office: 'New York',
            age: '46',
            date: '2011/12/06',
            salary: '$145'
          },
          {
            name: 'Hermione Butler',
            position: 'Regional Director',
            office: 'London',
            age: '47',
            date: '2011/03/21',
            salary: '$356'
          },
          {
            name: 'Lael Greer',
            position: 'Systems Administrator',
            office: 'London',
            age: '21',
            date: '2009/02/27',
            salary: '$103'
          },
          {
            name: 'Jonas Alexander',
            position: 'Developer',
            office: 'San Francisco',
            age: '30',
            date: '2010/07/14',
            salary: '$86'
          },
          {
            name: 'Shad Decker',
            position: 'Regional Director',
            office: 'Edinburgh',
            age: '51',
            date: '2008/11/13',
            salary: '$183'
          },
          {
            name: 'Michael Bruce',
            position: 'Javascript Developer',
            office: 'Singapore',
            age: '29',
            date: '2011/06/27',
            salary: '$183'
          },
          {
            name: 'Donna Snider',
            position: 'Customer Support',
            office: 'New York',
            age: '27',
            date: '2011/01/25',
            salary: '$112'
          }
    ]
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
      noBottomColumns={noBottomColumns} // This will remove the column heading row at the end of each page
    />
  );
}

export default DatatablePage;

