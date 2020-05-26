import { useViewer } from '../providers/ViewerProvider'
import { IAppNavigation } from './IAppNavigation'
import { useMemo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationParams } from 'react-navigation'

export function useAppNavigation(): IAppNavigation {
  const navigation = useNavigation()
  const { viewer } = useViewer()
  const { navigate, goBack } = navigation

  const appNavigation = useMemo<IAppNavigation>(
    () => ({
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
          discussion,
        })
      },

      openComments(discussionID, discussion) {
        return navigate('Comments', {
          discussionID,
          discussion,
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
      },
    }),
    [navigation],
  )

  const requireViewer = useCallback(
    (route: string, params?: NavigationParams): boolean => {
      if (!viewer) {
        navigate('Auth')
        return false
      } else {
        navigate(route, params)
        return true
      }
    },
    [navigate],
  )

  return appNavigation
}
