const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');
const path = require('path');

describe('Clipboard editor route integration tests', () => {
  describe('/api/clipboard', () => {
    // BH: skipped this test for now as it needs user_id from req.user
    xdescribe('GET', () => {
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
