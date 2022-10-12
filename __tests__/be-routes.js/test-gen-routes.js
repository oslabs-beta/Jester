import request from 'supertest';
import { INDENT } from '../../client/constants/index';
const server = 'http://localhost:3000';

describe('Route integration tests', () => {
  // Test for POST request to /api/tests
  describe('/api/tests', () => {
    describe('POST', () => {
      it('missing assertions property returns 400', async () => {
        const response = await request(server)
          .post('/api/tests')
          .send({
            header: { endpoint: '/', method: 'GET' },
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
            assertions: [{ content: 'application/json' }, { status: 200 }],
          });

        const expectedResponse =
          `describe('/api/tests', () => {\n${INDENT}describe('GET', () => {\n${INDENT}${INDENT}it('responds with content-type application/json and status 200', async () => {\n${INDENT}${INDENT}${INDENT}const response = await request(server)\n${INDENT}${INDENT}${INDENT}${INDENT}.get('/api/tests');\n${INDENT}${INDENT}${INDENT}expect(response.type).toBe('application/json');\n${INDENT}${INDENT}${INDENT}expect(response.statusCode).toBe(200);\n${INDENT}${INDENT}});\n${INDENT}});\n});`;

        expect(response.type).toBe('application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expectedResponse);
      });
    });
  });
});
