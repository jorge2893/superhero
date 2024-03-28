$(function () {
    
    $("#searchhero").on("submit", function (event) {
        event.preventDefault();
        const regexValidacion = /^[0-9]+$/i;
        
        let idOrName = $("#SuperHero").val();
        
        if (regexValidacion.test(idOrName) && idOrName < 732 && idOrName > 0) {
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
        }).done(function (response) {
            
            console.log(response);
            renderData(response);
        })
        
    };
    const renderData = (response) => {
        if (response == undefined || response == null) {
            alert('No se encontraron datos');
            return;
        }
        $('#superHero').val('');
        dataGraphe(response);
        
        
        
        $('#card-title').text(`Nombre: ${response.name}`);
        $('#card-img').attr('src', response.image.url);
        $('#card-info').text(`Publicado por: ${response.biography.publisher}`);
        $('#card-info-1').text(response.connections['group-affiliation']);
        $('#card-info-2').text(`Ocupación: ${response.work.occupation}`);
        $('#card-info-3').text(`Primera aparición: ${response.biography['first-appearance']}`);
        $('#card-info-4').text(`Altura: ${response.appearance.height}`);
        $('#card-info-5').text(`Peso: ${response.appearance.weight}`);
        $('#card-info-6').text(`Alianzas: ${response.connections['group-affiliation']}`);
        
    };
    
    const dataGraphe = (response) => {
        let { powerstats: stats } = response;
        let powerstats = response.powerstats;
        
        let statsdata = [];
        for (let key in powerstats) {
            statsdata.push({ label: key, y: Number(powerstats[key]) });
        };
        let chart = new CanvasJS.Chart("graphContainer", {
            animationEnabled: true,
            title: {
                text: `Estadisticas de Poder para ${response.name}`
            },
            data: [{
                type: "bar",
                dataPoints: statsdata
            }]
        });
        return chart.render();
    };

    

});









