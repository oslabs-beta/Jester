import request from 'supertest';
const server = 'http://localhost:3000';
import db from '../../server/models/userModel';

describe('Route integration tests', () => {
  let projectId;
  afterAll(() => {
    db.query('DELETE FROM user_table WHERE usermail=\'test@email.com\'');
  });
  describe('/github/callback', () => {
    describe('GET', () => {
      it('adds a user to the database', async () => {
        const response = await request(server)
          .get('/github/callback')
          .send({ user: { emails: [{ value: 'test@email.com' }] } });
        expect(response.body).toEqual({});
      });
    });
  });
  describe('/api/project', () => {
    describe('POST', () => {
      it('adds a project to a user in the database and returns all projects', async () => {
        const response = await request(server)
          .post('/api/project')
          .send({ project_name: 'Test Project', user: { emails: [{ value: 'test@email.com' }] } });
        projectId = response.body[0]['project_id'];
        expect(response.body[0]['project_name']).toBe('Test Project');
      });
    });
    describe('GET', () => {
      it('gets all projects tied to user', async () => {
        const response = await request(server)
          .get('/api/project')
          .send({ user: { emails: [{ value: 'test@email.com' }] } });
        expect(response.body[0]['project_name']).toBe('Test Project');
      });
    });
    describe('DELETE', () => {
      it('deletes project', async () => {
        const response = await request(server)
          .delete(`/api/project/${projectId}`)
          .send({ user: { emails: [{ value: 'test@email.com' }] } });
        expect(response.body).toEqual([]);
      });
    });
  });

});
