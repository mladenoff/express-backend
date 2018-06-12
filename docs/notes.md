Node has all of ES6 but no `import`s. To start without webpack use `babel-node`:

`./node_modules/.bin/babel-node index`

TODO: find how to alias for `babel-node index`

I have a backend API for an Express/Mongo health tracking app.

Each user has an array of `weighIns`, subdocuments that contain a value, a unit, and the date recorded. If no unit is specified the unit defaults to `'lb'`.

    const WeighInSchema = new Schema({
      weight: {
        type: Number,
        required: 'A value is required',
      },
      unit: {
        type: String,
        default: 'lb',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    });

Each user also has a defaultUnit field, that can specify a default unit for that user. If that user posts a weighIn without specifying a unit, that weighIn should use the user's defaultUnit if present or else default to `'lb'`.

    const UserSchema = new Schema({
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please enter a valid email'],
      },
      password: {
        type: String,
      },
      weighIns: [WeighInSchema],
      defaultUnit: String,
    });

Where is correct location for this logic?

I can easily do this in the create method of my WeighInsController, but this seems at best not best practice and at worst an anti-pattern.

    // WeighInsController.js

    export const create = function create(req, res, next) {
      const { user, body: { weight } } = req;
      const unit = req.body.unit || user.defaultUnit;
      const count = user.weighIns.push({
        weight,
        unit,
      });
      user.save((err) => {
        if (err) { return next(err); }
        res.json({ weighIn: user.weighIns[count - 1] });
      });
    };

It doesn't seem possible to specify a reference to a parent document in a Mongoose schema, but I would think that a better bet would be in my `pre('validate')` middleware for the subdocument. I just can't see a way to reference the parent document in the subdocument middleware either.

NB: This answer https://stackoverflow.com/a/24918037/8038944 does not work as I don't want to override all of the user's WeighIns' units, just when unspecified in the `POST` request.

Am I stuck doing this in my controller? I started with Rails so I have had 'fat models, skinny controllers' etched on my brain.