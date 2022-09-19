// backend tests
const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');

describe('Route integration', () => {
  // Test for POST request to /api/tests for status code 200 and response type json
  describe('/api/tests', () => {
    describe('POST', () => {
      it('responds with 200 status and json content type', () =>
        request(server)
          .post('/api/tests')
          .expect('Content-Type', /json/)
          .expect(200));
    });
  });
});
