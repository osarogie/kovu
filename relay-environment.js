const { Environment, Network, RecordSource, Store } = require('relay-runtime')

const source = new RecordSource()
const store = new Store(source)

export default (createEnvironment = ({ headers }) => {
  const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
    // return fetch('http://localhost:3000/v2', {
    return fetch('https://data.thecommunity.ng/v2', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => {
      // console.log(response.text())
      const r = response.json()
      return r
    })
  }

  const network = Network.create(fetchQuery)

  const environment = new Environment({ network, store })

  return environment
})
