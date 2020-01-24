import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>Shorted: <a href={ link.alias } target="_blank" rel="noopener noreferrer">{ link.alias }</a></p>
      <p>Main: <a href={ link.main } target="_blank" rel="noopener noreferrer">{ link.main }</a></p>
      <p>Clicks count: <strong>{ link.clicks }</strong></p>
      <p>Created at: <strong>{ new Date(link.date).toLocaleDateString() }</strong></p>
    </>
  )
}