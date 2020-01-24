import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError, fieldErrors, clearFieldErrors} = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState(null)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    setFormErrors(fieldErrors)
  }, [fieldErrors, setFormErrors, formErrors])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      clearFieldErrors()
      const data = await request('/api/auth/register', 'POST', {
        ...form
      })

      message(data.message)

      setForm({
        email: '',
        password: ''
      })

    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      clearFieldErrors()
      const data = await request('/api/auth/login', 'POST', {
        ...form
      })

      auth.login(data.token, data.userId)

    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="email"
                  className={(formErrors && formErrors.email ? 'invalid' : 'validate') + ' yellow-input'}
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
                <span
                  className="helper-text"
                  data-error={ formErrors && formErrors.email ? formErrors.email : ''  }
                ></span>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  className={ 'yellow-input ' + (formErrors && formErrors.password ? 'invalid' : 'validate')}
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />
                  <label htmlFor="password">Password</label>
                <span
                  className="helper-text"
                  data-error={ formErrors && formErrors.password ? formErrors.password : ''  }
                ></span>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 margin-r-1"
              onClick={loginHandler}
              disabled={loading}
            >Log In</button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >Registration</button>
          </div>
        </div>
      </div>
    </div>
  )
}