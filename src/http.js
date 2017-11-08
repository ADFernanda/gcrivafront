import { merge } from 'ramda'
import queryString from 'query-string'

const getQueryString = params => {
    const stringifiedQuery = queryString.stringify(params)

    return stringifiedQuery ? `?${stringifiedQuery}` : ''
}
const formatUrl = url => {
    if (url.startsWith('http')) {
        return url
    }

    return url.startsWith('/') ? url : `/${url}`
}
const formatFullUrl = (url, { prefix, params }) => {
    if (url.startsWith('http')) {
        return `${url}${getQueryString(params)}`
    }

    return `${prefix}${url}${getQueryString(params)}`
}

const initialToken = localStorage.getItem('jwtToken') || ''

export class Http {
    defaults = {
        headers: {
            Authorization: initialToken ? `JWT ${initialToken}` : '',
            Accept: 'application/json, text/plain, /',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }
    configDefaults = {
        prefix: 'http://localhost:4000',
    }

    request(url, options = {}, configOptions = {}) {
        const requestOptions = merge(this.defaults, options)
        const mergedConfigOptions = merge(this.configDefaults, configOptions)
        const formattedUrl = formatUrl(url)

        if (requestOptions.body) {
            requestOptions.body = JSON.stringify(requestOptions.body)
        }
        console.log(formatFullUrl(formattedUrl, mergedConfigOptions));
        return fetch(formatFullUrl(formattedUrl, mergedConfigOptions), requestOptions)
            .then(response => Promise.all([response, response.json()]))
            .then(([response, data]) => {
                response.data = data

                if (!response.ok) {
                    throw response
                }

                return response
            })
    }

    get(url, options, configOptions) {
        return this.request(url, merge({ method: 'GET' }, options), configOptions)
    }

    post(url, options, configOptions) {
        return this.request(url, merge({ method: 'POST' }, options), configOptions)
    }

    put(url, options, configOptions) {
        return this.request(url, merge({ method: 'PUT' }, options), configOptions)
    }

    delete(url, options, configOptions) {
        return this.request(url, merge({ method: 'DELETE' }, options), configOptions)
    }
}

export default new Http()
