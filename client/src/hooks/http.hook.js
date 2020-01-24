import {useState, useCallback} from 'react'

export const useHttp = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)
    try {

      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      if (!response.ok && response.status === 422 && data.errors) {
        setLoading(false)

        const respErrors = {};

        data.errors.forEach(item => {
          respErrors[item.param] = item.msg
        })

        return setFieldErrors(respErrors)
      } else if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again later.')
      }

      setLoading(false)
      return data

    } catch (e) {
      setLoading(false)
      setError(e.message)

      throw e
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])
  const clearFieldErrors = useCallback(() => setFieldErrors(null), [])

  return { loading, request, error, clearError, fieldErrors, clearFieldErrors }
}