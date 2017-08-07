import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  inner: {
    maxWidth: 400,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  scrollViewContainerStyle: {
    alignItems: 'center'
  },
  logoImage: {
    width: 100,
    height: 100,
    // marginTop: 60,
    marginBottom: 20
  },
  bottomControl: {
    alignItems: 'center',
    marginTop: 25
  },
  altText: {
    color: '#05f',
    // fontSize: 20
    marginTop: 20
  },
  input: {
    width: 200
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 5
  },
  button: {
    borderRadius: 40,
    width: 150,
    height: 40,
    backgroundColor: '#05f'
  },
  icon: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10
  },
  chatList: {
    backgroundColor: '#262627',
    flex: 1
  },
  toolbar: {
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    height: 53
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: '#aaa'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc'
  },
  discussionContainer: {
    margin: 20
  },
  body: {
    color: '#000',
    lineHeight: 25,
    textAlign: 'justify'
  },
  featurePhotoWarp: {
    height: 100,
    backgroundColor: '#eee',
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  imageWrap: {
    backgroundColor: '#eee'
  }
})
