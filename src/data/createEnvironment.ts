import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache,
} from 'relay-runtime'

interface ICacheConfig {
  force: boolean
}

interface IOptions {
  headers?: any
}

export function createEnvironment({ headers }: IOptions): Environment {
  const prod = process.env.NODE_ENV === 'production'
  const API_HOST = prod
    ? 'https://data.thecommunity.ng'
    : 'https://data.thecommunity.ng'

  const ttl = 3 * 60 * 1000
  const cache = new QueryResponseCache({ size: 1024, ttl })

  const source = new RecordSource()
  const store = new Store(source)

  async function fetchQuery(
    operation,
    variables: any,
    cacheConfig?: ICacheConfig,
    uploadables,
  ) {
    const queryID = operation.text
    const isMutation = operation.operationKind === 'mutation'
    const isQuery = operation.operationKind === 'query'
    const forceFetch = cacheConfig && cacheConfig.force

    const fromCache = cache.get(queryID, variables)
    if (isQuery && fromCache !== null && !forceFetch) {
      return fromCache
    }

    const response = await fetch(`${API_HOST}/v2`, {
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

    const finalResult = await response.json()

    if (!prod) console.debug(finalResult)

    if (isQuery && finalResult) {
      cache.set(queryID, variables, finalResult)
    }

    if (isMutation) cache.clear()

    return finalResult
  }

  const network = Network.create(fetchQuery)

  const environment = new Environment({ network, store })

  return environment
}
