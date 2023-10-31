const app = require('./app');
const cofig = require('./utils/config');

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
})