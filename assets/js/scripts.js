$(function () {
    
    $("#searchhero").on("submit", function (event) {
        event.preventDefault();
        const regexValidacion = /^[0-9]+$/i;
        
        let idOrName = $("#SuperHero").val();
        
        if (regexValidacion.test(idOrName) && idOrName < 732 && idOrName > 0) {
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
        
        
        let listhtml = '<ul>';
        listhtml += `<li>Nombre real es: ${response.biography['full-name']} </li>`;
        listhtml += `<li>Alter ego: ${response.biography['alter-egos']} </li>`;
        listhtml += `<li>Alias: ${response.biography.aliases} </li>`;
        listhtml += `<li>Lugar de Nacimiento: ${response.biography['place-of-birth']} </li>`;
        listhtml += `<li>Primera aparicion: ${response.biography['first-appearance']} </li>`;
        listhtml += `<li>Editorial: ${response.biography.publisher} </li>`;
        listhtml += `<li>Alineacion: ${response.biography.alignment} </li>`;
        listhtml += '</ul>';

        let listappearance = '<ul>';
        listappearance += `<li>Genero: ${response.appearance.gender} </li>`;
        listappearance += `<li>Raza: ${response.appearance.race} </li>`;
        listappearance += `<li>Altura: ${response.appearance.height} </li>`;
        listappearance += `<li>Peso: ${response.appearance.weight} </li>`;
        listappearance += `<li>Color de ojos: ${response.appearance['eye-color']} </li>`;
        listappearance += `<li>Color de cabello: ${response.appearance['hair-color']} </li>`;
        listappearance += '</ul>'

        let listwork = '<ul>';
        listwork += `<li>Trabajo: ${response.work.occupation} </li>`;
        listwork += `<li>Base: ${response.work.base} </li>`;
        listwork += '</ul>';

        let listconnections = '<ul>';
        listconnections += `<li>Grupo afiliado: ${response.connections['group-affiliation']} </li>`;
        listconnections += `<li>Parentesco: ${response.connections.relatives} </li>`;
        listconnections += '</ul>';


        $('#card-title').text(`Nombre: ${response.name}`);
        $('#card-img').attr('src', response.image.url);
        $('#card-info').html(listhtml);
        $('#card-info-1').html(listappearance);
        $('#card-info-2').html(listwork);
        $('#card-info-3').html(listconnections);

    }
    
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









