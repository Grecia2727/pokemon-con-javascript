function getData(){
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=100&offset=0`)
    .then(function(response) {
        response.json().then(
          function(data){
            console.log("data 111");
            console.log(data);
            const pokemons = data.results;
            paintPokemons(pokemons);
            $(document).on("click", ".icon_bullet", paintModal);
            $(document).on("click", ".icon_bullet", paintMoreDetails);
            document.getElementById("close-modal").addEventListener("click", cleanModal);
            document.getElementById("search-btn").addEventListener("click", searchPokemons);
            
            function paintPokemons(pokemons){
              let template = ``;
              pokemons.forEach(function (element,index){
                let id = index + 1;
                let name = element.name;
                let firstLetter = name[0].toUpperCase();
                let otherLetter = name.slice(1,name.length);
                name = firstLetter + otherLetter;
            
                template += `
                <div data-name="${name}" class="pokemon-box text-center col-lg-2 col-xs-4">
                 <img src="assets/images/pokeball_bullet.png" class="icon_bullet" 
                 data-toggle="modal" data-target=".pokemonModal" 
                 id="${id}">
                 <p>${name}<p>
                </div>
                `;
                
              });
              document.getElementById("pokemon-container").innerHTML = template;
              document.getElementById("searcher").value = ""; //Clean input search
            }
            
            function paintModal(){
              
              let id = event.target.id;
              fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(function(response) {
                    response.json().then(
                      function(data){
                        console.log(data);
                        // obtaining data
                        let frontImage = data.sprites.front_default;
                        let backImage = data.sprites.back_default;
                        let name = data.name.toUpperCase();
                        let height = data.height;
                        let weight = data.weight;
                        let types = data.types;
                        let abilities = data.abilities;
                        let stats = data.stats;
            
                        let typeTemplate = ``;
                        types.forEach(function (element){
                          let type = element.type.name;
                          typeTemplate += `<li>${type}</li>`;
                        });
                        
                        let abilityTemplate = ``;
                        abilities.forEach(function (element){
                          let ability = element.ability.name;
                          abilityTemplate += `<li>${ability}</li>`;
                        });

                        stats.forEach(function (element){
                         
                          //Getting data of speed, hp, defense & attack
                          if(element.stat.name=="speed"){
                            let speed= element.base_stat;
                            document.getElementById("speed").innerHTML = speed;
                          }else if(element.stat.name=="hp"){
                            let hp= element.base_stat;
                            document.getElementById("hp").innerHTML = hp;
                          }else if(element.stat.name=="defense"){
                            let defense= element.base_stat;
                            document.getElementById("defense").innerHTML = defense;
                          }else if(element.stat.name=="attack"){
                            let attack= element.base_stat;
                            document.getElementById("attack").innerHTML = attack;
                          }
                        });
                        
                        // adding data to html
                        document.getElementById("image").style.backgroundImage = `url('${frontImage}')`;
                        document.getElementById("name").innerHTML = name;
                        document.getElementById("height").innerHTML = height;
                        document.getElementById("weight").innerHTML = weight;
                        document.getElementById("type").innerHTML = typeTemplate;
                        document.getElementById("ability").innerHTML = abilityTemplate;
                                    
                        //Function for changing the image of the pokemon
                        $(document).on("click", "#rotate-img", changeImage);

                        function changeImage(){
                          if(this.classList.contains("front")){
                            this.classList.add("back");
                            this.classList.remove("front");
                            document.getElementById("image").style.backgroundImage = `url('${backImage}')`;
                          }else if(this.classList.contains("back")){
                            this.classList.add("front");
                            this.classList.remove("back");
                            document.getElementById("image").style.backgroundImage = `url('${frontImage}')`;
                          }
                        }

                      }
                    );
                });
            }
            
            function paintMoreDetails(){
              let id = event.target.id;
            
              fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                .then(function(response) {
                    response.json().then(
                      function(data){

                        // Obtaining data
                        let bios = data.flavor_text_entries;
                        let capRate = data.capture_rate; 
                        let habitat = data.habitat.name;
                        
                        let firstBio = bios.find(function(element) {
                          return element.language.name == "en";
                        });
                        let description = firstBio.flavor_text;
            
                        //Adding data to HTML
                        document.getElementById("description").innerHTML = description;
                        document.getElementById("habitat").innerHTML = habitat;
                        document.getElementById("cap-rate").innerHTML = capRate;
                      });
                  })
            }
            
            function cleanModal(){
              // Clean spaces
              document.getElementById("image").style.backgroundImage = "";
              document.getElementById("name").innerText = "";
              document.getElementById("height").innerText = "";
              document.getElementById("weight").innerText = "";
              document.getElementById("habitat").innerHTML = "";
              document.getElementById("type").innerHTML = "";
              document.getElementById("ability").innerHTML = "";
              document.getElementById("description").innerHTML = "";
              document.getElementById("speed").innerHTML = "";
              document.getElementById("hp").innerHTML = "";
              document.getElementById("defense").innerHTML = "";
              document.getElementById("attack").innerHTML = "";
              document.getElementById("cap-rate").innerHTML = "";
            }

            function searchPokemons(){
              
              //Getting all the pokemons divs displayed on screen
              let allPokemons = Array.from(document.getElementsByClassName("pokemon-box"));
              let searchedPokemon = document.getElementById("searcher").value;
              
              allPokemons.forEach(element => {
                if(element.dataset.name[0] !== searchedPokemon[0]){
                  element.classList.add("hidden");
                }
              });
            }

          }
        );
    });
}
getData();

