import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'ra-core';

const apiUrl = 'https://4a4d-83-151-205-229.ngrok-free.app/api';
const httpClient = (url, options = {}) => {
    options.headers = new Headers({
        ...options.headers,
        'ngrok-skip-browser-warning': 'true',
    });
    console.log(`httpClient called with url: ${url}, options:`, options);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(apiUrl, httpClient);

//ngrok-skip-browser-warning

const customDataProvider = {
    ...dataProvider,
    getList: (resource, params) => {
        console.log(`getList called with resource: ${resource}, params:`, params);
        return dataProvider.getList(`${resource}/`, params);
    },
    getOne: (resource, params) => {
        console.log(`getOne called with resource: ${resource}, params:`, params);
        return dataProvider.getOne(`${resource}`, params);
    },
    getMany: (resource, params) => {
        console.log(`getMany called with resource: ${resource}, params:`, params);
        return dataProvider.getMany(`${resource}/`, params);
    },
    getManyReference: (resource, params) => {
        console.log(`getManyReference called with resource: ${resource}, params:`, params);
        return dataProvider.getManyReference(`${resource}/`, params);
    },

    update: (resource, params) => {
        console.log(`update called with resource: ${resource}, params:`, params);
        const httpClient = fetchUtils.fetchJson;
        return httpClient(`${apiUrl}/${resource}/${encodeURIComponent(params.id)}/`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    updateMany: (resource, params) => {
        console.log(`updateMany called with resource: ${resource}, params:`, params);
        return dataProvider.updateMany(`${resource}/`, params);
    },
    create: (resource, params) => {
        console.log(`create called with resource: ${resource}, params:`, params);
        return dataProvider.create(`${resource}/`, params);
    },
    delete: (resource, params) => {
        console.log(`delete called with resource: ${resource}, params:`, params);
        return dataProvider.delete(`${resource}/`, params);
    },
    deleteMany: (resource, params) => {
        console.log(`deleteMany called with resource: ${resource}, params:`, params);
        return dataProvider.deleteMany(`${resource}/`, params);
    },
};

export default customDataProvider;