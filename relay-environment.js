const { Environment, Network, RecordSource, Store } = require('relay-runtime')

const source = new RecordSource()
const store = new Store(source)

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch('https://thecommunity.ng/_/api', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    // console.log(response.text())
    const r = response.json()
    return r
  })
}

const network = Network.create(fetchQuery)

const environment = new Environment({
  network,
  store
})

export default environment
