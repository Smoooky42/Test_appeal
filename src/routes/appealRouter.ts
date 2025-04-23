import { Router } from 'express'
import appealController from '../controllers/appealController'
import {
	AppealDTOValidate,
	FilteredAppealDTOValidate,
	UpdateAppealDTOValidate,
	UpdateAppealStatusDTOValidate
} from '../dto/appeal.dto'

const router = Router()

router.post('/', AppealDTOValidate, appealController.create)
router.get('/', appealController.getAll)
router.post(
	'/filtered',
	FilteredAppealDTOValidate,
	appealController.getfilteredAll
)
router.patch('/cancel-all', appealController.cancelAllAppeals)
router.patch(
	'/status/:id',
	UpdateAppealStatusDTOValidate,
	appealController.changeStatus
)
router.patch('/:id', UpdateAppealDTOValidate, appealController.update)
router.get('/:id', appealController.getById)
router.delete('/:id', appealController.delete)

export default router
