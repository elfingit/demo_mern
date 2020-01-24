import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({ links }) => {

  if (!links.length) {
    return <p className="center">Links not exists yet</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Main link</th>
        <th>Alias link</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
      { links.map( (link, index) => {
        return (
          <tr key={ link._id }>
            <td>{ index + 1 }</td>
            <td>{ link.main }</td>
            <td>{ link.alias }</td>
            <td>
              <Link to={`/detail/${link._id}`}>Detail</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}