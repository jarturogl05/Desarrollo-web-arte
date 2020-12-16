import React, { useContext, useState } from 'react'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import Commission from '../../componens/commission/commission'
import UserContext from '../../utils/userContext'
import { getAvailableCommissions } from '../../services/profileServices'

function CommissionAdmin(){    
    const {token, refreshToken}  = useContext(UserContext);
    var [dataIsReturned, setDataIsReturned] = React.useState(false)
    var [commissionList, setComissionList] = React.useState()
    async function getCommissionList(){
        try {
            setComissionList(await getAvailableCommissions(token, refreshToken))
            setDataIsReturned(true)
        }catch(err){
            console.log('Error')
        }
    }
    React.useEffect(() => {
        getCommissionList()
    })
    if(dataIsReturned && commissionList && commissionList != Error){
        console.log(commissionList)
        const commissionComponentList = commissionList.map(tempCommission => <Commission commissionInfo = {tempCommission}></Commission>)
        return (
            <div>
                <NavBar></NavBar>
                <div>
                    {commissionComponentList}
                </div>
            </div>
        )
    }else{
        return(
            <h1>Loading</h1>
        )
    }
}

export default CommissionAdmin