import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import router from './services/router';

const app = express();

mongoose.connect(process.env.MLAB_URI)
  .catch((err) => {
    console.error('Mongoose connection error:', err.stack);
    process.exit(1);
  });

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

console.log('Listening on', HOST, PORT);
app.listen(PORT, HOST);
