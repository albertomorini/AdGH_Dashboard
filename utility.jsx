

export const doRequest = (baseURL, port, path, method, headers, body) => {
  

    console.log(headers);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic YWxieTpBdGxhbnRlMTk5OSE=");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    
    if (method == "GET") {
        return fetch("http://" + baseURL + ":" + port + "/" + path, {
            method: "GET",
            mode:'cors',
            headers: myHeaders
            // headers: new Headers(Object.assign(headers, { "Access-Control-Allow-Origin": "*" }))
        })

    } else if (method == "POST") {

        return fetch("http://" + baseURL + ":" + port + "/" + path, {
            method: "POST",
            mode: 'cors',
            headers: headers, //TODO: add cross requests
            body: JSON.stringify(body)
        })
    }
}