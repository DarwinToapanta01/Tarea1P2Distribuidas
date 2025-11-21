const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/usuario', require('./routes/usuario'));
app.use('/carro', require('./routes/carro'));

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});