import React, { useRef, useState, useCallback } from 'react'
import { View, Platform } from 'react-native'
import styles from '../styles'
import searchStyles from '../styles/search'
import TextInput from '../components/TextInput'
import Discover from '../renderers/Discover'
import Icon from 'react-native-vector-icons/Feather'
// import { Icon } from '@shoutem/ui/components/Icon'
import getNavigation from '../helpers/getNavigation'
import { WHITE } from '../ui'
import { set } from 'react-native-reanimated'
import { useTheme } from 'react-native-paper'
// import { withNavigation } from '../navigation/withNavigation'

// @withNavigation
export default function DiscoverScreen({ navigation }) {
  // static navigationOptions = {
  //   tabBarLabel: 'Discover',
  //   tabBarIcon: ({ tintColor, focused }) => (
  //     <Icon
  //       name="search"
  //       // style={styles.tabIcon}
  //       size={focused ? 25 : 23}
  //       color={tintColor}
  //     />
  //   ),
  // }
  const { colors } = useTheme()
  const [q, setQ] = useState('')
  const [qs, setQs] = useState('')
  const inputRef = useRef()

  const handleSubmit = useCallback(() => setQs(inputRef.current.state.value), [
    inputRef,
  ])

  const renderToolbar = () => {
    return (
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          height: 53,
          width: '100%',
          // position: 'absolute',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}>
        <View style={searchStyles.container}>
          <TextInput
            inputProps={{
              returnKeyLabel: 'search',
              returnKeyType: 'search',
            }}
            placeholderTextColor={colors.darkGray}
            inputStyle={{ color: colors.darkGray }}
            iconColor={colors.darkGray}
            style={{
              backgroundColor: colors.separator,
              elevation: 0,
              borderRadius: 5,
              // borderWidth: 1,
              // borderColor: '#eee',
              // ...Platform.select({ web: { borderStyle: 'solid' } })
            }}
            placeholder="Search TheCommunity"
            ref={inputRef}
            androidIcon="search"
            // value={q}
            // onChangeText={q => setState({ q })}
            onSubmitEditing={handleSubmit}
          />
        </View>
      </View>
    )
  }
  const renderPage = () => {
    return (
      <View style={[styles.container]}>
        <Discover {...getNavigation(navigation)} q={qs} />
        {/* <View style={styles.elevation} /> */}
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {renderToolbar()}
      {renderPage()}
    </View>
  )
}

// const styles2 = StyleSheet.create({
//   wrapper: { backgroundColor: '#000' },
//   slide1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB'
//   },
//   slide2: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#97CAE5'
//   },
//   slide3: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#92BBD9'
//   },
//   text: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold'
//   }
// })
