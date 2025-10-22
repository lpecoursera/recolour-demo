import { users } from '../data/mockData.js'
import { ResponseService } from '../services/responseService.js'

export function listUsers(req, res) {
    ResponseService.multiResponse(req, res, users);
}

export function getUser(req, res) {
    const id = req.params.id;
    const entity = users.find(x => x.id === id);
    if (ResponseService.ifNotExistResponse(res, entity)) return;
    if (ResponseService.ifNotAllowedResponse(req, res, entity, "View")) return;
    ResponseService.singleResponse(req, res, entity);
}
