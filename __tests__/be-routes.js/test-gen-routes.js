// backend tests
const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');

describe('Route integration tests', () => {
  // Test for POST request to /api/tests
  describe('/api/tests', () => {
    describe('POST', () => {
      it('missing assertions property returns 400', async () => {
        const response = await request(server)
          .post('/api/tests')
          .send({
            header: { endpoint: '/', method: 'GET' }
          });

        expect(response.statusCode).toBe(400);
      });

      it('empty request body returns 400', async () => {
        const response = await request(server).post('/api/tests');

        expect(response.statusCode).toBe(400);
      });

      it('correct body contents responds with 200 status and json content type', async () => {
        const response = await request(server)
          .post('/api/tests')
          .send({
            header: { endpoint: '/api/tests', method: 'GET' },
            assertions: [{ content: 'application/json' }, { status: 200 }]
          });

        const expectedResponse =
          'describe(\'/api/tests\', () => {\n describe(\'GET\', () => {\n  it(\'responds with content-type application/json and status 200\', async () => {\n   const response = await request(server)\n   .get(\'/api/tests\');\n    expect(response.type).toBe(\'application/json\');\n    expect(response.statusCode).toBe(200);\n  });\n });\n});';

        expect(response.type).toBe('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
});
