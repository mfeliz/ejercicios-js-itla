var prompt = require('prompt');
prompt.start();
prompt.get(['valor'], function (err, result) {
    let modulo = parseInt(result.valor)%2;

    if (modulo == 0){
        console.log('El numero es divisible entre 2');
    }else{
        console.log('El numero no es divisible entre 2');
    }
});