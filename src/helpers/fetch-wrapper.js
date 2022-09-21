import { useAuthStore } from '@/stores/auth.store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    console.log('request' )
    return async (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        console.log(requestOptions)
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
            console.log(body)
        }
        console.log(`requestOptions ${JSON.stringify(requestOptions)}`)
        const response = await fetch(url, requestOptions);
        console.log(response)
        return await handleResponse(response);
    }
}

// helper functions

function authHeader(url) {
    console.log('authheader' )
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    console.log(`user ${JSON.stringify(user)}`)
    const isLoggedIn = !!user?.accessToken;
    // const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    const isApiUrl = url;
    console.log(isApiUrl)
    if (isLoggedIn) {
        console.log(`Bearer ${user.accessToken}` )
        return { Authorization: `Bearer ${user.accessToken}` };
        
    } else {
        return {};
    }
}

async function handleResponse(response) {
    console.log('handleresponse' )
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    console.log(`data ${JSON.stringify(data)}`)

    // check for error response
    if (!response.ok) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    return data;
}