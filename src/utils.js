export const openProfile = (user, navigation) =>
  navigation.navigate('Profile', { id: user._id || user.id, user })

export const openDiscussion = (discussion, navigation) =>
  navigation.navigate('Discussion', { id: discussion._id })

export const openCollection = (collection, navigation) =>
  navigation.navigate('Collection', { id: collection._id, collection })

export const openComments = (discussion, navigation) =>
  navigation.navigate('Comments', { id: discussion._id, discussion })

export const openWrite = navigation => navigation.navigate('Write')

export const openLogin = navigation => navigation.navigate('Login')

export const openSearch = navigation => navigation.navigate('Search')

export const getTimeAgo = time => {
  var diff = new Date().getTime() / 1000 - time
  var time_diff

  var MINUTE = 60
  var HOUR = MINUTE * 60
  var DAY = HOUR * 24
  var WEEK = DAY * 7
  var MONTH = DAY * 30
  var YEAR = DAY * 356

  if (diff >= YEAR) {
    const t = new Date(time * 1000)
    // time_diff = `${time.getMonth()} ${time.getFullYear()}`
    time_diff = `${t.getDate()} ${getMonth(t.getMonth())} ${t.getFullYear()}`
  } else if (diff >= MONTH) {
    const t = new Date(time * 1000)
    time_diff = `${getMonth(t.getMonth())} ${t.getDate()}`
  } else if (diff >= WEEK) {
    const duration = Math.floor(diff / WEEK)
    time_diff = duration.toString() + ` week${duration !== 1 ? 's' : ''} ago`
  } else if (diff >= DAY) {
    const duration = Math.floor(diff / DAY)
    time_diff = duration.toString() + ` day${duration !== 1 ? 's' : ''} ago`
  } else if (diff >= HOUR) {
    const duration = Math.floor(diff / HOUR)
    time_diff = duration.toString() + ` hour${duration !== 1 ? 's' : ''} ago`
  } else if (diff >= MINUTE) {
    const duration = Math.floor(diff / MINUTE)
    time_diff = duration.toString() + ` minute${duration !== 1 ? 's' : ''} ago`
  } else time_diff = diff.toString() + `s`

  return time_diff
}

export const getCommentCount = count => count

export const imageUrl = (name, dim = false) =>
  `https://img.thecommunity.ng/${dim && dim + '/'}${name}`

function getMonth(month) {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ]
  return months[month]
}
