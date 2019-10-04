import { Environment } from 'relay-runtime'
import * as React from 'react'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { IUser } from '../contracts/IUser'
import { createEnvironment } from '../data/createEnvironment'
import { logout } from '../actions'

const { useState, useContext, useEffect } = React

interface IViewerContext {
  viewer?: IUser | null
  setToken(token: string | null): void
  token?: string | null
  isViewer(user?: IUser): boolean
  environment: Environment
  logout(): void
}

const defaultValue: IViewerContext = {
  viewer: null,
  setToken() {},
  isViewer(user) {
    return false
  },
  logout() {},
  environment: createEnvironment({})
}

const ViewerContext = React.createContext<IViewerContext>(defaultValue)

export let ViewerProvider = function ViewerProvider({
  children,
  user,
  loggedin,
  api_key,
  dispatch
}: any) {
  const [value, setValue] = useState(defaultValue)

  // const [refetched, setRefetched] = useState(false)

  //   useEffect(() => {
  //     if (token) AsyncStorage.setItem('token', token)
  //     getViewer()
  //   }, [token])

  useEffect(() => {
    setValue({
      viewer: loggedin ? user : null,
      setToken(token) {
        setValue({ ...value, token })
      },
      token: api_key,
      isViewer(user) {
        if (user && value.viewer && user._id === value.viewer._id) return true
        return false
      },
      environment: createEnvironment({
        headers: { Authorization: `Token token=${value.token}` }
      }),
      logout() {
        dispatch(logout())
      }
    })
  }, [loggedin])

  return React.createElement(ViewerContext.Provider, { value }, children)
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  api_key: state.user.api_key,
  loggedIn: state.user.loggedIn
})

ViewerProvider = connect(mapStateToProps)(ViewerProvider)

export function useViewer(): IViewerContext {
  return useContext(ViewerContext)
}

export function useEnvironment(): Environment {
  return useContext(ViewerContext).environment
}
