import { Environment } from 'relay-runtime'
import * as React from 'react'
import { connect } from 'react-redux'
import { IUser } from '../contracts/IUser'
import { createEnvironment } from '../data/createEnvironment'
import { logout, setUser } from '../actions'

const { useContext } = React

interface ISessionContext {
  viewer?: IUser | null
  setToken(token: string | null): void
  token?: string | null
  isViewer(user?: IUser): boolean
  environment: Environment
  logout(): void
}

const defaultValue: ISessionContext = {
  viewer: null,
  setToken() {},
  isViewer() {
    return false
  },
  logout() {},
  environment: createEnvironment({}),
}

const SessionContext = React.createContext<ISessionContext>(defaultValue)

export let SessionProvider = function SessionProvider({
  children,
  user,
  loggedin,
  api_key,
  dispatch,
}: any) {
  // const [refetched, setRefetched] = useState(false)

  //   useEffect(() => {
  //     if (token) AsyncStorage.setItem('token', token)
  //     getViewer()
  //   }, [token])

  const value = React.useMemo<ISessionContext>(
    () => ({
      viewer: loggedin ? user : null,
      setToken(token) {
        dispatch(setUser(user, token))
      },
      token: api_key,
      isViewer(user) {
        if (user && value.viewer && user._id === value.viewer._id) return true
        return false
      },
      environment: createEnvironment({
        headers: { Authorization: `Token token=${api_key}` },
      }),
      logout() {
        dispatch(logout())
      },
    }),
    [loggedin, api_key],
  )

  return React.createElement(SessionContext.Provider, { value }, children)
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  api_key: state.user.api_key,
  loggedIn: state.user.loggedIn,
})

SessionProvider = connect(mapStateToProps)(SessionProvider)

export const useSession = () => useContext(SessionContext)
export const useViewer = () => useContext(SessionContext).viewer
export function useEnvironment(): Environment {
  return useContext(SessionContext).environment
}
