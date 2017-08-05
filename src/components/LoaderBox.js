import React from 'react'
import { ViewPropTypes, Text, StyleSheet, View } from 'react-native'
import TouchableLoader from './TouchableLoader'

export default class LoaderBox extends React.Component {
  render() {
    console.log(this.props.error)
    return (
      <View style={styles.container}>
        <TouchableLoader
          onLoadInit={this.props.onLoadInit}
          isLoading={this.props.isLoading}
          title={this.props.error}
          containerStyle={this.props.containerStyle}
          wrapperStyle={[{ height: 100 }, this.props.wrapperStyle]}
          textStyle={this.props.textStyle}
          indicatorSize={this.props.indicatorSize}
          indicatorColor={this.props.indicatorColor}
          activityIndicatorStyle={this.props.activityIndicatorStyle}
        />
      </View>
    )
  }
}

LoaderBox.defaultProps = {
  onLoadInit: () => {},
  isLoading: false,
  title: 'Tap to load',
  indicatorColor: '#0366d6',
  indicatorSize: 'large',
  containerStyle: {},
  wrapperStyle: { backgroundColor: 'transparent' },
  textStyle: { color: '#000', fontSize: 20 },
  activityIndicatorStyle: {}
}

LoaderBox.propTypes = {
  ...ViewPropTypes,
  onLoadInit: React.PropTypes.func,
  isLoading: React.PropTypes.bool,
  title: React.PropTypes.string,
  indicatorColor: React.PropTypes.string,
  indicatorSize: React.PropTypes.string,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
  activityIndicatorStyle: View.propTypes.style
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
