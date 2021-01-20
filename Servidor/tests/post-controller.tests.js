const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000';
const autorId = '6003bece4ad4621b6c83ce0e';
const postId = '60073c0a52c31c2c4830f7cd';


describe('send posts to home page: ',()=>{
	it('should return posts', (done) => {		
		chai.request(url)
			.get('/postList/1')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});


describe('send posts to home page: ',()=>{
	it('should return posts', (done) => {		
		chai.request(url)
			.get('/postList/1')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});


describe('send autor posts: ',()=>{
	it('should return posts from autor', (done) => {		
		chai.request(url)
			.get('/autorPosts/6003bece4ad4621b6c83ce0e/1')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('fail ro send autor posts: ',()=>{
	it('should return nothing', (done) => {		
		chai.request(url)
			.get('/autorPosts/6003bece4e/1')
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});


describe('send autor posts by name: ',()=>{
	it('should return posts from autor by name', (done) => {		
		chai.request(url)
			.get('/autorPostsName/muterk/1')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('fail send autor posts by name: ',()=>{
	it('should return nothing', (done) => {		
		chai.request(url)
			.get('/autorPostsName/merk/1')
			.end( function(err,res){
				expect(res).to.have.status(500);
				done();
			});
	});
});

describe('get post: ',()=>{
	it('should return a posts ', (done) => {		
		chai.request(url)
			.get('/getPost/60073c0a52c31c2c4830f7cd')
			.end( function(err,res){
				expect(res).to.have.status(200);
				done();
			});
	});
});
