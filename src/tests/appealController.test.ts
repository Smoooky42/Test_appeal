import request from 'supertest';
import app from '../app'; // Assuming you have an Express app instance
import appealService from '../services/appealService';
import { Appeal, AppealStatusEnum } from '@/generated/client';

jest.mock('../services/appealService');

describe('Appeal Controller', () => {
	describe('POST /api/appeal', () => {
		it('should create a new appeal and return 201', async () => {
			const mockAppeal = {
				id: "cm9tvg1qh0000ti6gf1zf5scf",
				createdAt: new Date('2025-04-23').toISOString(),
				updatedAt: new Date('2025-04-23').toISOString(),
				title: "Test Title",
				description: "Test Description",
				status: AppealStatusEnum.NEW,
				completeSolution: null,
				cancelReason: null
			};
			(appealService.create as jest.Mock).mockResolvedValue(mockAppeal);

			const response = await request(app)
				.post('/api/appeal')
				.send({ title: 'Test Title', description: 'Test Description' });

			expect(response.status).toBe(201);
			expect(response.body).toEqual(mockAppeal);	// Можно было toMatchObject вместо toEqual, чтобы сравнивать части объекта, игнорируя точный формат даты
		});

		it('should return 400 if validation fails', async () => {
			const response = await request(app).post('/api/appeal').send({});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('success', false);
			expect(response.body).toHaveProperty('errors');
		});
	});

	describe('GET /api/appeal', () => {
		it('should return all appeals', async () => {
			const mockAppeals = [{
				id: "cm9tvg1qh0000ti6gf1zf5scf",
				createdAt: new Date('2025-04-23').toISOString(),
				updatedAt: new Date('2025-04-23').toISOString(),
				title: "Test Title",
				description: "Test Description",
				status: AppealStatusEnum.NEW,
				completeSolution: null,
				cancelReason: null
			}];
			(appealService.getAll as jest.Mock).mockResolvedValue(mockAppeals);

			const response = await request(app).get('/api/appeal');

			expect(response.status).toBe(201);
			expect(response.body).toEqual(mockAppeals);
		});
	});

	describe('GET /api/appeal/:id', () => {
		it('should return an appeal by ID', async () => {
			const mockAppeal = {
				id: "1",
				createdAt: new Date('2025-04-23').toISOString(),
				updatedAt: new Date('2025-04-23').toISOString(),
				title: "Test Title",
				description: "Test Description",
				status: AppealStatusEnum.NEW,
				completeSolution: null,
				cancelReason: null
			};
			(appealService.getById as jest.Mock).mockResolvedValue(mockAppeal);

			const response = await request(app).get('/api/appeal/1');

			expect(response.status).toBe(201);
			expect(response.body).toEqual(mockAppeal);
		});
	});

	describe('PUT /api/appeal/:id', () => {
		it('should update an appeal and return 201', async () => {
			const mockAppeal = {
				id: "cm9tvg1qh0000ti6gf1zf5scf",
				createdAt: new Date('2025-04-23').toISOString(),
				updatedAt: new Date('2025-04-23').toISOString(),
				title: "Test Title",
				description: "Test Description",
				status: AppealStatusEnum.NEW,
				completeSolution: null,
				cancelReason: null
			};
			(appealService.update as jest.Mock).mockResolvedValue(mockAppeal);

			const response = await request(app)
				.patch('/api/appeal/1')
				.send({ title: 'Updated Title', description: 'Updated Description' });

			expect(response.status).toBe(201);
			expect(response.body).toEqual(mockAppeal);
		})
	});

	describe('DELETE /api/appeal/:id', () => {
		it('should delete an appeal and return 201', async () => {
			const mockAppeal = {
				id: "cm9tvg1qh0000ti6gf1zf5scf",
				createdAt: new Date('2025-04-23').toISOString(),
				updatedAt: new Date('2025-04-23').toISOString(),
				title: "Test Title",
				description: "Test Description",
				status: AppealStatusEnum.NEW,
				completeSolution: null,
				cancelReason: null
			};
			(appealService.delete as jest.Mock).mockResolvedValue(mockAppeal);

			const response = await request(app).delete('/api/appeal/1');

			expect(response.status).toBe(201);
			expect(response.body).toEqual(mockAppeal);
		});
	});

	describe('POST /api/appeal/changeStatus/:id', () => {
		it('should change the status of an appeal and return 201', async () => {
			const mockAppeal = {
				id: "cm9tvg1qh0000ti6gf1zf5scf",
				createdAt: new Date('2025-04-23').toISOString(),
				updatedAt: new Date('2025-04-23').toISOString(),
				title: "Test Title",
				description: "Test Description",
				status: AppealStatusEnum.NEW,
				completeSolution: null,
				cancelReason: null
			};
			(appealService.changeStatus as jest.Mock).mockResolvedValue(mockAppeal);

			const response = await request(app)
				.patch('/api/appeal/status/cm9tvg1qh0000ti6gf1zf5scf')
				.send({ status: 'COMPLETED', completeSolution: 'Solution' });

			expect(response.status).toBe(201);
			expect(response.body).toEqual(mockAppeal);
		});

		it('should return 400 if validation fails', async () => {
			const response = await request(app).patch('/api/appeal/status/cm9tvg1qh0000ti6gf1zf5scf').send({});

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('success', false);
			expect(response.body).toHaveProperty('errors');
		});
	});

	describe('POST /api/appeal/cancel-all', () => {
		it('should cancel all appeals and return the count', async () => {
			const mockCount = 5;
			(appealService.cancelAllAppeals as jest.Mock).mockResolvedValue(mockCount);

			const response = await request(app).patch('/api/appeal/cancel-all');

			expect(response.status).toBe(201);
			expect(response.body).toEqual({ count: mockCount });
		});
	});
});