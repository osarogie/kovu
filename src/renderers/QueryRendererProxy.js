// @flow

import React from 'react'
// import { Dimensions } from 'react-native'
import createEnvironment from '../../relay-environment'
import { QueryRenderer } from 'react-relay'
import { connect } from 'react-redux'
import LoaderBox from '../components/LoaderBox'

const mapStateToProps = state => ({
  api_key: state.user.api_key
})

export default (QueryRendererProxy = connect(
  mapStateToProps
)(({ api_key, render, ...props }) => {
  // console.log(api_key)
  var config = {}
  if (api_key) {
    config = {
      headers: {
        Authorization: `Token token=${api_key}`
      }
    }
  }
  const environment = createEnvironment(config)

  return (
    <QueryRenderer
      environment={environment}
      {...props}
      render={({ error, props, retry }) => {
        if (props) {
          return render({ error, props, retry })
        } else {
          // console.log(error)
          return (
            <LoaderBox
              isLoading={!error}
              error={error && error.message}
              onLoadInit={retry}
            />
          )
        }
      }}
    />
  )
}))
