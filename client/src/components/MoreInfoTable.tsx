import React, { Fragment } from 'react'
import styled from 'styled-components'

export interface MoreInfoRow { title: string, value: string | number, isUrl?: boolean }

const Table = styled.table`
  width: 98%;
  table-layout: fixed;
  border: 1px solid lightgray;
  border-collapse: collapse;
  margin-right: 1%;
  margin-left: 1%;
`

const Tr = styled.tr`
  :nth-child(odd) {
    background-color: #f2f7ff;
  }
  :nth-child(even) {
    background-color: #f9fbff;
  }
`
const Td = styled.td`
  padding: 7px;
  border: 1px solid lightgray;
  font-size: 14px;
  word-wrap:break-word;
`

const MoreInfoRow: React.SFC<MoreInfoRow> = props => <Fragment>
  <Tr>
    <Td style={{ width: '20%', textAlign: 'right' }}>{props.title}</Td>
    {(props.isUrl === true)
      ? <Td style={{ width: '80%' }}><a href={String(props.value)}>{props.value}</a></Td>
      : <Td style={{ width: '80%' }}>{props.value}</Td>
    }
    
  </Tr>
</Fragment>

export const MoreInfoTable: React.SFC<{ rows: Array<MoreInfoRow> }> = props => <Fragment>
  <Table><tbody>
      {props.rows.map(row => 
        <MoreInfoRow key={row.title} title={row.title} value={row.value} isUrl={row.isUrl} />
      )}
  </tbody></Table>
</Fragment>
