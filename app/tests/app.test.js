const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('🚀 CI/CD OK'));

describe('GET /', () => {
  it('should return CI/CD OK message', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('🚀 CI/CD OK');
    expect(res.statusCode).toBe(200);
  });
});
