const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000';
const autorId = '6003bece4ad4621b6c83ce0e'
var token=''

describe('Make a correct Login: ',()=>{
	it('should login into an existing user', (done) => {		
		chai.request(url)
			.post('/login')
			.send({username:'isValid620', password: 'holala'})
			.end( function(err,res){
				token = res.body.token;
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Create a commission type: ',()=>{
	it('should create a commission type', (done) => {		
		chai.request(url)
            .post('/createCommissionType')
            .set('authorization', `bearer ${token}`)
			.send({title:'isValid620', description: 'holala', price:5})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Fail to create a commission type: ',()=>{
	it('should fail to create a commission type due to bad request', (done) => {		
		chai.request(url)
            .post('/createCommissionType')
            .set('authorization', `bearer ${token}`)
			.send({description: 'holala', price:5})
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});

describe('Update a commission type: ',()=>{
	it('should update a commission type', (done) => {		
		chai.request(url)
            .post('/editCommissionType')
            .set('authorization', `bearer ${token}`)
			.send({commissionTypeId: '6005d8deaa5d9c141b266dfb', title:'isValid620', description: 'holala', price:5})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Fail to update a commission type: ',()=>{
	it('should fail to update a commission type due to bad request', (done) => {		
		chai.request(url)
            .post('/editCommissionType')
            .set('authorization', `bearer ${token}`)
			.send({description: 'holala', price:5})
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});

describe('Delete a commission type: ',()=>{
	it('should delete a commission type successfully', (done) => {		
		chai.request(url)
            .post('/deleteCommissionType')
            .set('authorization', `bearer ${token}`)
			.send({commissionTypeId: '60075df819f2b562dc53c5f8'})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Fail delete a commission type: ',()=>{
	it('should fail to delete a commission type', (done) => {		
		chai.request(url)
            .post('/deleteCommissionType')
            .set('authorization', `bearer ${token}`)
			.send({commissionTypeId: 'nonexistingid'})
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});

describe('Ask for a commission: ',()=>{
	it('should create a commission successfully', (done) => {		
		chai.request(url)
            .post('/askCommission')
            .set('authorization', `bearer ${token}`)
			.send({contractedUsername: 'isValid620', commissionTypeId:'6005d8deaa5d9c141b266dfb', comments:'No comento'})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Fail to ask for a commission: ',()=>{
	it('should faile to create a commission due to a bad request', (done) => {		
		chai.request(url)
            .post('/askCommission')
            .set('authorization', `bearer ${token}`)
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});

describe('Response for a commission: ',()=>{
	it('should update a commission successfully', (done) => {		
		chai.request(url)
            .post('/responseCommission')
            .set('authorization', `bearer ${token}`)
			.send({response: 'Accepted', commissionId: '6006525f6ad7eb3e4e947e3a'})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Fail response for a commission: ',()=>{
	it('should fail to update a commission successfully', (done) => {		
		chai.request(url)
            .post('/responseCommission')
            .set('authorization', `bearer ${token}`)
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});