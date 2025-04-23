import { AppealStatusEnum } from '@/generated/client'
import { body } from 'express-validator'

export interface AppealDTO {
	title: string
	description?: string
}

export const AppealDTOValidate = [
	body('title')
		.exists({ checkFalsy: true })
		.withMessage('Тема обязателена')
		.isString()
		.withMessage('Тема должна быть строкой'),

	body('description')
		.optional()
		.isString()
		.withMessage('Текст обращения должн быть строкой')
]

export interface UpdateAppealDTO {
	title?: string
	description?: string
}

export const UpdateAppealDTOValidate = [
	body('title')
		.exists({ checkFalsy: true })
		.withMessage('Тема обязателена')
		.isString()
		.withMessage('Тема должна быть строкой'),

	body('description')
		.optional()
		.isString()
		.withMessage('Текст обращения должн быть строкой')
]

export interface UpdateAppealStatusDTO {
	status: AppealStatusEnum
	completeSolution?: string
	cancelReason?: string
}

export const UpdateAppealStatusDTOValidate = [
	body('status')
		.exists({ checkFalsy: true })
		.withMessage('Статус обязателен')
		.isIn(Object.values(AppealStatusEnum))
		.withMessage('Данный статус не поддерживается'),

	body('completeSolution')
		.optional()
		.isString()
		.withMessage('Решение проблемы должно быть строкой'),

	body('cancelReason')
		.optional()
		.isString()
		.withMessage('Причина отмены должна быть строкой')
]

export interface FilteredAppealDTO {
	startDate: string
	endDate?: string
}

export const FilteredAppealDTOValidate = [
	body('startDate')
		.exists({ checkFalsy: true })
		.withMessage('Хотя бы одна дата обязательна')
		.isString()
		.withMessage('Дата должна быть строкой')
		.custom((value) => {
			const date = new Date(value)
			if (isNaN(date.getTime())) {
				return Promise.reject('Неверный формат даты')
			} else {
				return true
			}
		}),

	body('endDate')
		.optional()
		.isString()
		.withMessage('Дата должна быть строкой')
		.custom((value) => {
			const date = new Date(value)
			if (isNaN(date.getTime())) {
				return Promise.reject('Неверный формат даты')
			} else {
				return true
			}
		})
]
