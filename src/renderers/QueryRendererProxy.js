// @flow

import React from 'react'
import createEnvironment from '../../relay-environment'
import { QueryRenderer } from 'react-relay'
import { connect } from 'react-redux'
import LoaderBox from '../components/LoaderBox'

const mapStateToProps = state => ({ api_key: state.user.api_key })

class QueryRendererProxy extends React.PureComponent {
  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)

    this.state = { resetValue: 1, environment: this.updateEnvironment(props) }
  }

  componentWillReceiveProps(props) {
    this.setState({ environment: this.updateEnvironment(props) })
  }

  updateEnvironment(props) {
    const { api_key } = props

    var config = {}
    if (api_key) {
      config = { headers: { Authorization: `Token token=${api_key}` } }
    }
    return createEnvironment(config)
  }

  renderPage({ error, props, retry }) {
    if (props)
      return this.props.render({
        error,
        props,
        retry,
        environment: this.state.environment
      })

    const reloadRenderer = _ => {
      // this.setState({ resetValue: Math.random() })
      // retry()
      this.setState({ environment: this.updateEnvironment(this.props) })
    }

    return (
      <LoaderBox
        isLoading={!error}
        error={error && error.message}
        onPress={reloadRenderer}
      />
    )
  }

  render() {
    return (
      <QueryRenderer
        environment={this.state.environment}
        resetValue={this.state.resetValue}
        {...this.props}
        render={this.renderPage}
      />
    )
  }
}

export default connect(mapStateToProps)(QueryRendererProxy)
