const fetch = require("node-fetch");

const body_request = async (url,body,method) => {
    method = method || "POST";

    let fetch_spec = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (body) fetch_spec.body = JSON.stringify(body);

    let response = await fetch(url, fetch_spec);

    try {
        const output = await response.json();
        return [null,output];
    } catch(ex) {
        const output = null;
        return [ex,output];
    }
}

const url_request = async (url,params) => {
    if (params) {
        url += "?" + new URLSearchParams(params).toString();
    }

    let response = await fetch(url);

    try {
        const output = await response.json();
        return [null,output];
    } catch(ex) {
        const output = null;
        return [ex,output];
    }
}


module.exports = { 
    url_request,
    body_request,
}
