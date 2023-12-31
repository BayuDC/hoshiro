import { describe, expect, it } from 'bun:test';
import { regions } from '../constants/regions';
import request from 'supertest';
import app from '../app';

describe('GET /api', async () => {
    const res = await request(app).get('/api');
    it('Should return 200 status code', () => {
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
    });
    it('Should return _APPNAME value', () => {
        expect(res.body._APPNAME).toBeString();
    });
});

describe('GET /api/:region', () => {
    it('Should return 200 status code', () => {
        regions.forEach(async (region) => {
            const res = await request(app).get(`/api/${region.code}`);
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe('application/json');
        });
    });
    it('Should return an array', () => {
        regions.forEach(async (region) => {
            const res = await request(app).get(`/api/${region.code}`);
            expect(res.body).toBeArray();
        });
    });
});

describe('GET /api/protected', async () => {
    const res = await request(app).get('/api/protected');
    it('Should return 401 status code', () => {
        expect(res.statusCode).toBe(401);
        expect(res.unauthorized).toBeTrue();
        expect(res.type).toBe('application/json');
    });
});

describe('POST /api/register', async () => {
    const res = await request(app).post('/api/register');
    it('Should return 401 status code', () => {
        expect(res.statusCode).toBe(401);
        expect(res.unauthorized).toBeTrue();
    });
});

describe('POST /api/login', async () => {
    const res = await request(app).post('/api/login');
    it('Should return 401 status code', () => {
        expect(res.statusCode).toBe(401);
        expect(res.unauthorized).toBeTrue();
    });
});
