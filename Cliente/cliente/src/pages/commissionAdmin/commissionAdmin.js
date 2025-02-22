import React, { useContext, useState } from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import UserContext from '../../utils/userContext'

import MyComissionTypes from '../../componens/myCommissionTypes/myCommissionTypes'
import MyAsignedCommissions from '../../componens/myAsignedCommissions/myAsignedCommissions'
import MyAskedCommissions from '../../componens/myAskedCommissions/myAskedCommissions'

import './commissionAdmin.css';

function CommissionAdmin(){    
    const {token, refreshToken}  = useContext(UserContext);

    return (
        <div>
            <NavBar></NavBar>
            <Tabs>
                <TabList>
                    <Tab>My Commissions</Tab>
                    <Tab>Commissions to Others</Tab>
                    <Tab>Comissions administrator</Tab>
                </TabList>
                <TabPanel>
                    <h2>My commissions</h2>
                    <MyAsignedCommissions></MyAsignedCommissions>
                </TabPanel>
                <TabPanel>
                    <h2>My asked commissions</h2>
                    <MyAskedCommissions></MyAskedCommissions>
                </TabPanel>
                <TabPanel>
                    <h2>Administrar mis comissioness</h2>
                    <MyComissionTypes></MyComissionTypes>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default CommissionAdmin