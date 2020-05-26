import React, { useState, useMemo } from 'react'
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  TabBarIOS,
} from 'react-native'
import styles from '../styles'
import searchStyles from '../styles/search'
import TextInput from '../components/TextInput'
import Discover from '../renderers/Discover'
// import Icon from 'react-native-vector-icons/Ionicons'
import { Icon } from '@shoutem/ui/components/Icon'
import { HorizontalPager } from '@shoutem/ui/components/HorizontalPager'
import { PageIndicators } from '@shoutem/ui/components/PageIndicators'
import getNavigation from '../helpers/getNavigation'

export default function SearchScreen({ navigation }) {
  const [qs, setQs] = useState('')
  const [q, setQ] = useState('')
  // static navigationOptions = {
  //   tabBarLabel: "Discover",
  //   tabBarIcon: ({ tintColor, focused }) => (
  //     <Icon
  //       name="search"
  //       // style={styles.tabIcon}
  //       size={focused ? 25 : 23}
  //       color={tintColor}
  //     />
  //   )
  // }

  const handleSubmit = () => useMemo(() => setQs(inputRef.current.state.value))

  renderToolbar = () => {
    return (
      <View
        style={{
          paddingRight: 10,
          paddingLeft: 10,
          height: 53,
          marginTop: 20,
          width: '100%',
          position: 'absolute',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}>
        <View style={searchStyles.container}>
          <TextInput
            inputProps={{
              returnKeyLabel: 'search',
              returnKeyType: 'search',
            }}
            inputStyle={{ color: '#000' }}
            iconColor="#000"
            style={{ backgroundColor: '#eee' }}
            placeholder="Search TheCommunity"
            ref={inputRef}
            androidIcon="search"
            // value={q}
            // onChangeText={setQ}
            onSubmitEditing={handleSubmit}
          />
        </View>
      </View>
    )
  }
  renderPage = () => {
    return (
      <View style={[styles.container]}>
        <PageIndicators count={3} activeIndex={0} />
        <HorizontalPager data={[]} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderPage()}
      {renderToolbar()}
    </View>
  )
}

const styles2 = StyleSheet.create({
  wrapper: { backgroundColor: '#000' },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
