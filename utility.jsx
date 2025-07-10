

export const doRequest = ( body) => {



    return fetch("http://127.0.0.1:55441/rrequest", {
        method: "POST",
        mode: "cors",
        body:JSON.stringify(body)
    })

    // console.log(headers);

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("authorization", "Basic YWxieTpBdGxhbnRlMTk5OSE=");
    // myHeaders.append("Access-Control-Allow-Origin", "*");


    // fetch('http://10.0.0.1:3000/control/querylog', {
    //     method: 'GET', headers: { authorization: 'Basic YWxieTpBdGxhbnRlMTk5OSE=' }
    // });


    // if (method == "GET") {
    //     return fetch("http://" + baseURL + ":" + port + "/" + path, {
    //         method: "GET",
    //         mode: "cors",
    //         headers: myHeaders
    //         // headers: new Headers(Object.assign(headers, { "Access-Control-Allow-Origin": "*" }))
    //     })

    // } else if (method == "POST") {

    //     return fetch("http://" + baseURL + ":" + port + "/" + path, {
    //         method: "POST",
    //         mode: 'cors',
    //         headers: headers, //TODO: add cross requests
    //         body: JSON.stringify(body)
    //     })
    // }
}