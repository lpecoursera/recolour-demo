import { ACTIONS } from '../models/actions.js'
import { STATUSES } from '../models/statuses.js'
import { ResponseService } from '../services/responseService.js'

export function getActions(req, res) {
    ResponseService.okResponse(res, ACTIONS);
}

export function getStatuses(req, res) {
    ResponseService.okResponse(res, STATUSES);
}
