/**
 * @jest-environment node
 */
import request from 'supertest';

import app from './app';

describe('Express Server', () => {
  it('/api responds with json response', () => request(app)
    .get('/api')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '21')
    .expect(200)
    .then((res) => {
      expect(res.body).toEqual({
        data: 'Some data!',
      });
    }));

  it('serves static assets from the public folder', () => request(app)
    .get('/favicon.ico')
    .expect('Content-Type', 'image/x-icon')
    .expect('Content-Length', '1150')
    .expect(200));

  it('handles /', () => request(app)
    .get('/')
    .expect(200));

  it('handles /about', () => request(app)
    .get('/about')
    .expect(200));

  it('handles /styleguide', () => request(app)
    .get('/styleguide')
    .expect(200));

  it('404s everything else', () => request(app)
    .get('/everythingelseis404ed')
    .expect(404));
});
