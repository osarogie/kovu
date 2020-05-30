import React, { useMemo, useState, useCallback } from 'react'
import { QueryRenderer } from 'react-relay'
import LoaderBox from '../components/LoaderBox'
import { useEnvironment } from '../providers/SessionProvider'

function QueryRendererProxy({ render, ...props }) {
  const [resetValue, setResetValue] = useState()
  const environment = useEnvironment()

  const reloadRenderer = useCallback(() => {
    setResetValue(Math.random() * 100)
  }, [])

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

export default QueryRendererProxy
