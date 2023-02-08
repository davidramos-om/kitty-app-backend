import { Logger } from "@nestjs/common";
import axios from 'axios';
import { isJSON } from "class-validator";
import config from '../config';

const httpClient = axios.create({
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    // withCredentials: true,
    timeout: (10 * 1000)
});

axios.interceptors.request.use(config => {

    console.log('%cRequest was sent', "color:green", config);

    return config;
}, error => {
    return Promise.reject(error);
});


type DataSource = 'cmc' | 'coingecko';

export const getFullUrl = (ds: DataSource, endpoint = '') => {

    if (ds === 'cmc') {
        const cf = config();
        const url = cf.crypto.CMC_URL + (endpoint.startsWith('/') ? endpoint.substring(0, 1) : endpoint);
        return url;
    }

    if (ds === 'coingecko')
        return 'https://api.coingecko.com/api/v3/' + (endpoint.startsWith('/') ? endpoint.substring(0, 1) : endpoint);

    return '';
}

export const getDefaultHeader = (ds: DataSource, contentType: string) => {

    const cf = config();
    const header = {
        'Accept': 'application/json',
        'Content-Type': contentType || 'application/json',
        'Accept-Encoding': 'gzip,deflate,compress',
    };

    if (ds === 'cmc')
        header[ 'X-CMC_PRO_API_KEY' ] = cf.crypto.CMC_KEY;


    return header;
}


export const HttpGet = async (ds: DataSource, endpoint: string, params: any = null) => {

    const fullUrl = getFullUrl(ds, endpoint);
    console.log(`🔥.Get : `, fullUrl);
    try {

        if (!endpoint)
            throw new Error('Invalid URI');


        const response = await httpClient.get(fullUrl,
            {
                headers: getDefaultHeader(ds, 'application/json'),
                params: params,
            });

        let result = null;
        switch (ds) {
            case 'cmc':
                result = response?.data || null;
                break;
            case 'coingecko':
                result = response || null;
                break;
            default:
                result = response || null;
                break;
        }

        const json = isJSON(result) ? JSON.parse(result) : result;
        return json;
    }
    catch (error) {
        Logger.error('Error: ' + error);
        throw new Error(error || error?.message || 'Could not complete the request to remote url : ' + fullUrl);
    }
}
