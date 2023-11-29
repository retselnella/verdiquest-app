const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use('/admin', adminRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
