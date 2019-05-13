import { useNavigation } from './navigationHook'
import { useViewer } from '../viewerService'
import { NavigationParams } from 'react-navigation-types-only'

interface WriteParams extends NavigationParams {
  id?: string | Number
  culture?: Model
  discussion?: Model
  editing_mode?: Boolean
}

interface ProfileParams extends NavigationParams {
  id?: string | Number
  user: Viewer
}

export function useAppNavigation() {
  const { navigate } = useNavigation()
  const { viewer } = useViewer()

  function requireViewer(route: string, params?: NavigationParams) {
    if (!viewer) return navigate('Login')
    navigate(route, params)
  }

  return {
    openWrite(params?: WriteParams) {
      requireViewer('Write', params)
    },

    openViewerProfile() {
      requireViewer('Profile', { id: viewer ? viewer.id : 0 })
    },

    openProfile(params?: ProfileParams) {
      navigate('Profile', params)
    },

    openLogin() {
      navigate('Login')
    }
  }
}
