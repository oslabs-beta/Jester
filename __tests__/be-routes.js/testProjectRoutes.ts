import request from 'supertest';
const server = 'http://localhost:3000';
import { Pool } from 'pg';

const PG_URI = 'postgres://waajwpef:oV4vRHcXXEGPK8T712j_rOh1BURf_Sw8@jelani.db.elephantsql.com/waajwpef';

const pool = new Pool({
  connectionString: PG_URI,
});

describe('Project and Clipboard Route Integration Tests', () => {
  afterAll(async () => {
    await pool.query('DELETE FROM user_table WHERE usermail=\'test@email.com\'');
    pool.end();
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

  describe('Test Project Routes', () => {
    let projectId;
    describe('/api/project', () => {
      describe('POST', () => {
        it('adds a project to a user in the database and returns all projects tied to user', async () => {
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
        it('deletes project and returns all projects tied to user', async () => {
          const response = await request(server)
            .delete(`/api/project/${projectId}`)
            .send({ user: { emails: [{ value: 'test@email.com' }] } });
          expect(response.body).toEqual([]);
        });
      });
    });

    describe('Test Clipboard Routes', () => {
      let snippetId;
      describe('/api/clipboard', () => {
        describe('POST', () => {
          it('should add a code snippet to a project and return all code snippets for that project', async () => {
            const projects = await request(server)
              .post('/api/project')
              .send({ project_name: 'Test Project', user: { emails: [{ value: 'test@email.com' }] } });
            projectId = projects.body[0]['project_id'];

            const response = await request(server)
              .post(`/api/clipboard/${projectId}`)
              .send({ user: { emails: [{ value: 'test@email.com' }] }, code_snippets: ['test snippet'] });
            snippetId = response.body[0]['snippet_id'];
            expect(response.body[0]['code_snippet']).toEqual('test snippet');
          });
        });
        describe('GET', () => {
          it('should return all code snippets for a specified project', async () => {
            const response = await request(server)
              .get(`/api/clipboard/${projectId}`)
              .send({ user: { emails: [{ value: 'test@email.com' }] } });
            expect(response.body[0]).toEqual('test snippet');
          });
        });
        describe('DELETE', () => {
          it('should delete code snippet from a specified project', async () => {
            const response = await request(server)
              .delete(`/api/clipboard/${snippetId}`)
              .send({ user: { emails: [{ value: 'test@email.com' }] }, project_id: projectId });
            expect(response.body).toEqual([]);
  
            await request(server)
              .delete(`/api/project/${projectId}`)
              .send({ user: { emails: [{ value: 'test@email.com' }] } });
          });
        });
      });
    });
  });

  
});
