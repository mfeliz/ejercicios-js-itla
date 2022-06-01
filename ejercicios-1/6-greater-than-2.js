var prompt = require('prompt');
prompt.start();
prompt.get(['primer_numero', 'segundo_numero', 'tercer_numero'], function (err, result) {
    let numeroMayor = 0;
    let primero = parseInt(result.primer_numero);
    let segundo = parseInt(result.segundo_numero);
    let tercero = parseInt(result.tercer_numero);

    if (  (primero > segundo)
        && (primero > tercero)  ){
        numeroMayor = primero;
    }else if(   (segundo > primero)
             && (segundo > tercero)  ){
        numeroMayor = segundo;
    }else{
        numeroMayor = tercero;
    }
    
    console.log('El mayor de los tres es: ' + numeroMayor);
});