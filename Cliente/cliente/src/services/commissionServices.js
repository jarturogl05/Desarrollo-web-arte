async function getCommissionTypes(token){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
        })
    }

    try {
        const response = await fetch('http://localhost:4000/getAllMyCommissionTypes', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function addCommissionType(token, title, price, description){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "title": title,
            "price": price,
            "description": description
        })
    }
    try {
        const response = await fetch('http://localhost:4000/createCommissionType', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function deleteCommissionType(token, id){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "commissionTypeId": id
        })
    }
    try {
        const response = await fetch('http://localhost:4000/deleteCommissionType', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export { getCommissionTypes, addCommissionType, deleteCommissionType }