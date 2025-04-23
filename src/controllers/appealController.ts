import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Appeal } from '../generated/client'
import appealService from '../services/appealService'

class appealController {
	async create(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({
					success: false,
					errors: errors.array()
				})
				return
			}

			const { title, description } = req.body
			const newAppeal: Appeal = await appealService.create(
				title,
				description
			)

			res.status(201).json(newAppeal)
		} catch (error) {
			next(error)
		}
	}

	async getAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const appeals: Appeal[] = await appealService.getAll()

			res.status(201).json(appeals)
		} catch (error) {
			next(error)
		}
	}

	async getfilteredAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({
					success: false,
					errors: errors.array()
				})
				return
			}
			const { startDate, endDate } = req.body
			const appeals: Appeal[] = await appealService.getFilteredAll(
				startDate,
				endDate
			)

			res.status(201).json(appeals)
		} catch (error) {
			next(error)
		}
	}

	async getById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const id = req.params.id
			const appeal: Appeal = await appealService.getById(id)

			res.status(201).json(appeal)
		} catch (error) {
			next(error)
		}
	}

	async update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({
					success: false,
					errors: errors.array()
				})
				return
			}

			const id = req.params.id
			const { title, description } = req.body
			const newAppeal: Appeal = await appealService.update(
				id,
				title,
				description
			)

			res.status(201).json(newAppeal)
		} catch (error) {
			next(error)
		}
	}

	async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const id = req.params.id
			const appeal: Appeal = await appealService.delete(id)

			res.status(201).json(appeal)
		} catch (error) {
			next(error)
		}
	}

	async changeStatus(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				res.status(400).json({
					success: false,
					errors: errors.array()
				})
				return
			}

			const id = req.params.id
			const { status, completeSolution, cancelReason } = req.body
			const appeal: Appeal = await appealService.changeStatus(
				id,
				status,
				completeSolution,
				cancelReason
			)

			res.status(201).json(appeal)
		} catch (error) {
			next(error)
		}
	}

	async cancelAllAppeals(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const count: number = await appealService.cancelAllAppeals() //Кол-во отмененных обращений

			res.status(201).json({ count })
		} catch (error) {
			next(error)
		}
	}
}

export default new appealController()
