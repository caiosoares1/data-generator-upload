import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(router);

app.use((req, res, next) => {
  res.status(404).send('Content not found');
});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json ({
    message: 'Something broke!'
  });
});


app.listen(port, () => console.log('Server is running!'));