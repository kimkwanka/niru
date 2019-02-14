/**
 * @jest-environment node
 */
/* eslint-disable global-require */
import request from 'supertest';

// Test process.env code adapted from:
// https://stackoverflow.com/questions/48033841/test-process-env-with-jest#48042799

let app = null;

describe('Express Server', () => {
  describe('process.env.NODE_ENV = test', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules(); // this is important
      process.env = { ...OLD_ENV };
      delete process.env.NODE_ENV;
      process.env.NODE_ENV = 'test';
      app = require('./app').default;
    });

    afterEach(() => {
      process.env = OLD_ENV;
    });

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

  describe('process.env.NODE_ENV = production', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules(); // this is important
      process.env = { ...OLD_ENV };
      delete process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      app = require('./app').default;
    });

    afterEach(() => {
      process.env = OLD_ENV;
    });

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
});
