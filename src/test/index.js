import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);


var token;
var p1id;
var p2id;
var p1ELO;
var p2ELO;
describe('Users', () => {

	describe('Create User', () => {
	
		it('should create a new user', (done) => {

			chai.request(app).post('/mock/users').set('Content-Type','application/json)')
				.send({'email':'foo2','password':'pass'}).end((err,res) => {
					if (err) done(err);
					expect(res).to.be.an('object');
					expect(res.body.success).to.deep.equals(true);
					expect(res.body.user).to.be.an('object');
					done();
					p1id = res.body.user.id;
					p1ELO = res.body.user.elo;
			});
		});
		
	});
	describe('Login', () => {
		it('should return a token', (done) => {
			chai.request(app).post('/mock/auth').set('Content-Type','application/json)')
				.send({'email':'foo2','password':'pass'}).end((err,res) => {
					if (err) done(err);
					
	//				console.log(res);
				
					expect(res).to.be.an('object');
					expect(res.body.success).to.deep.equals(true);
					expect(res.body.token).to.be.a('string');
					token = res.body.token;				
					done();
			});
		
		});
	});


	describe('Get Users', () => {
		it('should return all users', (done) => {

	
	chai.request(app).get('/mock/users').set('Authorization','Bearer '+token)
				.send().end((err,res) => {
					if (err) done(err);
			//		console.log(res);
			//		expect(res).to.have.status(200);
					expect(res).to.be.an('object');
					expect(res.body.success).to.deep.equals(true);
					expect(res.body.values).to.be.an('array');
					p2id = res.body.values[0].id;
					p2ELO = res.body.values[0].elo;
					done();
			});
		});
	});

});





describe('Matches', () => {
	var match;
	describe('Create Match', () => {
		it('should create a new match', (done) => {
				
	chai.request(app).post('/mock/matches').set('Authorization','Bearer '+token)
				.set('Content-Type','application/json')
				.send({'p1':p1id, 'p2':p2id}).end((err,res) => {
					if (err) done(err);
					expect(res).to.be.an('object');
					expect(res.body.success).to.deep.equals(true);
					expect(res.body.match).to.be.an('object');
					
					match = res.body.match
					done();
			});
		});
	});



	describe('Result Match', () => {
		it('should finish the match and set the winner', (done) => {
		
			chai.request(app).patch('/mock/matches/'+match.mid)
				.set('Authorization','Bearer '+token)
				.set('Content-Type','application/json')
				.send({'winnerId':match.p1}).end((err,res) => {
					if (err) done(err);
					
					expect(res).to.be.an('object');
					expect(res.body.success).to.deep.equals(true);
					console.log(res.body.elos[0].winnerELO+" "+res.body.elos[1].loserELO);
					expect(res.body.elos[0].winnerELO).to.not.equals(p1ELO);
					expect(res.body.elos[1].loserELO).to.not.equals(p2ELO);
					done();
			});
		});
	});


	describe("Get Matches", () => {
		it('should return all matches', (done) => {
			chai.request(app).get('/mock/matches')
				.set('Authorization','Bearer '+token)
				.end((err,res) => {
				
					if (err) done(err);

					//TODO: rework match structure to follow that of user
					expect(res).to.be.an('object');
					//expect(res.body.success).to.deep.equals(true);
					expect(res.body.matches).to.be.an('array');
					console.log(res.body.matches);
					done();
				});

		}); 
	});


});
