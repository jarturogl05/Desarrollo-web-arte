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

describe('Get a profile successfully: ',()=>{
	it('should get a profile', (done) => {		
		chai.request(url)
			.post('/getUserProfileInfoByUsername')
			.set('authorization', `bearer ${token}`)
			.send({username: 'isValid620'})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Fail to get a profile: ',()=>{
	it('should not get a profile due to a non existant user', (done) => {		
		chai.request(url)
			.post('/getUserProfileInfoByUsername')
			.set('authorization', `bearer ${token}`)
			.send({username:'nonexistingUser'})
			.end( function(err,res){
				expect(res).to.have.status(404);
				done();
			});
	});
});
describe('Fail to get a profile: ',()=>{
	it('should not get a profile due to bad request', (done) => {		
		chai.request(url)
			.post('/getUserProfileInfoByUsername')
			.set('authorization', `bearer ${token}`)
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});
describe('Get a profile by his id successfully: ',()=>{
	it('should get a profile', (done) => {		
		chai.request(url)
			.post('/getUserProfileInfoById/' + autorId)
			.set('authorization', `bearer ${token}`)
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Fail to get a profile by his id: ',()=>{
	it('should not get a profile due to a non existant user', (done) => {		
		chai.request(url)
			.post('/getUserProfileInfoById/' + 'nonexistingid')
			.set('authorization', `bearer ${token}`)
			.end( function(err,res){
				expect(res).to.have.status(404);
				done();
			});
	});
});
describe('Fail to get a profile by his id: ',()=>{
	it('should not get a profile due to bad request', (done) => {		
		chai.request(url)
        .post('/getUserProfileInfoById/')
		.set('authorization', `bearer ${token}`)
			.end( function(err,res){
				expect(res).to.have.status(404);
				done();
			});
	});
});
describe('Update a profile successfully: ',()=>{
	it('should get a profile', (done) => {		
		chai.request(url)
            .post('/updateProfile')
            .set('authorization', `bearer ${token}`)
            .send({username:'isValid620', description:'A normal description'})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Fail update on a profile: ',()=>{
	it('should fail to update a profile due to existing username', (done) => {		
		chai.request(url)
            .post('/updateProfile')
            .set('authorization', `bearer ${token}`)
            .send({username:'isValid62', description:'A normal description'})
			.end( function(err,res){
				expect(res).to.have.status(400);
				done();
			});
	});
});
describe('Fail update on a profile: ',()=>{
	it('should fail to update a profile due to a bad request', (done) => {		
		chai.request(url)
            .post('/updateProfile')
            .set('authorization', `bearer ${token}`)
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});
