const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const {database} = require('../keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB is connect'))
    .catch(err => console.log(err));
