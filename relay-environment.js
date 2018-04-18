const { Environment, Network, RecordSource, Store } = require('relay-runtime')

const source = new RecordSource()
const store = new Store(source)

export default (createEnvironment = ({ headers }) => {
  const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
    // return fetch('http://10.42.0.1:3000/v2', {
    // return fetch("http://localhost:5000/v2", {
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
      process.env.NODE_ENV === 'development' ? console.log(r) : null
      return r
    })
  }

  const network = Network.create(fetchQuery)

  const environment = new Environment({ network, store })

  return environment
})
