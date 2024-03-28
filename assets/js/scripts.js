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
        let urlBase = "https://www.superheroapi.com/api.php/4905856019427443/" + idOrName;
        $.ajax({
            method: "GET",
            url: urlBase,
            dataType: "json"
        }).done(function(response){

            console.log(response);
            renderData(response)

            // let herovillain = {
            //     id: response.id,
            //     name: response.name,
            //     image: response.sprites.front_default,
                
            // }
        })

    };
    const renderData = (response) =>{
        if(response == undefined || response == null){
            alert('No se encontraron datos');
            return;
        }

    dataGraphe(response);

        $('#card-title').text(`Nombre: ${response.name}`);
        $('#card-img').attr('src', response.image.url);
        $('#card-info').text(response.connections['group-affiliation']);
    };





});









