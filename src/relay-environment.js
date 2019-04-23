import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache'

const ttl = 3 * 60 * 1000
const cache = new RelayQueryResponseCache({ size: 1024, ttl })

const source = new RecordSource()
const store = new Store(source)

export default ({ headers }) => {
  const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
    const queryID = operation.text
    const isMutation = operation.operationKind === 'mutation'
    const isQuery = operation.operationKind === 'query'
    const forceFetch = cacheConfig && cacheConfig.force

    // Try to get data from cache on queries
    const fromCache = cache.get(queryID, variables)
    if (isQuery && fromCache !== null && !forceFetch) {
      return fromCache
    }

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
    })
      .then(response => {
        // console.log(response.text())
        const r = response.json()
        process.env.NODE_ENV === 'development' ? console.log(r) : null
        return r
      })
      .then(json => {
        if (isQuery && json) {
          cache.set(queryID, variables, json)
        }
        // Clear cache on mutations
        if (isMutation) {
          cache.clear()
        }

        return json
      })
  }

  const network = Network.create(fetchQuery)

  const environment = new Environment({ network, store })

  return environment
}
