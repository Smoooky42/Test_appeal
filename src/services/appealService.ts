import { Appeal, AppealStatusEnum, Prisma } from '@/generated/client'
import prisma from '@/prisma-client'

class appealService {
	async create(title: string, description: string): Promise<Appeal> {
		const newAppeal: Appeal = await prisma.appeal.create({
			data: {
				title,
				description
			}
		})

		return newAppeal
	}

	async getAll(): Promise<Appeal[]> {
		const appeals: Appeal[] = await prisma.appeal.findMany()

		return appeals
	}

	async getFilteredAll(
		startDate: string,
		endDate?: string
	): Promise<Appeal[]> {
		if (!endDate) {
			// Если endDate не передан, создаем объект Date и увеличиваем на 1 день
			const tempDate = new Date(startDate)
			tempDate.setDate(tempDate.getDate() + 1)
			endDate = tempDate.toISOString().split('T')[0] // Преобразуем обратно в строку (формат YYYY-MM-DD)
		}

		const appeals: Appeal[] = await prisma.appeal.findMany({
			where: {
				createdAt: {
					gte: new Date(startDate),
					lte: new Date(endDate)
				}
			}
		})

		return appeals
	}

	async getById(id: string): Promise<Appeal> {
		const appeal: Appeal | null = await prisma.appeal.findUnique({
			where: {
				id
			}
		})

		if (!appeal) {
			throw new Error('Обращения не найдено')
		}

		return appeal
	}

	async update(
		id: string,
		title: string,
		description: string
	): Promise<Appeal> {
		const oldAppeal: Appeal | null = await prisma.appeal.findUnique({
			where: {
				id
			}
		})
		if (!oldAppeal) {
			throw new Error('Обращения не найдено')
		}

		const appeal: Appeal = await prisma.appeal.update({
			where: {
				id
			},
			data: {
				title,
				description
			}
		})

		return appeal
	}

	async delete(id: string): Promise<Appeal> {
		const oldAppeal: Appeal | null = await prisma.appeal.findUnique({
			where: {
				id
			}
		})
		if (!oldAppeal) {
			throw new Error('Обращения не найдено')
		}

		const appeal: Appeal = await prisma.appeal.delete({
			where: {
				id
			}
		})

		return appeal
	}

	async changeStatus(
		id: string,
		status: AppealStatusEnum,
		completeSolution?: string,
		cancelReason?: string
	): Promise<Appeal> {
		const oldAppeal: Appeal | null = await prisma.appeal.findUnique({
			where: {
				id
			}
		})
		if (!oldAppeal) {
			throw new Error('Обращения не найдено')
		}

		const appeal: Appeal = await prisma.appeal.update({
			where: {
				id
			},
			data: {
				status,
				completeSolution,
				cancelReason
			}
		})

		return appeal
	}

	async cancelAllAppeals(): Promise<number> {
		const appeals: Prisma.BatchPayload = await prisma.appeal.updateMany({
			where: {
				status: AppealStatusEnum.IN_PROGRESS
			},
			data: {
				status: AppealStatusEnum.CANCELED,
				cancelReason: 'Отменено администратором'
			}
		})

		return appeals.count
	}
}

export default new appealService()
