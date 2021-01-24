import express from 'express';
import logger from 'morgan';
import todoRouter from './routes/todos';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRouter);
// app.use('/', (req, res, next) => {
//   res.send('hello there');
// });

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

export default app;
