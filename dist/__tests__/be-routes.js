"use strict";
const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');
describe('Route integration tests', () => {
    describe('/api/tests', () => {
        describe('POST', () => {
            it('missing body contents responds with 400', () => request(server)
                .post('/api/tests')
                .send({
                header: {
                    input: '/',
                    method: 'GET'
                }
            })
                .expect(400));
            it('no body provided responds with 400', () => request(server).post('/api/tests').expect(400));
            it('correct body contents responds with 200 status and json content type', () => request(server)
                .post('/api/tests')
                .send({
                header: {
                    endpoint: '/',
                    method: 'GET'
                },
                assertions: []
            })
                .expect(200)
                .expect('Content-Type', /json/));
        });
    });
});
