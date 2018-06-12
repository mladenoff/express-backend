import User from '../models/User';

export const create = function create(req, res, next) {
  const { user, body: { weight, unit } } = req;
  const count = user.weighIns.push({
    weight,
    unit,
  });
  user.save((err) => {
    if (err) { return next(err); }
    res.json({ weighIn: user.weighIns[count - 1] });
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
