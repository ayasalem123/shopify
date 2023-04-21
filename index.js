express = require('express');
mongoose = require('mongoose');
bodyParser = require('body-parser');
const path = require('path');
dotenv = require('dotenv');
cors = require('cors');
dotenv.config();
const userroutes = require('./routes/user');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DATAURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected!'))
  .catch((error) => console.log(error.message));
app.use(userroutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port `);
});
