$(document).ready(function(){

    $("#buscador").submit(function(event){
        event.preventDefault();
        submitValidation();
        serchHeroId();
    })

  function submitValidation(){
        let idNumber = $('#buscarHero').val();
        if (!/^[1-9]\d*/.test(idNumber)) {
          alert('Por favor ingrese un NÚMERO mayor que cero.');
          return false;
      }
        return true;
    }

    function serchHeroId(){
        const id = $('#buscarHero').val();
        const apiUrl = `https://superheroapi.com/api.php/4905856019427443/${id}`;

        $.ajax({
            url: apiUrl,
            type: "GET",
            dataType: "json",
            success: function(hero){
                displayHeroInfo(hero);
                console.log(hero);
            }
        });
    }

    function displayHeroInfo(hero){
        let conteHero = `
        <div class="container d-flex flex-row justify-content-around">
        <div class="card" style="width: 18rem;">
            <img src="${hero.image['url']}" class="card-img-top" alt="${hero.name}">
            <div class="card-body">
              <h5 class="card-title">${hero.name}</h5>
              <p class="card-text">Connections: ${hero.connections['group.affiliation']}.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          <div id="grafico" style="height: 370px; width: 100%;"></div>
        </div>
        `;

        $('#conteHero').html(conteHero);

        // Grafico Canvasjs
        // let opciones = {
        //     animationEnabled: true,
        //     title: {
        //         text: `Estadisticas para ${hero.name}`
        //     },
        //     data: [{
        //         type: "doughnut",
        //         innerRadius: "80%",
        //         showInLegend: true,
        //         legendText: "{label}",
        //         indexLabel: "{label}: #percent%",
        //         dataPoints: [
        //             {label: "combat", y: hero.powerstats.combat},
        //             {label: "intelligence", y: hero.powerstats.intelligence},
        //             {label: "strength", y: hero.powerstats.strength},
        //             {label: "speed", y: hero.powerstats.speed},
        //             {label: "durability", y: hero.powerstats.durability},
        //             {label: "power", y: hero.powerstats.power},
        //         ]
        //     }]
        // };

        // let chart = new CanvasJS.Chart("grafico", opciones);
        // chart.render();
        // $('.canvasjs-chart-credit').html('');
    }
});
