import React, { Component, ChangeEvent } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import logo from './logo.svg'
import './App.css'
import courses from './CourseExtracts.json'
import ReactJsonView from 'react-json-view'

const columns = [{
  Header: 'Course ID',
  accessor: 'id' 
}, {
  Header: 'Title',
  accessor: 'title',
}, {
  Header: 'Time',
  accessor: 'time'
}, {
  Header: 'Location',
  accessor: 'location'
}, {
  Header: 'Credits',
  accessor: 'credits'
}]

const Default = (row: any) => <ReactJsonView src={row.original} />

const Table = (row: any) => <table><tbody>
  <tr><td>id</td><td>{row.original.id}</td></tr>
  <tr><td>title</td><td>{row.original.title}</td></tr>
  <tr><td>location</td><td>{row.original.location}</td></tr>
  <tr><td>time</td><td>{row.original.time}</td></tr>
  <tr><td>url</td><td>
    <table><tbody>
      <tr><td>outline</td><td><a href={row.original.url.outline}>{row.original.url.outline}</a></td></tr>
      <tr><td>info</td><td><a href={row.original.url.info}>{row.original.url.info}</a></td></tr>
      <tr><td>course site</td><td><a href={row.original.url.http}>{row.original.url.http}</a></td></tr>
    </tbody></table>
  </td></tr>
  <tr><td>registered students</td><td>
    <table><tbody>
      <tr><td>NTUST</td><td>{row.original.studentCountNTUST}</td></tr>
      <tr><td>NTU</td><td>{row.original.studentCountNTU}</td></tr>
      <tr><td>total</td><td>{row.original.studentCountTotal}</td></tr>
    </tbody></table>
  </td></tr>
  <tr><td>department</td><td>{row.original.department}</td></tr>
  <tr><td>faculty</td><td>{row.original.faculty}</td></tr>
  <tr><td>description</td><td>{row.original.description}</td></tr>
  <tr><td>term</td><td>{row.original.term}</td></tr>
  <tr><td>semester</td><td>{row.original.semester}</td></tr>
  <tr><td>core</td><td>{row.original.core}</td></tr>
  <tr><td>object</td><td>{row.original.object}</td></tr>
  <tr><td>content</td><td>{row.original.content}</td></tr>
  <tr><td>textbook</td><td>{row.original.textbook}</td></tr>
  <tr><td>refbook</td><td>{row.original.refbook}</td></tr>
  <tr><td>note</td><td>{row.original.note}</td></tr>
  <tr><td>grading</td><td>{row.original.grading}</td></tr>
  <tr><td>remark</td><td>{row.original.remark}</td></tr>
</tbody></table>

const searchFilter = (searchText: string) => (course: any) => {
  return [
    course.description,
    course.core,
    course.object,
    course.content,
    course.textbook,
    course.refbook,
    course.note,
    course.grading,
    course.remark
  ]
    .map(_ => _ ? String(_).includes(searchText) : false)
    .reduce((prev, curr) => prev || curr)
}

class App extends Component {
  public readonly state = {
    searchText: ''
  }
  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value })
  }
  render() {
    return <div>
      <input 
        id="global-search" 
        placeholder="Search in descriptions..." 
        onChange={this.onSearchChange}
      />
      <ReactTable 
        data={(this.state.searchText) ? courses.filter(searchFilter(this.state.searchText)) : courses} 
        columns={columns} 
        className="-striped -highlight" 
        SubComponent={Table}
        filterable 
        resizable
        defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id
          return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
        }}
      />
    </div>
  }
}

export default App
