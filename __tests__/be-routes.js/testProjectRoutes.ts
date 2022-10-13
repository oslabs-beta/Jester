import request from 'supertest';
const server = 'http://localhost:3000';

describe('Route integration tests', () => {
  // Test for POST request to /api/tests
  describe('/api/project', () => {
    describe('GET', () => {
      it('gets all projects tied to user', async () => {
        const response = await request(server)
          .get('/api/project')
          .send({ user: { emails: [{ value: 'amos.serena17@gmail.com' }] } });
        console.log(response.body);
      });

    });
  });
});
