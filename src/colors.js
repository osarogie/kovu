const colors = {
  statusBar: '#000',
  statusBarDark: '#262627',
  toolbar: '#fff',
  toolbarDark: '#262627',
  toolbarTitleColor: '#000',
  toolbarTitleColorDark: '#fff',
  optionIcon: '#05f',
  optionIconDark: '#fff',
  container: '#eee',
  containerDark: '#262627',
  postList: '#fff',
  postListDark: '#262627',
  icon: '#05f',
  iconDark: '#fff',
  black: '#000',
  blackDark: '#fff',
  white: '#fff',
  whiteDark: '#000',
  primary: '#333',
  primaryDark: '#fff',
  accent: '#05f',
  // accentDark: '#fff',

  random(id = -1) {
    const _colors = [
      '#ee0979',
      '#ff6a00',
      '#41295a',
      '#734b6d',
      '#627',
      '#494',
      '#725',
      '#377',
      '#478',
      '#05f',
      '#C9D6FF',
      '#E2E2E2',
      '#d9a7c7',
      '#78ffd6'
    ]

    if (id < 0) id = Math.floor(Math.random() * (_colors.length - 1))

    return _colors[id % _colors.length]
  }
}

module.exports = {
  ...colors,
  get(key, night_mode = false) {
    return night_mode && colors[`${key}Dark`]
      ? colors[`${key}Dark`]
      : colors[key]
  }
}
