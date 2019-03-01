import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import logo from './logo.svg'
import './App.css'
import infoCourses from './InfoCourses.json'
import { InfoNTUST } from './types/infoNTUST'

const columns = [{
  Header: 'Course Id',
  accessor: 'courseno' 
}, {
  Header: 'Title',
  accessor: 'engname',
}, {
  Header: 'Credits',
  accessor: 'creditpoints'
}, {
  Header: 'Time',
  accessor: 'timenode'
}, {
  Header: 'Time',
  accessor: 'timenode'
}, {
  Header: 'Time',
  accessor: 'timenode'
}, {
  Header: 'Time',
  accessor: 'timenode'
}]

const SubComponent = (row: any) => {
  return (<div>
    Hey there
  </div>)
}

const App = () => (
    <ReactTable 
      data={infoCourses} 
      columns={columns} 
      className="-striped -highlight" 
      SubComponent={SubComponent}
      filterable 
      resizable 
    />
)

export default App
