var express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const Users = require('../mongo/models/user.js');
const profile = require('../mongo/models/profileInfo');
const tokenService = require('./token-service');


const login = async(req, res) => {
    try {      
            const {username, password} = req.body;
            const user = await Users.findOne({username});
            if(user){
                const isOk = await bcrypt.compare(password, user.password);
                if(isOk){
                    const token = tokenService.createToken(user);
                    const refreshToken = tokenService.createRefreshToken(user);
                    user.refreshToken = refreshToken;
                    user.save()
                    res.status(200).send({
                        status:'ok',
                        message: 'Logeado correctamente',
                        token: token,
                        refreshToken: refreshToken
                    })
                }else{
                    res.status(403).send({status:'INVALID_PASSWORD', message: 'Contraseña incorrecta'});
                }
            }else{
                res.status(401).send({status:'USER_NOT_FOUND', message: 'usuario no encontrado'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({status:'ERROR', message: 'error'});
        }
}


const createUser = async(req, res) =>{
    const session = await mongoose.startSession()
    session.startTransaction()
    try{
        const options = {session, new: true}

        const {username, password, email} = req.body;
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS,
            },
          });
        const hash =  await bcrypt.hash(password, 2);
        let createUser = await Users.create([{
            email,
            password: hash, 
            username: username,
            confirmed: false   
        }], options)

        let createProfile = await profile.create([{
            user: createUser[0]._id
        }], options)
        if (createUser && createProfile){
            try{
                const confirmationToken = tokenService.createConfirmationToken(username, email)
                const url = `http://localhost:4000/confirm/${confirmationToken}`;

                await transporter.sendMail({
                    to: email,
                    subject: 'Confirm Email',
                    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                });
                
                await session.commitTransaction();
                session.endSession();

                res.send({status: 'ok', message: 'usuario creado' });
            }catch(error){
                await session.abortTransaction();
                session.endSession();
                res.send({
                    status: 'error',
                    message: 'No se pudo enviar el correo, reintentar mas tarde'
                })
            }
        }else{

        }
    }catch(ERROR){
        await session.abortTransaction();
        session.endSession();
        console.log(ERROR)
        if(ERROR.code && ERROR.code == 11000){
            res
                .status(400)
                .send({status: 'DUPLICATED_VALUES', message: ERROR.keyValue});
        }else{
            res.status(505).send({status: 'ERROR', message: 'usuario no creado' });
        }
        
    }
};

const confirmUser = async(req, res)=>{
    try{
        const username = await tokenService.decodeConfirmationToken(req.params.token)
        const user = await Users.findOne({username})
        if (user.username != "undefined"){
            user.confirmed = true
            user.save()
            res.status(200).send({message: "Email confirmed, you can now login"})
        }else{
            res.status(404).send({message: "User does not exist"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({message: "Server error"})
    }
}

const authenticateToken = async(req, res) =>{
    if (!req.headers.authorization || !req.headers.refreshtoken){
        res.status(403).send("Access Forbidden");
    }else{
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        const refreshTokenCode = req.headers.refreshtoken;
        const refreshToken = refreshTokenCode.split(' ')[1];
        await tokenService.decodeToken(token)
        .then(response => {
            if (response.message == 'Token expired'){
                tokenService.reissueToken(refreshToken)
                .then(reissueResponse => {
                    res.status(reissueResponse.status).send({message: reissueResponse.message, newToken: reissueResponse.newToken})
                })
                .catch(reissueResponse =>{
                    res.status(reissueResponse.status).send({message: reissueResponse.message, newToken: reissueResponse.newToken})
                })
            }else{
                res.status(200).send({message: 'Access Granted'});
            }
        })
        .catch(response => {
            res.status(response.status || 404).send({message: response.message})
        })
    }
};

module.exports = {login, createUser, confirmUser, authenticateToken};