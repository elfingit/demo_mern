import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'
import {useMessage} from "../hooks/message.hook";

export const CreatePage = () => {

  const { request, fieldErrors, clearFieldErrors, error, clearError, unAuthorized } = useHttp()

  const [formErrors, setFormErrors] = useState(null)
  const [link, setLink] = useState('')
  const message = useMessage()

  const history = useHistory()
  const auth = useContext(AuthContext)

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  useEffect(() => {
    setFormErrors(fieldErrors)
  }, [fieldErrors, setFormErrors, formErrors])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {

    if (unAuthorized === true) {
      auth.logout()
    }

  }, [unAuthorized])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      clearFieldErrors()
      try {
        const data = await request('/api/link/generate', 'POST', {
          from: link
        }, {
          Authorization: `Bearer ${auth.token}`
        })

        history.push(`/detail/${data._id}`)

      } catch (e) {
      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="Enter link"
            id="link"
            type="text"
            className={(formErrors && formErrors.from ? 'invalid' : '')}
            name="link"
            onChange={e => setLink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
          <span
            className="helper-text"
            data-error={ formErrors && formErrors.from ? formErrors.from : ''  }
          ></span>
        </div>
      </div>
    </div>
  )
}