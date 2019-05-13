import * as React from 'react'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

const { useState, useContext, useEffect } = React

interface ViewerContextInterface {
  viewer?: Viewer | null
  setToken?: React.Dispatch<React.SetStateAction<string>>
  token?: string
}

const ViewerContext = React.createContext<ViewerContextInterface>({})
const { Provider } = ViewerContext

export let ViewerProvider = function ViewerProvider({
  children,
  user,
  loggedin,
  api_key
}: any) {
  const [token, setToken] = useState(api_key)
  const [viewer, setViewer] = useState(loggedin ? user : null)
  // const [refetched, setRefetched] = useState(false)

  //   useEffect(() => {
  //     if (token) AsyncStorage.setItem('token', token)
  //     getViewer()
  //   }, [token])

  useEffect(() => {
    setViewer(loggedin ? user : null)
  }, [loggedin])

  //   async function getViewer() {
  //     if (token) {
  //       const { data, status } = await ApiService.get(
  //         `${API_HOST}/users/current`,
  //         token
  //       )
  //       if (status === 'success') setViewer(data)
  //     }
  //   }

  return <Provider value={{ viewer, setToken, token }}>{children}</Provider>
}

const mapStateToProps = state => ({
  user: state.user.user,
  api_key: state.user.api_key,
  loggedIn: state.user.loggedIn
})

ViewerProvider = connect(mapStateToProps)(ViewerProvider)

export function connectViewer(Component: React.Component<{}>) {
  return function(props: any) {
    const { viewer, setToken, token } = useContext(ViewerContext)
    const hasViewer = !!viewer

    function requireViewer(message = 'Login'): Boolean {
      if (hasViewer) return true
      return false
    }

    return (
      <Component
        viewer={viewer}
        hasViewer={hasViewer}
        setToken={setToken}
        token={token}
        requireViewer={requireViewer}
        {...props}
      />
    )
  }
}

export function useViewer() {
  return useContext(ViewerContext)
}
