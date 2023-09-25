require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 1433;
const APP_PORT = process.env.APP_PORT || 43;

app.use(bodyParser.json());
app.use(cors());

const mainRoutes = require('./routes/main.routes');
app.use('/api', mainRoutes);

const db = require('./models');
db.conn_sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to webcontrol application." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.listen(APP_PORT, async () => {
  console.log(
    'Server is running on port:', APP_PORT,
    'Environment:', process.env.APP_ENV
  );
});

