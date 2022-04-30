
import { Button, Center, Heading, Image, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table/dist/react-table.development';
import './App.css';

function App() {
  //state/hooks
  const [data1,setData1] = useState([]);

  useEffect(()=>{
    
      fetch("https://fakestoreapi.com/products").then((response)=>{
        return response.json();
      }).then((response)=>{
        console.log(response)
        setData1(response)
      }).catch((error)=>{
        console.log(error)
      })
      
    

  },[]);

  const columnsdata =[
          {
          Header:"Id",
          accessor:"id"
        }
      ,
          {
          Header:"Title",
          accessor:"title"
        }
      ,
          {
          Header:"Category",
          accessor:"category"
        }
      ,
          {
          Header:"Product Image",
          accessor:"image",
          Cell:({row})=><Image src={row.values.image} height={100} />
        }
      ,
          {
          Header:"Price",
          accessor:"price",
          Cell:({row})=>`$ ${row.values.price}`
        }
      ,
      {
        Header:"Action",
        accessor:"Action",
        Cell:({row})=><Button onClick={()=>alert(`$ ${row.values.price}`)}>Show price</Button>


      }
]
 const columns = useMemo(()=>columnsdata,[])
 const data = useMemo(()=>data1,[data1])
  const table = useTable({columns,data})
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
    
  }=table;


  //return statement
  
  return (
    <>
    <Center>
    <Heading>React table</Heading>

    </Center>
    
    {
      data1.length === 0 && 
      <Center>
      <Spinner />
    </Center>

    }
    <Table variant='striped' colorScheme='orang' {...getTableProps()}>
      <Thead>
        {
          headerGroups.map((headerGroup)=>(
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((columns)=>(
                  <Th{...columns.getHeaderProps()}>
                  {columns.render("Header")}</Th>
                ))
              }
          </Tr>

          ))
        }

      </Thead>
      <Tbody {...getTableBodyProps()}>
        {// Loop over the table rows
       rows.map(row => {
        // Prepare the row for display
        prepareRow(row)
        return (
          // Apply the row props
          <Tr {...row.getRowProps()}>
            {// Loop over the rows cells
            row.cells.map(cell => {
              // Apply the cell props
              return (
                <Td {...cell.getCellProps()}>
                  {// Render the cell contents
                  cell.render('Cell')}
                </Td>
              )
            })}
          </Tr>
        )
      })}
      </Tbody>

    </Table>
    
  
        
    </>
  );
}

export default App;
