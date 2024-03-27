$(function () {

    $("#searchhero").on("submit", function (event) {
        event.preventDefault();
        const regexValidacion = /^[0-9]+$/i;

        let idOrName = $("#SuperHero").val();

        if (regexValidacion.test(idOrName)) {
            //SI ID OR NOMBR ES VÁLIDO
            getHero(idOrName);
        } else {
            return alert("El número ingresado no es valido");
        };
    });

    function getHero(idOrName) {
        let urlBase = "https://superheroapi.com/api/access-token/character-id" + idOrName;
        $.ajax({
            method: "GET",
            url: urlBase,
            dataType: "json"
        });
    }





});









