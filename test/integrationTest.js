require('should');
const request = require('supertest');
const controller = require("../controllers/controller");
const app = require('../app.js');

describe('integration test - promise', function () {

    it("get('/') test", function () {
        return request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    it("get('/chat/beskeder') test", async () => {
        let response = await request(app)
            .get('/beskeder')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.length.should.be.greaterThanOrEqual(2);
        response.body[0].navn.should.be.equal('Ida');
        response.body[1].navn.should.be.equal('Ida');
    });

    it("get('/chat/rum') test", async () => {
        let response = await request(app)
            .get('/rum')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.length.should.be.greaterThanOrEqual(1);
        response.body[0].rum.should.be.equal('xxx');
    });

    it("post('/chat/besked') test", async () => {
        let response = await request(app)
            .post('/besked')
            .send({
                'navn': 'john',
                'rum': 'test1',
                'tekst':'test',
                'nr': 3
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);
        response.body.message.should.be.equal('Besked gemt!');
        response = await controller.getBeskeder();
        response.length.should.be.greaterThanOrEqual(3);
        response[2].navn.should.be.equal('john');
    });
});