const Event = require('./EventModel');
const factory = require('../../utils/factory');
const catchAsync = require('../../errors/catchAsync');

const fetchSubscribedCategory = catchAsync(async function (req, res) {
  if (!req.currentUser || req.currentUser.subscriptions.length === 0) {
    return [];
  }

  const { subscriptions } = req.currentUser;

  const response = await Event.find({
    category: {
      $in: subscriptions,
    },
  });

  return res.status(201).json({
    status: 'success',
    results: response.length,
    data: { subscriptions: response },
    pagination: {
      page,
      limit,
      totalRecords: await Event.countDocuments(),
    },
  });
});

const fetchAllEvents = factory.getAll(Event, { modelName: 'event' });

exports.getAll = async function (req, res, next) {
  if (req.currentUser && req.currentUser.subscriptions.length > 0) {
    return fetchSubscribedCategory(req, res, next);
  }

  return fetchAllEvents(req, res, next);
};

exports.getOne = factory.getOne(Event, { modelName: 'event' });
exports.onCreate = factory.create(Event, { modelName: 'event' });
exports.onUpdate = factory.update(Event, { modelName: 'event' });
exports.onDelete = factory.delete(Event, { modelName: 'event' });
