import User from '../models/user';

export const create = function create(req, res, next) {
  const { user } = req;
  const { weight, unit } = req.body;
  const count = user.weighIns.push({
    weight,
    unit,
  });
  const _id = user.weighIns[count - 1]._id;
  user.save((err) => {
    if (err) { return next(err); }
    res.json({ weighIn: { weight, _id } });
  });
};

export const index = function index(req, res, next) {
  if (req.params.userId) {
    res.json({ weighIns: req.user.weighIns });
  } else {
    User.allUserWeighIns().then((weighIns) => {
      res.json({ weighIns });
    });
  }
};
