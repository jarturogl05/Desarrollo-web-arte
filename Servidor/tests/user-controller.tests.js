const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000';
const newUser='ElBArto'
const newEmail='rar55640@cuoly.com'
var token=''
var refreshToken=''

describe('Make a correct Login: ',()=>{
	it('should login into an existing user', (done) => {		
		chai.request(url)
			.post('/login')
			.send({username:'isValid620', password: 'holala'})
			.end( function(err,res){
				token = res.body.token;
				refreshToken = res.body.refreshToken;
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Make an incorrect Login: ',()=>{
	it('should failed login into an existing user', (done) => {		
		chai.request(url)
			.post('/login')
			.send({username:'isValid620', password: 'hoelala'})
			.end( function(err,res){
				expect(res).to.have.status(403);
				done();
			});
	});
});
describe('Try login to a non existant user ',()=>{
	it('should failed login into a non existing user', (done) => {		
		chai.request(url)
			.post('/login')
			.send({username:'xxxTentationxxx', password: 'hoelala'})
			.end( function(err,res){
				expect(res).to.have.status(401);
				done();
			});
	});
});

describe('Failed to create ',()=>{
	it('should failed create due to a bad request', (done) => {		
		chai.request(url)
			.post('/create')
			.send({username: 'isValid1', password:'holala', email:'ehe'})
			.end( function(err,res){
				expect(res).to.have.status(422);
				done();
			});
	});
});
describe('Create successfull',()=>{
	it('should create succesfully', (done) => {		
		chai.request(url)
			.post('/create')
			.send({username: newUser, password:'holala', email: newEmail})
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
describe('Failed create by email',()=>{
	it('should fail create by a duplicate email', (done) => {		
		chai.request(url)
			.post('/create')
			.send({username: newUser, password:'holala', email: newEmail})
			.end( function(err,res){
				expect(res).to.have.status(400);
				done();
			});
	});
});
describe('Failed confirm',()=>{
	it('should fail create by a duplicate email', (done) => {		
		chai.request(url)
			.get('/confirm/badrealToken')
			.end( function(err,res){
				expect(res).to.have.status(400);
				done();
			});
	});
});

describe('Failed confirm',()=>{
	it('should fail the confirmation due to a bad token', (done) => {		
		chai.request(url)
			.get('/confirm/badrealToken')
			.end( function(err,res){
				expect(res).to.have.status(400);
				done();
			});
	});
});

describe('Success confirm',()=>{
	it('should do the confirmation succesfully', (done) => {		
		chai.request(url)
			.get('/confirm/' + 'goodToken')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Token fail validation',()=>{
	it('should fail to validate the token', (done) => {		
		chai.request(url)
			.get('/authenticateToken')
			.end( function(err,res){
				expect(res).to.have.status(404);
				done();
			});
	});
});
describe('Token success validation',()=>{
	it('should successfully validate the token', (done) => {		
		chai.request(url)
			.get('/authenticateToken')
			.set('authentication', `bearer ${token}`)
			.set('refreshToken', `bearer ${refreshToken}`)
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
