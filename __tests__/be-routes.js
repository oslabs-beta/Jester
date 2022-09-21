// backend tests
const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');

describe('Route integration tests', () => {
  // Test for POST request to /api/tests
  describe('/api/tests', () => {
    describe('POST', () => {
      it('missing body contents responds with 400', () =>
        request(server)
          .post('/api/tests')
          .send({
            header: {
              input: '/',
              method: 'GET'
            }
            // missing assertions array
          })
          .expect(400));

      it('no body provided responds with 400', () =>
        request(server).post('/api/tests').expect(400));

      it('correct body contents responds with 200 status and json content type', () =>
        request(server)
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

      // it('correct body contents responds with generated test code', () => {
      //   const responseJSON = JSON.stringify([
      //     "describe('/', () => {",
      //     "describe('GET', () => {",
      //     "it('responds with content-type /text/html/ and status 200', () => request(server)",
      //     ".get('/')",
      //     ".expect('Content-Type', /text/html/)",
      //     '.expect(200);',
      //     '});',
      //     '});',
      //     'fsdfsdf'
      //   ]);
      //   request(server)
      //     .post('/api/tests')
      //     .send({
      //       header: {
      //         endpoint: '/',
      //         method: 'GET'
      //       },
      //       assertions: [{ content: '/text/html/' }, { status: 200 }]
      //     })
      //     .expect('Content-Type', /json/)
      //     .expect(200)
      //     .expect(responseJSON);
      // });
    });
  });
});
