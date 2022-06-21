const Event = require('./EventModel');
const factory = require('../../utils/factory');

exports.getAll = factory.getAll(Event, { modelName: 'event' });
exports.getOne = factory.getOne(Event, { modelName: 'event' });
exports.onCreate = factory.create(Event, { modelName: 'event' });
exports.onUpdate = factory.update(Event, { modelName: 'event' });
exports.onDelete = factory.delete(Event, { modelName: 'event' });
