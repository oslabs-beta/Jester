import request from 'supertest';
const server = 'http://localhost:3000';
import db from '../../server/models/userModel';

describe('Clipboard Route Integration Tests', () => {
  afterAll(() => {
    db.query('DELETE FROM user_table WHERE usermail=\'test@email.com\'');
  });
  describe('Test User Creation Route', () => {
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
  });

  describe('Test Clipboard Routes', () => {
    let projectId, snippetId;
    describe('/api/clipboard', () => {
      describe('POST', () => {
        it('should add a code snippet to a project and return all code snippets for that project', async () => {
          const projects = await request(server)
            .post('/api/project')
            .send({ project_name: 'Test Project', user: { emails: [{ value: 'test@email.com' }] } });
          projectId = projects.body[0]['project_id'];
          console.log([projectId]);
          const response = await request(server)
            .post(`/api/clipboard/${projectId}`)
            .send({ user: { emails: [{ value: 'test@email.com' }] }, code_snippets: ['test snippet'] });
          console.log('code snippets: ', response.body);
          snippetId = response.body[0]['snippet_id'];
          console.log(snippetId);
          expect(response.body[0]['code_snippet']).toEqual('test snippet');
        });
      });
      describe('GET', () => {
        it('should return all code snippets for a specified project', async () => {
          const response = await request(server)
            .get(`/api/clipboard/${projectId}`)
            .send({ user: { emails: [{ value: 'test@email.com' }] } });
          expect(response.body[0]['code_snippet']).toEqual('test snippet');
        });
      });
      describe('DELETE', () => {
        it('should delete code snippet from a specified project', async () => {
          const response = await request(server)
            .delete(`/api/clipboard/${snippetId}`)
            .send({ user: { emails: [{ value: 'test@email.com' }] }, project_id: projectId });
          console.log('delete response: ', response.body);
          expect(response.body).toEqual([]);
          await request(server)
            .delete(`/api/project/${projectId}`)
            .send({ user: { emails: [{ value: 'test@email.com' }] } });
        });
      });
    });
  });
});
