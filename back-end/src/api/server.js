const port = Number(process.env.API_PORT) || 3001;
const app = require('./app');

app.use('/', (_req, res) => {
  res.send();
});

app.listen(port, () => console.log(`Api rodando na porta ${port}`));
