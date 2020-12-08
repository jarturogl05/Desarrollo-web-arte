async function doLogin(username, password){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),

        body: JSON.stringify({
            'username': username,
            'password': password
        })
    }

    try {
        const response = await fetch('http://localhost:4000/login', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}


async function doRegister(username, email, password){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),

        body: JSON.stringify({
            'username': username,
            'email': email,
            'password': password
        })
    }

    try {
        const response = await fetch('http://localhost:4000/create', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export {doLogin, doRegister}