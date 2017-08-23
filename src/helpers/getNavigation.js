export default (getNavigation = navigation => ({
  openProfile(user) {
    navigation.navigate('Profile', { id: user._id || user.id, user })
  },
  openCollection(collection) {
    navigation.navigate('Collection', { id: collection._id, collection })
  },
  openDiscussion(discussion) {
    navigation.navigate('Discussion', { id: discussion._id, discussion })
  },
  openComments(discussion) {
    navigation.navigate('Comments', { id: discussion._id, discussion })
  },
  openWrite() {
    navigation.navigate('Write')
  },
  openLogin() {
    navigation.navigate('Login')
  },
  openSearch() {
    nnavigation.navigate('Search')
  }
}))
