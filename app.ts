import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import todoRouter from './routes/todos';
import auth from './routes/auth';
import topics from './routes/Topics';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRouter);
app.use('/login', auth);
app.use('/topics', topics);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.json({
    statuscode: 404,
  });
});

app.use((err:any, req:any, res:any, next:any) => {
  res.json({
    statuscode: 500,
    message: err.message,
    stack: err.stack,
  });
});

function normalizePort(val: any) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const PORT = normalizePort(process.env.PORT || '3005');

app.set('port', PORT);
app.listen(PORT, () => {
  console.log(`gc ${PORT}`);
});
