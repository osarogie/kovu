import React from 'react'
import { View, StyleSheet } from 'react-native'
import Authenticator from '../components/Authenticator'
import { useTheme } from '../providers/ThemeProvider'
import { Appbar } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme()

  function goBack() {
    navigation.goBack()
  }

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Appbar.BackAction
        key="nav-icon"
        onPress={goBack}
        color={colors.text}
        style={{ margin: 10 }}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={[styles.scrollView]}>
        <View style={styles.container}>
          {/* <Image
                source={require("../images/welcome.png")}
                style={styles.logoImage}
              /> */}
          <Authenticator goBack={goBack} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    maxWidth: 500,
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
  },
  scrollView: { width: '100%', flex: 1 },
})
