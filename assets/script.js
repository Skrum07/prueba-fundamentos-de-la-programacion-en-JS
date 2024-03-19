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
        let conteHero =
        `
        <h2 style = "text-aligne:center">Este es tu Super Heroe</h2>
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${hero.image['url']}" class="img-fluid rounded-start" alt="${hero.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Nombre: ${hero.name}</h5>
              <p class="card-text"><small class="text-body-secondary">Nombre completo: ${hero.biography['full-name']}</small></p>
              <hr>
              <p class="card-text"><small class="text-body-secondary">Raza: ${hero.biography['place-of-birth']}</small></p>
              <hr>
              <p class="card-text"><small class="text-body-secondary">Alias: ${hero.biography['aliases']}</small></p>
              <hr>
              <p class="card-text"><small class="text-body-secondary">Primera aparicion: ${hero.biography['first-appearance']}</small></p>
              <hr>
              <p class="card-text"><small class="text-body-secondary">Partners: ${hero.connections['group-afiliation']}</small></p>
              <hr>
              <p class="card-text"><small class="text-body-secondary">Peso: ${hero.appearance['weight']}</small></p>
              <hr>

            </div>
          </div>
        </div>
      </div>`

        $('#conteHero').html(conteHero);

        // Grafico Canvasjs
         let opciones = {
             animationEnabled: true,
             title: {
                 text: `Estadisticas para ${hero.name}`
             },
             data: [{
                 type: "doughnut",
                 innerRadius: "80%",
                 showInLegend: true,
                 legendText: "{label}",
                 indexLabel: "{label}: #percent%",
                 dataPoints: [
                     {label: "intelligence", y: hero.powerstats[1].intelligence},
                     {label: "strength", y: hero.powerstats[2].strength},
                     {label: "speed", y: hero.powerstats[3].speed},
                     {label: "durability", y: hero.powerstats[4].durability},
                     {label: "power", y: hero.powerstats[5].power},
                     {label: "combat", y: hero.powerstats[0].combat},
                 ]
             }]
        };
        
        $("#grafico").CanvasJSChart(opciones);
        $('canvasjs-chart-credit').html('')
    }
});
