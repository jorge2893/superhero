$(function () {

    $("#searchhero").on("submit", function (event) {
        event.preventDefault();
        const regexValidacion = /^[0-9]+$/i;

        let idOrName = $("#SuperHero").val();

        if (regexValidacion.test(idOrName) && idOrName < 732 && idOrName > 0) {
            getHero(idOrName);
            $('#oculto').removeClass('d-none');
        } else {
            failRegex(idOrName);
        };
    });

    function getHero(idOrName) {
        let urlBase = "https://www.superheroapi.com/api.php/4905856019427443/" + idOrName;
        $.ajax({
            method: "GET",
            url: urlBase,
            dataType: "json"
        }).done(function (response) {

            let personaje = validarDatos(response);
            renderData(personaje);
        })

    };
    const renderData = (response) => {
        if (response == undefined || response == null) {
            alert('No se encontraron datos');
            return;
        }
        $('#superHero').val('');


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
        listappearance += `<li>Altura: ${response.appearance.height[0]} - ${response.appearance.height[1]}  </li>`;
        listappearance += `<li>Peso: ${response.appearance.weight[0]} - ${response.appearance.weight[1]} </li>`;
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

        dataGraphe(response);
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
            axisX: {
                interval: 1
            },
            axisY:{
                interval: 10,
                title: "stats",
                includeZero: true,
                scaleBreaks: {
                    autoCalculate: false,
                    customBreaks: {
                        startValue: 0,
                        endValue: 100
                    }
                }


            },
            data: [{
                type: "bar",
                dataPoints: statsdata
            }]
        });
        return chart.render();
    };

    function validarDatos(pj) {
        pj.biography['full-name'] == "null" ? pj.biography['full-name'] = 'Sin Nombre' : false;
        pj.biography['alter-egos'] == "null" ? pj.biography['alter-egos'] = 'Sin Alterego' : false;
        pj.biography.aliases == "null" ? pj.biography.aliases = 'Sin alias' : false;
        pj.biography['place-of-birth'] == "null" ? pj.biography['place-of-birth'] = 'Sin Fecha conocida' : false;
        pj.biography['first-appearance'] == "null" ? pj.biography['first-appearance'] = 'Desconocido' : false;
        pj.biography.publisher == "null" ? pj.biography.publisher = 'Sin Editorial' : false;
        pj.biography.alignment == "null" ? pj.biography.alignment = 'Desconocido' : false;
        pj.appearance.gender == "null" ? pj.appearance.gender = 'Desconocido': false;
        pj.appearance.race == "null" ? pj.appearance.race = 'Sin raza' : false;
        pj.appearance.height == "null" ? pj.appearance.height = 'Desconocido': false;
        pj.appearance.weight == "null" ? pj.appearance.weight = 'Desconocido': false;
        pj.appearance['eye-color'] == "null" ? pj.appearance['eye-color'] = 'Desconocido': false;
        pj.appearance['hair-color'] == "null" ? pj.appearance['hair-color'] = 'Desconocido': false;
        pj.work.occupation == "null" ? pj.work.occupation = 'Sin ocupacion': false;
        pj.work.base == "-" ? pj.work.base = 'Sin trabajo': false;
        pj.connections['group-affiliation'] == "null" ? pj.connections['group-affiliation'] = 'Sin grupo': false;
        pj.connections.relatives == "null" ? pj.connections.relatives = 'Desconocido': false;   
        pj.powerstats.intelligence == "null" ? pj.powerstats.intelligence = '1' : false;
        pj.powerstats.strength == "null" ? pj.powerstats.strength = '1': false;
        pj.powerstats.speed == "null" ? pj.powerstats.speed = '1': false;
        pj.powerstats.durability == "null" ? pj.powerstats.durability = '1': false;
        pj.powerstats.power == "null" ? pj.powerstats.power = '1': false;
        pj.powerstats.combat == "null" ? pj.powerstats.combat = '1': false;

        console.log(pj);
        return pj
    }
    const failRegex = (idOrName) => {
        $('#modalLabel').text(`El Heroe con id: ${idOrName} no existe`);
        $('#exampleModal').modal('show');
        $('#modalBody').text(`Por favor introduce un ID numérico valido y menor a 732`);
        $('#pokeName').val('');
        console.log('Error al capturar datos por fracaso de validacion en regex ')
    };
});









