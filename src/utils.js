export const openProfile = (user, navigation) =>
  navigation.navigate('Profile', { id: user._id || user.id, user })

export const openDiscussion = (discussion, navigation) =>
  navigation.navigate('Discussion', { id: discussion._id })

export const openCulture = (culture, navigation) =>
  navigation.navigate('Culture', { id: culture._id, culture })

export const openComments = (discussion, navigation) =>
  navigation.navigate('Comments', { id: discussion._id, discussion })

export const openWrite = (
  navigation,
  { culture, discussion, id, editing_mode = false }
) =>
  navigation.navigate('Write', {
    culture,
    id,
    discussion,
    editing_mode
  })

export const openLogin = navigation => navigation.navigate('Login')
export const openEditProfile = (user, navigation) =>
  navigation.navigate('EditProfile', { id: user.id })
export const openChangePassword = navigation =>
  navigation.navigate('ChangePassword')

export const openSearch = navigation => navigation.navigate('Discover')
export const openStartCulture = (navigation, { id, editing_mode = false }) =>
  navigation.navigate('StartCulture', { editing_mode, id })
export const goBack = navigation => navigation.goBack()

export const getTimeAgo = time => {
  var diff = Math.floor(new Date().getTime() / 1000 - time)
  var time_diff

  var MINUTE = 60
  var HOUR = MINUTE * 60
  var DAY = HOUR * 24
  var WEEK = DAY * 7
  var MONTH = DAY * 30
  var YEAR = DAY * 356

  const t = new Date(time * 1000)
  if (diff >= YEAR) {
    // time_diff = `${time.getMonth()} ${time.getFullYear()}`
    time_diff = `${t.getDate()}/${t.getMonth()}/${t
      .getYear()
      .toString()
      .slice(1, 3)}`
  } else if (diff >= MONTH) {
    time_diff = `${getMonth(t.getMonth())} ${t.getDate()}`
  } else if (diff > WEEK) {
    const duration = Math.floor(diff / WEEK)
    time_diff = duration.toString() + ` week${duration !== 1 ? 's' : ''} ago`
  } else if (diff == WEEK) {
    time_diff = getDay(t.getDay())
  } else if (diff > DAY) {
    const duration = Math.floor(diff / DAY)
    time_diff = duration.toString() + ` day${duration !== 1 ? 's' : ''} ago`
  } else if (diff == DAY) {
    time_diff = 'Yesterday'
  } else if (diff >= HOUR) {
    const duration = Math.floor(diff / HOUR)
    time_diff = duration.toString() + ` hour${duration !== 1 ? 's' : ''} ago`
  } else if (diff >= MINUTE) {
    const duration = Math.floor(diff / MINUTE)
    time_diff = duration.toString() + ` min${duration !== 1 ? 's' : ''} ago`
  } else time_diff = diff.toString() + `s`

  return time_diff
}

export const getCommentCount = count => count

export const imageUrl = (name, dim = false) =>
  `https://img.thecommunity.ng/${dim && dim + 'g/'}${name}`

function getMonth(month) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]
  return months[month]
}
function getDay(day) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  return days[day]
}
