import React, { useContext, useState } from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import {  useParams } from "react-router-dom";
import NavBar from '../../componens/navbar/navbar'
import UserContext from '../../utils/userContext'

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
                    <h2>Mis comissiones</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Otras comisiones</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Administrar mis comissioness</h2>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default CommissionAdmin