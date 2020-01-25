import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, uId) => {
    setToken(jwtToken)
    setUserId(uId)

    localStorage.setItem(storageName, JSON.stringify({
      userId: uId, token: jwtToken, expire: Date.now() + 1 * 60000
    }))

  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)

  }, [])

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.expire <= Date.now()) {
      localStorage.removeItem(storageName)
      data = null
    }

    if (data && data.token) {
      login(data.token, data.userId)
    }

    setReady(true)

  }, [login])

  return { login, logout, token, userId, ready }
}