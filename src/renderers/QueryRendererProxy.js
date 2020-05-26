// @flow

import React, { useMemo, useState, useCallback } from 'react'
import createEnvironment from '../relay-environment'
import { QueryRenderer } from 'react-relay'
import { connect } from 'react-redux'
import LoaderBox from '../components/LoaderBox'

const mapStateToProps = state => ({ api_key: state.user.api_key })

function QueryRendererProxy({ api_key, render, ...props }) {
  const [resetValue, setResetValue] = useState()
  const environment = useMemo(() => {
    var config = {}
    if (api_key) {
      config = { headers: { Authorization: `Token token=${api_key}` } }
    }
    return createEnvironment(config)
  }, [api_key])

  const reloadRenderer = useCallback(() => {
    setResetValue(Math.random() * 100)
  })

  const renderPage = useCallback(
    ({ error, props, retry }) => {
      if (props) {
        return render({
          error,
          props,
          retry,
          environment,
        })
      }

      return (
        <LoaderBox
          isLoading={!error}
          error={error?.message}
          onPress={reloadRenderer}
        />
      )
    },
    [render, environment, reloadRenderer],
  )

  return (
    <QueryRenderer
      key={resetValue}
      environment={environment}
      {...props}
      render={renderPage}
    />
  )
}

export default connect(mapStateToProps)(QueryRendererProxy)
