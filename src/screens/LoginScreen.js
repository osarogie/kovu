import React from 'react'
import { View, StyleSheet } from 'react-native'
import Authenticator from '../components/Authenticator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toolbar from '../components/Toolbar'
import { useTheme } from '../providers/ThemeProvider'

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme()

  function goBack() {
    navigation.goBack()
  }

  return (
    <>
      <Toolbar onBackPress={goBack} />
      <KeyboardAwareScrollView
        onKeyboardWillShow={frames => {
          console.log('Keyboard event', frames)
        }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{
          alignItems: 'center'
        }}
        style={[styles.scrollView]}
      >
        <View style={styles.container}>
          {/* <Image
                source={require("../images/welcome.png")}
                style={styles.logoImage}
              /> */}
          <Authenticator goBack={goBack} />
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    maxWidth: 400,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  scrollView: { width: '100%', flex: 1 }
})
