import { useNavigation } from './navigationHooks'
import { useViewer } from '../providers/ViewerProvider'
import { NavigationParams } from 'react-navigation-types-only'
import { IAppNavigation } from './IAppNavigation'
import { useEffect, useState } from 'react'

export function useAppNavigation(): IAppNavigation {
  const navigation = useNavigation()
  const { viewer } = useViewer()
  const [appNavigation, setAppNavigation] = useState<IAppNavigation>({})

  useEffect(() => {
    const { navigate, goBack } = navigation

    setAppNavigation({
      goBack,

      openDiscussionForm(params) {
        return requireViewer('Write', params)
      },

      openViewerProfile() {
        return requireViewer('Profile', { id: viewer ? viewer.id : 0 })
      },

      openProfile(id, user) {
        return navigate('Profile', { id, user })
      },

      openLogin() {
        return navigate('Auth')
      },

      openGroup(id, group) {
        return navigate('Culture', { id, group })
      },

      openDiscussion(id, discussion) {
        return navigate('Discussion', {
          id,
          discussion
        })
      },

      openComments(discussionID, discussion) {
        return navigate('Comments', {
          discussionID,
          discussion
        })
      },

      openSearch() {
        return navigate('Discover')
      },

      openProfileForm() {
        return navigate('EditProfile')
      },

      openChangePassword() {
        return navigate('ChangePassword')
      },

      openGroupForm(params) {
        return navigate('StartCulture', params)
      },

      openProfilePicture(picture_name) {
        return navigate('ProfilePicture', { picture_name })
      }
    })
  }, [navigation])

  function requireViewer(route: string, params?: NavigationParams): boolean {
    const { navigate } = navigation

    if (!viewer) return navigate('Auth')
    return navigate(route, params)
  }

  return appNavigation
}
