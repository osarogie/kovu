import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache,
} from 'relay-runtime'

const prod = process.env.NODE_ENV === 'production'
const API_HOST = prod
  ? 'https://data.thecommunity.ng'
  : 'https://data.thecommunity.ng'

const ttl = 3 * 60 * 1000
const cache = new QueryResponseCache({ size: 1024, ttl })

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

    console.log(`${API_HOST}/v2`)

    console.log({
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })

    return fetch(`${API_HOST}/v2`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    })
      .then(response => {
        // console.log(response.text())
        const r = response.json()
        console.log(r)
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
