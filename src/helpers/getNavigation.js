const getNavigation = navigation => ({
  openProfile(user) {
    navigation.navigate('Profile', { ...user, id: user._id || user.id, user })
  },
  openCulture(culture) {
    navigation.navigate('Culture', { ...culture, id: culture._id, culture })
  },
  openDiscussion(discussion) {
    navigation.navigate('Discussion', {
      ...discussion,
      username: discussion.user && discussion.user.username,
      id: discussion._id,
      discussion
    })
  },
  openComments(discussion) {
    navigation.navigate('Comments', {
      ...discussion,
      id: discussion._id,
      discussion
    })
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
    navigation.navigate('Auth')
  },
  openSearch() {
    navigation.navigate('Discover')
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
})
export default getNavigation

export const navHelper = component => getNavigation(component.props.navigation)
