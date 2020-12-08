async function getProfileInfo(username){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),

        body: JSON.stringify({
            'username': username
        })
    }

    try {
        const response = await fetch('http://localhost:4000/getProfileInfo', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}


export { getProfileInfo }