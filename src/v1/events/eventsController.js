const Event = require('./EventModel');
const factory = require('../../utils/factory');

const fetchSubscribedCategory = async function (req) {
  if (!req.currentUser || req.currentUser.subscriptions.length === 0) {
    return [];
  }

  const { subscriptions } = req.currentUser;
  const response = await Event.find({
    category: {
      $in: subscriptions,
    },
    date: { $gt: new Date() },
  });

  return response;
};

const fetchAllEvents = async function (req) {
  const response = await Event.find({
    date: { $gt: new Date() },
  });

  return response;
};

exports.getAll = async function (req, res, next) {
  Promise.all([fetchSubscribedCategory(req), fetchAllEvents(req)])
    .then((response) => {
      const [subscribedEvents, allEvents] = response;
      res.status(200).json({
        results: 2,
        data: {
          subscribedEvents,
          allEvents,
        },
      });
    })
    .catch((err) => next(err));
};

exports.getOne = factory.getOne(Event, { modelName: 'event' });
exports.onCreate = factory.create(Event, { modelName: 'event' });
exports.onUpdate = factory.update(Event, { modelName: 'event' });
exports.onDelete = factory.delete(Event, { modelName: 'event' });
