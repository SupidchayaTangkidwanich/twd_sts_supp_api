require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const soder_route = require('./routes/soder.routes.js');
// const {soder_route, tutorial}  = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = require('./models');
db.conn_sequelize.sync();
db.conn_sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

const MainRoutes = require('./routes/main.routes');
app.use('/api/main',MainRoutes);

// const stockUpdateRoutes = require('./routes/stockUpdate.routes');
// app.use('supp_stock/update_stock', stockUpdateRoutes);

// const LeadtimeRoutes = require('./routes/Leadtime.routes');
// app.use('/supp_stock/update_leadtime', LeadtimeRoutes);

// const BarcodeSubscribeRoutes = require('./routes/BarcodeSubscribe.routes');
// app.use('/supp_stock/list_barcode', BarcodeSubscribeRoutes);

const PORT = process.env.PORT || 1433;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to webcontrol application." });
});

app.use('/soder', soder_route);
require('./routes/tutorial.routes.js')(app);

const APP_PORT = process.env.APP_PORT || 43;
app.listen(APP_PORT, async () => {
  console.log(
    'Server is running on port: 43,',
    'Enviroment:',
    process.env.APP_ENV
  );
});
