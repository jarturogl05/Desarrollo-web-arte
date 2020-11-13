var express = require('express');

var app = express();


const getToken = async(req, res) =>{
    res.json({message: 'tokenAuthentication', token: 'bearer xd' })
};

const authenticateToken = async(req, res) =>{
    res.json({message: 'tokenAuthentication', token: 'invalid' })
};


module.exports = {getToken, authenticateToken};