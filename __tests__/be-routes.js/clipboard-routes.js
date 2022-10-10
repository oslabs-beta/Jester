import { request } from 'supertest';
const server = 'http://localhost:3000';

xdescribe('Clipboard editor route integration tests', () => {
  describe('/api/clipboard', () => {
    describe('GET', () => {
      it('responds with array of JSON objects and status code of 200', async () => {
        const response = await request(server)
          .get('/api/clipboard/1')
          .expect(response.body)
          .toBe([
            {
              project_id: 1,
              project_name: 'project1',
              user_id: 1,
            },
          ])
          .expect('Content-Type', /json/);
      });
    });
  });
});
