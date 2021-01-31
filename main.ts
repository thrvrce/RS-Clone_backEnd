import app from './app';

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

// app.get('/features', (req, res) => {
//   console.log('features');
//   res.send('asdasd');
// });


