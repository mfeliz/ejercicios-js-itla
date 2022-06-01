var prompt = require('prompt');
prompt.start();
prompt.get(['primer_numero', 'segundo_numero'], function (err, result) {
    console.log('El resultado de la suma es: ' + (parseInt(result.primer_numero) + parseInt(result.segundo_numero)));
});