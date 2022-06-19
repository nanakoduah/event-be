const dotenv = require('dotenv')();
const app = require('./app');

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})