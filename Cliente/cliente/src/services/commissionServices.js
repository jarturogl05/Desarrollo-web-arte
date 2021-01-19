async function getMyCommissionTypes(token){

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
async function getCommissionTypes(contractedUser, page){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch('http://localhost:4000/getCommissionTypes/' + contractedUser + '/' + page, settings);
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
        console.log(token, title, price, description)
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
async function editCommissionType(token, id, title, price, description){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "commissionTypeId": id,
            "title": title,
            "price": price,
            "description": description
        })
    }
    try {
        const response = await fetch('http://localhost:4000/editCommissionType', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function askCommission(token, contractedUser, commissionId, comments){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),

        body: JSON.stringify({
            "contractedUsername": contractedUser,
            "commissionTypeId": commissionId,
            "comments": comments
        })
    }
    try {
        const response = await fetch('http://localhost:4000/askCommission', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function getMyAskedCommissions(token){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),
    }

    try {
        const response = await fetch('http://localhost:4000/getMyAskedCommissions', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
async function getMyAsignedCommissions(token){

    const settings = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    }

    try {
        const response = await fetch('http://localhost:4000/getMyAsignedCommissions', settings);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

export { getMyCommissionTypes, getCommissionTypes, getMyAskedCommissions, getMyAsignedCommissions, addCommissionType, deleteCommissionType, editCommissionType, askCommission }