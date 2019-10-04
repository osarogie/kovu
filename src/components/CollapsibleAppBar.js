import Animated, {
  diffClamp,
  interpolate,
  event,
  multiply
} from 'react-native-reanimated'

class CollapsibleNavBar extends React.Component {
  constructor(props) {
    super(props)

    this.scrollY = new Value(0)

    const diffClampNode = diffClamp(this.scrollY, 0, NAV_BAR_HEIGHT)
    this.animatedNavBarTranslateY = multiply(diffClampNode, -1)
    this.animatedTitleOpacity = interpolate(this.animatedNavBarTranslateY, {
      inputRange: [-NAV_BAR_HEIGHT, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.scrollY
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <View key={i} style={styles.row}>
              <Text>{i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.navBar,
            {
              transform: [
                {
                  translateY: this.animatedNavBarTranslateY
                }
              ]
            }
          ]}
        >
          <Animated.Text
            style={[styles.navBarTitle, { opacity: this.animatedTitleOpacity }]}
          >
            Navigation Bar
          </Animated.Text>
        </Animated.View>
      </View>
    )
  }
}
