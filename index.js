const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
// swagger stuff
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./config/swagger');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = process.env.PORT || 4500;

const userRoute = require("./routes/userRoute");
const binRoute = require("./routes/binRoute");
const truckRoute = require("./routes/truckRoute");
const clusterRoute = require("./routes/clusterRoute");
app.use("/users", userRoute);
app.use("/cluster", clusterRoute);
app.use("/bin", binRoute);
app.use("/truck", truckRoute);

// swagger routes
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//For mongoose deprecation stuff
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect("mongodb://safwen:01161590Merrick@ds225294.mlab.com:25294/meandb")
  .then(() => {
    console.log("mongo connected");
  })
  .catch(err => {
    console.log("err",err);
  });

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
