let state = {    
    keyword: '',
    filterIngredients: [],
    filterAppliance: [],
    filterUstensils: [],
    recipes: [] // Ajout de cette propriété pour stocker les recettes filtrées
  };
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
let count = 0;
recipes.forEach(recipe => {
    const mediaGalery = mediaTemplate(recipe);
    const recipeCard = mediaGalery.getRecette();
    recipeContainer.appendChild(recipeCard);
    count++
})
        
        const numberRecettes = document.getElementById('number-recettes'); 
        const numberR = document.createElement('p')
        const nameNumberRecettes = document.createElement('p')
        nameNumberRecettes.textContent =`${count}`;
        numberR.textContent="recettes";
        numberRecettes.innerHTML=""
        numberRecettes.appendChild(nameNumberRecettes)
        numberRecettes.appendChild(numberR)
        
        // liste ingredient//
        function listeIngredients(recipes){
            recipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.ingredients;
        
            recipeCard.forEach(ingredient => {
            const listeIngredients = `${ingredient.ingredient}`;
        
            if (!ingredients.includes(listeIngredients)) {
                ingredients.push(listeIngredients);
        
                const option = document.createElement('option');
                option.value = listeIngredients;
                option.text = listeIngredients;
                ingredientSelect.appendChild(option);
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
                }
            });
            });
        }      
        

        listeIngredients(recipes)
        listeAppliance(recipes)
        listeUstensils(recipes)

        let selectedIngredients = [];
        let selectedAppliance= [];
        let selectedUtensil= [];
        let filteredRecipes = [];
        // console.log(filteredRecipes)

        ingredientSelect.addEventListener('change', function() {
        selectedIngredients.push(this.value);
        console.log("ingredient selectionner: "+selectedIngredients)
    
        let filteredRecipes = []; // Ajout de cette variable pour stocker les recettes filtrées
        
        // Supprimer les recettes actuellement affichées
        recipeContainer.innerHTML = "";
        
        // Filtrer les recettes en fonction de tous les ingrédients sélectionnés
         // Mise à jour de filteredRecipes
            filteredRecipes = recipes.filter(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const ingredientsCard = mediaGalery.ingredients;
        
            // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
            const recipeIngredients = ingredientsCard.map(ingredient => ingredient.ingredient);
          
            return(
            selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient)) 
            )
        });

        let count = 0;
        filteredRecipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.getRecette(); 
            console.log(recipeCard)            
            recipeContainer.appendChild(recipeCard); 
            count++
            const ustensilsCard = mediaGalery.ustensils;
            ustensilsCard.forEach((ustensil) => { 

            const listeUstensils = `${ustensil}`;
            console.log("listeUstensils: "+listeUstensils)
        
            if (!ustensils.includes(listeUstensils)) {
                ustensils.push(listeUstensils);
        
                const option = document.createElement('option');
                option.value = listeUstensils;
                option.text = listeUstensils;
                ustensilSelect.appendChild(option);
            }       
                }); 

                const appliancesCard = mediaGalery.appliance;
                if (Array.isArray(appliancesCard)) {
                appliancesCard.forEach((ustensil) => {
                const listeAppliance = `${ustensil}`;
                console.log("listeAppliance: " + listeAppliance);
            
                if (!appliances.includes(listeAppliance)) {
                    appliances.push(listeAppliance);
            
                    const option = document.createElement('option');
                    option.value = listeAppliance;
                    option.text = listeAppliance;
                    applianceSelect.appendChild(option);
                }
                });
            } 

        });

        // Actualisation de state
        state.recipes = filteredRecipes;

        // Actualiser la liste d'ingrédients avec les recettes affichées
        ingredientSelect.innerHTML = "";   
        ingredients = [];    
        listeIngredients(filteredRecipes);

        ustensilSelect.innerHTML = "";   
        ustensils = [];    
        listeUstensils(filteredRecipes);

        applianceSelect.innerHTML = "";   
        appliances = [];    
        listeAppliance(filteredRecipes);

        console.log("")
        const numberRecettes = document.getElementById('number-recettes'); 
        const numberR = document.createElement('p')
        const nameNumberRecettes = document.createElement('p')
        nameNumberRecettes.textContent =`${count}`;
        numberR.textContent="recettes";
        numberRecettes.innerHTML=""
        numberRecettes.appendChild(nameNumberRecettes)
        numberRecettes.appendChild(numberR)
        });
    

        ustensilSelect.addEventListener('change', function() {
        selectedUtensil.push(this.value);
        console.log("ustensil selectionner: "+selectedUtensil)        
        
        // Supprimer les recettes actuellement affichées
        recipeContainer.innerHTML = "";
        
        // Filtrer les recettes en fonction de tous les ingrédients sélectionnés
        filteredRecipes = recipes.filter(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const ustensilsCard = mediaGalery.ustensils;

        
            // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
            const recipeUstensils = ustensilsCard.map(ustensil => ustensil);
            return (
            selectedUtensil.every(ustensil => recipeUstensils.includes(ustensil))
            )                       
                    
        });
        let count = 0;
        filteredRecipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.getRecette();
            console.log(recipeCard)            
            recipeContainer.appendChild(recipeCard);
            count++
            const ingredientsCard = mediaGalery.ingredients;
            ingredientsCard.forEach((ingredient) => { 

            const listeIngredients = `${ingredient.ingredient}`;
            console.log("listeIngredients: "+listeIngredients)
        
            if (!ingredients.includes(listeIngredients)) {
                ingredients.push(listeIngredients);
        
                const option = document.createElement('option');
                option.value = listeIngredients;
                option.text = listeIngredients;
                ingredientSelect.appendChild(option);
            }      
                }); 

                const appliancesCard = mediaGalery.appliance;
                if (Array.isArray(appliancesCard)) {
                appliancesCard.forEach((appliance) => {
                const listeAppliance = `${appliance}`;
                console.log("listeAppliance: " + listeAppliance);
            
                if (!appliances.includes(listeAppliance)) {
                    appliances.push(listeAppliance);
            
                    const option = document.createElement('option');
                    option.value = listeAppliance;
                    option.text = listeAppliance;
                    applianceSelect.appendChild(option);
                }
                });
            } 

        });

        // Actualisation de state
    state.recipes = filteredRecipes;

        // Actualiser la liste d'ingrédients avec les recettes affichées
        ustensilSelect.innerHTML = "";   
        ustensils = [];    
        listeUstensils(filteredRecipes);

        ingredientSelect.innerHTML = "";   
        ingredients = [];    
        listeIngredients(filteredRecipes);

        applianceSelect.innerHTML = "";   
        appliances = [];    
        listeAppliance(filteredRecipes);

        console.log("")
        const numberRecettes = document.getElementById('number-recettes'); 
        const numberR = document.createElement('p')
        const nameNumberRecettes = document.createElement('p')
        nameNumberRecettes.textContent =`${count}`;
        numberR.textContent="recettes";
        numberRecettes.innerHTML=""
        numberRecettes.appendChild(nameNumberRecettes)
        numberRecettes.appendChild(numberR)
        });

        applianceSelect.addEventListener('change', function() {
        selectedAppliance.push(this.value);
        console.log("appliance selectionner: "+selectedAppliance)
    
        
        // Supprimer les recettes actuellement affichées
        recipeContainer.innerHTML = "";
        
        // Filtrer les recettes en fonction de tous les ingrédients sélectionnés
        filteredRecipes = recipes.filter(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const appliancesCard = mediaGalery.appliance;

            return (
            selectedAppliance.every(appliances => appliancesCard.includes(appliances)) 
            ) 
            
        });
        let count = 0;
        filteredRecipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.getRecette(); 
            console.log(recipeCard)            
            recipeContainer.appendChild(recipeCard);
            count++
            const ustensilsCard = mediaGalery.ustensils;
            ustensilsCard.forEach((ustensil) => { 

            const listeUstensils = `${ustensil}`;
            // console.log("listeUstensils: "+listeUstensils)
        
            if (!ustensils.includes(listeUstensils)) {
                ustensils.push(listeUstensils);
        
                const option = document.createElement('option');
                option.value = listeUstensils;
                option.text = listeUstensils;
                ustensilSelect.appendChild(option);
            }       
                }); 

                const ingredientsCard = mediaGalery.ingredients;
                ingredientsCard.forEach((ingredient) => { 

                const listeIngredients = `${ingredient.ingredient}`;
                // console.log("listeIngredients: "+listeIngredients)
            
                if (!ingredients.includes(listeIngredients)) {
                    ingredients.push(listeIngredients);
            
                    const option = document.createElement('option');
                    option.value = listeIngredients;
                    option.text = listeIngredients;
                    ingredientSelect.appendChild(option);
                }      
                }); 

        });

        // Actualisation de state
    state.recipes = filteredRecipes;

        // Actualiser la liste d'ingrédients avec les recettes affichées
        applianceSelect.innerHTML = "";   
        appliances = [];    
        listeAppliance(filteredRecipes);

        ustensilSelect.innerHTML = "";   
        ustensils = [];    
        listeUstensils(filteredRecipes);

        ingredientSelect.innerHTML = "";   
        ingredients = [];    
        listeIngredients(filteredRecipes);

        console.log("")

        const numberRecettes = document.getElementById('number-recettes'); 
        const numberR = document.createElement('p')
        const nameNumberRecettes = document.createElement('p')
        nameNumberRecettes.textContent =`${count}`;
        numberR.textContent="recettes";
        numberRecettes.innerHTML=""
        numberRecettes.appendChild(nameNumberRecettes)
        numberRecettes.appendChild(numberR)
        });

        const searchInput = document.querySelector('input[type="text"]');
        const searchButton = document.querySelector('button[type="submit"]');
        filtresSelected = document.getElementById('filtres-selected');

        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = searchInput.value;
            console.log(searchTerm);
            const articleCard = document.querySelectorAll(".article");
            console.log(articleCard);
            filterElements(searchTerm, articleCard);
          });
          
          function filterElements(letters, elements){
            let count = 0;
            if (letters.length > 2) {
              for (let i = 0; i < elements.length; i++) {
                if (elements[i].textContent.toLowerCase().includes(letters)) {
                  elements[i].style.display = "block";
                  count++;
                } else {
                  elements[i].style.display = "none";
                }
              }
            } else if (letters.length <3) {
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
await  filterRecipes(recipes); 
}
init()