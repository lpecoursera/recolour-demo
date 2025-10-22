import { computeAllowedActions, isAllowedAction } from './permissionService.js';
import { emitToAuthorized } from '../socket/socket.js';

export const ResponseService = {

    ifNotExistResponse(res, entity) {
        if (!entity) {
            res.status(404).json({ success: false, error: 'Not found' });
            return true;
        }
        return false;
    },

    ifNotAllowedResponse(req, res, entity, actionKey) {
        if (!isAllowedAction(req.user, entity, actionKey)) {
            res.status(403).json({ success: false, error: 'No permission' });
            return true;
        }
        return false;
    },

    filterNotAllowedMultiResponse(req, entities) {
        return entities.filter(entity => isAllowedAction(req.user, entity, "View"));
    },

    okResponse(res, data) {
        return res.status(200).json({ success: true, data: data });
    },

    okResponseNoData(res) {
        return res.status(200).json({ success: true });
    },

    singleResponse(req, res, entity) {
        entity.actions = computeAllowedActions(req.user, entity);
        if (isAllowedAction(req.user, entity, "View")) {
            return ResponseService.okResponse(res, entity);
        } else {
            return ResponseService.okResponseNoData(res);
        }
    },

    multiResponse(req, res, entities) {
        const filteredEntities = ResponseService.filterNotAllowedMultiResponse(req, entities)
        const entitiesWithActions = filteredEntities.map(e => ({ ...e, actions: computeAllowedActions(req.user, e) }));
        return ResponseService.okResponse(res, entitiesWithActions);
    },

    singleEmit(req, entity, emitEvent, clearEvent) {
        const io = req.app.get('io');
        emitToAuthorized(io, emitEvent, entity, { clearEventName: clearEvent }, (user, entity) => {
            entity.actions = computeAllowedActions(user, entity);
            return isAllowedAction(user, entity, "View");
        });
    }
}