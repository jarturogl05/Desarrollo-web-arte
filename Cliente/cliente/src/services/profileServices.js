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
        const response = await fetch('http://localhost:4000/getUserProfileInfoByUsername', settings);
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.log(error);
    }
}
async function getAvailableCommissions(username){

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
        const response = await fetch('http://localhost:4000/getAvailableCommissions', settings);
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.log(error);
    }
}


export { getProfileInfo, getAvailableCommissions }