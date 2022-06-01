var prompt = require('prompt');
prompt.start();
prompt.get(['primer_numero', 'segundo_numero'], function (err, result) {
    let numeroMayor = 0;

    if (parseInt(result.primer_numero) > parseInt(result.segundo_numero)){
        numeroMayor = parseInt(result.primer_numero);
    }else{
        numeroMayor = parseInt(result.segundo_numero);
    }
    
    console.log('El mayor de los dos es: ' + numeroMayor);
});