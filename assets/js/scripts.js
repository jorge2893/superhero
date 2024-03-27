$(function(){
    
$("#searchhero").on("submit", function(event){
    event.preventDefault();
    const regexValidacion = /^[a-záéíóúñ0-9\s.]+$/i;
    let idorname = $("#SuperHero").val();
    if(regexValidacion.test(idorname)){
        getSuperhero(idorname);
    } else {
        return alert("El número ingresado no es valido");
    };
});









});