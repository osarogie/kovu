export default (getNavigation = navigation => ({
  openProfile(user) {
    navigation.navigate('Profile', { id: user._id || user.id, user })
  },
  openCulture(culture) {
    navigation.navigate('Culture', { id: culture._id, culture })
  },
  openDiscussion(discussion) {
    navigation.navigate('Discussion', { id: discussion._id, discussion })
  },
  openComments(discussion) {
    navigation.navigate('Comments', { id: discussion._id, discussion })
  },
  openWrite({
    culture = false,
    id = null,
    discussion = false,
    editing_mode = false
  }) {
    navigation.navigate('Write', { culture, discussion, id, editing_mode })
  },
  openLogin() {
    navigation.navigate('Login')
  },
  openSearch() {
    nnavigation.navigate('Discover')
  },
  openEditProfile() {
    navigation.navigate('EditProfile')
  },
  openChangePassword() {
    navigation.navigate('ChangePassword')
  },
  goBack: navigation.goBack,

  openStartCulture({ id, editing_mode = false }) {
    navigation.navigate('StartCulture', { editing_mode, id })
  },
  openProfilePicture(user) {
    navigation.navigate('ProfilePicture', user)
  }
}))

export const navHelper = component => getNavigation(component.props.navigation)
