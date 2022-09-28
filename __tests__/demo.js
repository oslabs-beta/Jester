const request = require('supertest');
const server = 'http://localhost:3000';

describe('Jester generated code tests', () => {
  // GENERATED TEST CODE GOES HERE
  describe('/api/tests', () => {
    describe('GET', () => {
      it('responds with content-type text/html and status 200', async () => {
        const response = await request(server).get('/api/tests');

        expect(response.type).toBe('text/html');
        expect(response.statusCode).toBe(200);
      });
    });
  });
  // GENERATED TEST CODE ENDS HERE
});
