var prompt = require('prompt');
prompt.start();
prompt.get(['nombre'], function (err, result) {
    console.log('Buenos dias: ' + result.nombre);
});