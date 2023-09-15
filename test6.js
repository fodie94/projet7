
  
async function getJSON() {
const res = await fetch('recipes.json')
const resData = await res.json()
return resData
}
async function getPhotographers() {
// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

const { recipes } = await getJSON()

return { recipes }
}



async function filterRecipes(recipes) {

const ingredientSelect = document.getElementById('tri-select1');
const applianceSelect = document.getElementById('tri-select2');
const ustensilSelect = document.getElementById('tri-select3');   
 

let ingredients = [];
let appliances = [];
let ustensils = [];

const recipeContainer = document.getElementById('recipe-container');
let count = 0
recipes.forEach(recipe => {
    count++
    const mediaGalery = mediaTemplate(recipe);
    const recipeCard = mediaGalery.getRecette();
    recipeContainer.appendChild(recipeCard);
    
})
const numberRecettes = document.getElementById('number-recettes'); 
        const numberR = document.createElement('p')
        const nameNumberRecettes = document.createElement('p')
        nameNumberRecettes.textContent =`${count}`;
        numberR.textContent="recettes";
        numberRecettes.innerHTML=""
        numberRecettes.appendChild(nameNumberRecettes)
        numberRecettes.appendChild(numberR)
        
        //const search = document.querySelector('input[type="text"]');

        // liste ingredient//
        function listeIngredients(recipes,keyword){
            recipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.ingredients;
        
            recipeCard.forEach(ingredient => {
            const listeIngredients = `${ingredient.ingredient}`;
            
        
            if (!ingredients.includes(listeIngredients)  )  {
                ingredients.push(listeIngredients);
                console.log(listeIngredients)

                const option = document.createElement('option');
                option.value = listeIngredients;
                option.text = listeIngredients;
                ingredientSelect.appendChild(option);
              //  ingredientSelect.prepend(option);
            }
            });
            });
        }
        
        // liste appliance//
        function listeAppliance(recipes){
            recipes.forEach(recipe => {
                const mediaGalery = mediaTemplate(recipe);
                const listeAppliance = mediaGalery.appliance;
                if (!appliances.includes(listeAppliance)) {
                appliances.push(listeAppliance);
            
                const option = document.createElement('option');
                option.value = listeAppliance;
                option.text = listeAppliance;
                applianceSelect.appendChild(option);
               // applianceSelect.prepend(option);
                }
            });
        }

        // liste ustensils//
        function listeUstensils(recipes) {
            recipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.ustensils;
            recipeCard.forEach(utensil => {
                const listeUstensils = `${utensil}`;
                // console.log(listeUstensils);
        
                if (!ustensils.includes(listeUstensils)) {
                ustensils.push(listeUstensils);
        
                const option = document.createElement('option');
                option.value = listeUstensils;
                option.text = listeUstensils;
                ustensilSelect.appendChild(option);
               // ustensilSelect.prepend(option);
                }
            });
            });
        }      

        

        listeIngredients(recipes)
        listeAppliance(recipes)
        listeUstensils(recipes)
        
        let select = [];
        console.log(select);
        //liste bouton filtre//
        let countButtoFiltre = 0
        function buttonFiltre() {
            countButtoFiltre++
            console.log(countButtoFiltre)
            const filtresSelected = document.getElementById("filtres-selected");
            const filtresSelectedButton = document.createElement("div");
            filtresSelectedButton.classList.add("filtresSelectedButton");
            filtresSelectedButton.setAttribute("data-index", select.length - 1);
           

            const currentFilterIndex = select.length - 1; // L'indice actuel du filtre

            const nameFiltresSelected = document.createElement("p");
            nameFiltresSelected.innerText = select[currentFilterIndex];

            const closeFiltresSelected = document.createElement("p");
            closeFiltresSelected.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                    <path d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;

            filtresSelectedButton.appendChild(nameFiltresSelected);
            filtresSelectedButton.appendChild(closeFiltresSelected);
            filtresSelected.appendChild(filtresSelectedButton);

           // Ajouter un attribut data à votre bouton contenant l'index de l'élément correspondant
          //  closeFiltresSelected.setAttribute("data-index", select.length - 1);
            console.log("filtre ajoute numero: "+ select.length + "   "+ select)
            console.log(select);

  closeFiltresSelected.addEventListener("click", closeModal);

  function closeModal() {
    countButtoFiltre--;

    // Retirer le filtre du tableau select en utilisant l'attribut data-index
    const indexToRemove = parseInt(filtresSelectedButton.getAttribute("data-index"));
    select.splice(indexToRemove, 1);

    filtresSelectedButton.remove(); // supprimer complètement le bouton des filtres sélectionnés
    recipeContainer.innerHTML = "";

    filtreRecherche(); // Appliquer les filtres restants
    console.log(select);
    console.log("filtre restant(s): "+select);

    if (countButtoFiltre <= 0) {
        countButtoFiltre = 0;
        select = [];
        filtreRecherche(); // Afficher toutes les recettes si tous les filtres sont supprimés
    }
      // Mettre à jour les index des boutons des filtres restants
  const filtresButtons = document.getElementsByClassName("filtresSelectedButton");
  for (let i = 0; i < filtresButtons.length; i++) {
    filtresButtons[i].setAttribute("data-index", i);
  }
}
        }

        function filtreRecherche() {
            const filteredRecipes = recipes.filter(recipe => {
                // Vérifie si les ingrédients de la recette contiennent la valeur sélectionnée
                const selectedIngredients = select.filter(value => ingredients.includes(value));
                const selectedAppliance = select.filter(value => appliances.includes(value));
                const selectedUtensil = select.filter(value => ustensils.includes(value));
                
                const recipeAppliances = Array.isArray(recipe.appliance) ? recipe.appliance : [recipe.appliance];
                const recipeUstensils = recipe.ustensils;
                const recipeIngredients = recipe.ingredients;
        
                if (selectedIngredients.length > 0) {
                    if (!selectedIngredients.every(value => recipeIngredients.some(ingredient => ingredient.ingredient.includes(value)))) {
                        return false;
                    }
                }
        
                if (selectedUtensil.length > 0) {
                    if (!selectedUtensil.every(value => recipeUstensils.some(utensil => utensil.includes(value)))) {
                        return false;
                    }
                }
        
                if (selectedAppliance.length > 0) {
                    if (!selectedAppliance.every(value => recipeAppliances.some(appliance => appliance.includes(value)))) {
                        return false;
                    }
                }
                
  
                return true;
               
            
            });

        
                    recipeContainer.innerHTML="";
                    let count = 0
        
         // Affiche les recettes filtrées
         filteredRecipes.forEach(recipe => {
            count++
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.getRecette();
            recipeContainer.appendChild(recipeCard);
          //  console.log(select)
        });
        
                // Met à jour les listes en fonction des recettes filtrées
                ingredients = [];
                appliances = [];
                ustensils = [];
        
                applianceSelect.innerHTML = ""; 
                ustensilSelect.innerHTML = "";
                ingredientSelect.innerHTML = "";
        
                listeIngredients(filteredRecipes);
                listeAppliance(filteredRecipes);
                listeUstensils(filteredRecipes);        
                
                const numberRecettes = document.getElementById('number-recettes'); 
                const numberR = document.createElement('p')
                const nameNumberRecettes = document.createElement('p')
                nameNumberRecettes.textContent =`${count}`;
                numberR.textContent="recettes";
                numberRecettes.innerHTML=""
                numberRecettes.appendChild(nameNumberRecettes)
                numberRecettes.appendChild(numberR)
                
        
        }

        ingredientSelect.addEventListener('change', function() {
        select.push(this.value);
        console.log("ingredient selectionner: "+select) 
        filtreRecherche();
        buttonFiltre();
        })    

        ustensilSelect.addEventListener('change', function() {
        select.push(this.value);
        console.log("ustensil selectionner: "+select)  
        filtreRecherche();
        buttonFiltre();
        });

       applianceSelect.addEventListener('change', function() {
        select.push(this.value);
        console.log("appliance selectionner: "+select) 
        filtreRecherche();
        buttonFiltre();
        });
        const search = document.getElementById('search-container');
        const searchInput = document.querySelector('input[type="text"]');
        const searchButton = document.querySelector('button[type="submit"]');
        filtresSelected = document.getElementById('filtres-selected');

        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = normalize(searchInput.value);
            console.log(searchTerm);
            const articleCard = document.querySelectorAll(".article");
            console.log(articleCard);
            filterElements(searchTerm, articleCard);
          });
          
          function normalize(text) {
            return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          }
          
          function filterElements(letters, elements){
            let count = 0;
            const lowerCaseLetters = letters.toLowerCase(); // Convertit la chaîne de recherche en minuscules
            if (lowerCaseLetters.length > 2) {
              for (let i = 0; i < elements.length; i++) {
                const elementText = normalize(elements[i].textContent.toLowerCase());
                if (elementText.includes(lowerCaseLetters)) {
                  elements[i].style.display = "block";
                  count++;
                } else {
                  elements[i].style.display = "none";
                }
              }
            } else if (lowerCaseLetters.length <3) {
              for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = "block";
                count++;
              }
            }
            const numberRecettes = document.getElementById('number-recettes');
            const numberR = document.createElement('p')
            const nameNumberRecettes = document.createElement('p')
            nameNumberRecettes.textContent =`${count}`;
            numberR.textContent="recettes";
            numberRecettes.innerHTML=""
            numberRecettes.appendChild(nameNumberRecettes)
            numberRecettes.appendChild(numberR)
          }


}


async function init() {
const { recipes } = await getPhotographers();
// Stockage des recettes initiales dans state
await  filterRecipes(recipes); 
}
init()