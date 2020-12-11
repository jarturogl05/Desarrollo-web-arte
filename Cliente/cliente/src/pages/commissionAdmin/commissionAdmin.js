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
    if(dataIsReturned || !commissionList.length){
        console.log(commissionList)
        return (
            <div>
                <NavBar></NavBar>
                <Commission commissionInfo = {commissionList[1]}></Commission>
            </div>
        )
    }else{
        return(
            <h1>Loading</h1>
        )
    }
}

export default CommissionAdmin