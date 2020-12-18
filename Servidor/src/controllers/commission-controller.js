const Commissions = require('./../mongo/models/commission')
const Users = require('./../mongo/models/user')

const tokenService = require('./token-service');
const createCommission = async(req, res) => {
    try {        
        const { contracted, commissiontype } = req.body
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        contractorUsername = await tokenService.decodeToken(token)

        contractorUser = await Users.findOne(contractorUsername)
        contractedUser = await Users.findOne(contracted)

        await Commissions.create({
            contractorUser,
            contractedUser,
            commissiontype
        })
        
        send.status(200).send({message: 'Registered Commission!'})
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
const askCommission = async(req, res) => {
    try {        
        const { contracted, commissiontype } = req.body
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        contractorUsername = await tokenService.decodeToken(token)

        contractorUser = await Users.findOne(contractorUsername)
        contractedUser = await Users.findOne(contracted)

        await Commissions.create({
            contractorUser,
            contractedUser,
            commissiontype
        })
        
        send.status(200).send({message: 'Registered Commission!'})
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
} 

const ResponseCommission = async(req, res) => {
    try {        
        const { response, commissionid } = req.body
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        contractedUsername = await tokenService.decodeToken(token)

        contractedUser = await Users.findOne(contractedUsername)
        commission = await Commissions.findById(commissionid)

        if (contractedUser == commission.contractedUser){
            commission.accepted = response
            commission.save()
            if (response){
                send.status(200).message('Accepted Commission!')
            }else{
                send.status(200).message('Rejected Commission :(')
            }
        }else{
            send.status(403).message('You cannot modify other users commissions')
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
} 

const PayCommission = async(req, res) => {      

}


const getMyAvailableCommission = async(req, res) => {
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)

        commissions = await Commissions.find({contractedUser: username, accepted: false})
        
        if (commissions.length){
            console.log(commissions.length)
            res.status(200).send({message: 'Sucessfully retracted', data: commissions})
        }else{
            res.status(404).send({message: 'Commissions not found, try adding one'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}

const getAllMyCommission = async(req, res) => {
    try {        
        const tokenCode = req.headers.authorization;
        const token = tokenCode.split(' ')[1];
        username = await tokenService.decodeToken(token)

        commissions = await Commissions.find({contractedUser: username})
        
        if (commissions.any()){
            send.status(200).send({message: 'Sucessfully retracted', data: commissions})
        }else{
            send.status(404).send({message: 'Commissions not found, try adding one'})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:'ERROR', message: 'error'});
    }
}
module.exports = {createCommission, askCommission, ResponseCommission, PayCommission, getMyAvailableCommission}