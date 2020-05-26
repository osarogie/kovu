import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  inner: {
    maxWidth: 400,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollViewContainerStyle: {
    alignItems: 'center',
  },
  logoImage: {
    width: 80,
    height: 80,
    marginTop: 50,
    marginBottom: 20,
  },
  bottomControl: {
    alignItems: 'center',
    // marginTop: 25
  },
  altText: {
    color: '#fff',
    // fontSize: 20
    marginTop: 20,
  },
  input: {
    // width: 200,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 40,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 40,
    width: 150,
    height: 40,
    backgroundColor: '#05f',
  },
  writeButton: {
    borderRadius: 40,
    backgroundColor: '#05f',
  },
  icon: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  tabIcon: {
    marginTop: 5,
    marginBottom: 5,
  },
  toolbarAction: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginFieldIcon: {
    // marginTop: 15,
    marginRight: 10,
  },
  chatList: {
    backgroundColor: '#262627',
    flex: 1,
  },
  toolbar: {
    // borderBottomWidth: 1,
    // borderTopRightRadius: 4,
    // borderTopLeftRadius: 4,
    // borderBottomColor: '#ccc',
    elevation: 2,
    height: 53,
  },
  elevation: {
    height: 1,
    elevation: 10,
    backgroundColor: '#ddd',
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  discussionContainer: {
    margin: 17,
  },
  body: {
    color: '#000',
    lineHeight: 25,
    textAlign: 'justify',
  },
  featurePhotoWarp: {
    height: 100,
    backgroundColor: '#eee',
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageWrap: {
    backgroundColor: '#eee',
  },
  optionRow: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  optionTextView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  fillRow: { flexDirection: 'row', flex: 1 },
  row: { flexDirection: 'row' },
  fill: { flex: 1 },
  postsHeader: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 8,
    borderBottomColor: '#ddd',
    // borderBottomWidth: 1,
    // backgroundColor: '#eee'
  },
})
