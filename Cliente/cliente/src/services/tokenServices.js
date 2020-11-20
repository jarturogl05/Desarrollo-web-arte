async function checkToken (token, refreshToken){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'refreshtoken': 'Bearer ' + refreshToken
        })
    }
    try {
        const response = await fetch('http://localhost:4000/authenticateToken', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
 
}



export default checkToken;