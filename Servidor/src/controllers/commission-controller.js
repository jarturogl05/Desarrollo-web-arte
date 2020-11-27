const express = require('express')

const Commissions = require('./../mongo/models/commission')
const Users = require('./../mongo/models/user')

const tokenService = require('./token-service');

const createCommission = async(req, res) => {
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        const refreshTokenCode = req.headers.refreshtoken;
        const refreshToken = refreshTokenCode.split(' ')[1];
        contractorUsername = await tokenService.decodeToken(token)

        contractorUser = await Users.findOne(contractorUsername)
        contractedUser = await Users.findOne(req.Contracted)

        
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
} 