import 'react-table/react-table.css'
import './App.css'
import React, { Component, Fragment } from 'react'
import ReactTable, { RowRenderProps } from 'react-table'
import courses from './CourseExtracts.json'
import { CourseExtract } from './types'
import { MoreInfoTable } from './components/MoreInfoTable'
import styled from 'styled-components'

const SearchBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 0px;
  margin: 0px;
  border: 2px solid lightgray;
`

const MoreInfo = (row: RowRenderProps) => {
  const course: CourseExtract = row.original
  return <MoreInfoTable rows={[
    { title: 'ID',                  value: course.id },
    { title: 'Title',               value: course.title },
    { title: 'Location',            value: course.location },
    { title: 'Time',                value: course.time },
    { title: 'Outline Url',         value: course.url.outline, isUrl: true },
    { title: 'Info Url',            value: course.url.info,    isUrl: true },
    { title: 'Course Page',         value: course.url.http,    isUrl: true },
    { title: '# of NTU students',   value: course.studentCountNTU },
    { title: '# of NTUST students', value: course.studentCountNTUST },
    { title: 'Total # of students', value: course.studentCountTotal },
    { title: 'Department',          value: course.department },
    { title: 'Faculty',             value: course.faculty },
    { title: 'Description',         value: course.description },
    { title: 'Term',                value: course.term },
    { title: 'Semester',            value: course.semester },
    { title: 'Core',                value: course.core },
    { title: 'Object',              value: course.object },
    { title: 'Content',             value: course.content },
    { title: 'Textbook',            value: course.textbook },
    { title: 'Refbook',             value: course.refbook },
    { title: 'Note',                value: course.note },
    { title: 'Grading',             value: course.grading },
    { title: 'Remark',              value: course.remark },
  ]} />
}

const columns = [
  { Header: 'Course ID', accessor: 'id',  minResizeWidth: 10 }, 
  { Header: 'Title', accessor: 'title', minResizeWidth: 10 }, 
  { Header: 'Time', accessor: 'time', minResizeWidth: 10 }, 
  { Header: 'Location', accessor: 'location', minResizeWidth: 10 }, 
  { Header: 'Credits', accessor: 'credits', minResizeWidth: 10 }
]

const containsSearchText = (searchText: string) => (course: CourseExtract) => {
  const searchableFields: Array<String> = [
    course.description,
    course.core,
    course.object,
    course.content,
    course.textbook,
    course.refbook,
    course.note,
    course.grading,
    course.remark,
  ]

  return searchableFields
    .filter(field => field !== '')
    .map(field => field.toLowerCase())
    .filter(field => field.includes(searchText.toLowerCase()))
    .length > 0
}

class App extends Component {
  public readonly state = {
    searchText: ''
  }
  render() {
    const filteredCourses = (this.state.searchText)
      ? courses.filter(containsSearchText(this.state.searchText))
      : courses
    return <Fragment>
      <SearchBox 
        id="global-search" 
        placeholder="Search in descriptions..." 
        onChange={e => this.setState({ searchText: e.target.value })}
      />
      <ReactTable 
        data={filteredCourses} 
        columns={columns} 
        className="-striped -highlight" 
        SubComponent={MoreInfo}
        filterable 
        resizable
        defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id
          return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
        }}
      />
    </Fragment>
  }
}

export default App
