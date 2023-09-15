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
  
    recipes.forEach(recipe => {
      const mediaGalery = mediaTemplate(recipe);
      const recipeCard = mediaGalery.getRecette();
      recipeContainer.appendChild(recipeCard);
    })
  
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

          ingredientSelect.addEventListener('change', function() {
            selectedIngredients.push(this.value);
            console.log("ingredient selectionner: "+selectedIngredients)
        
          
            // Supprimer les recettes actuellement affichées
            recipeContainer.innerHTML = "";
          
            // Filtrer les recettes en fonction de tous les ingrédients sélectionnés
            filteredRecipes = recipes.filter(recipe => {
              const mediaGalery = mediaTemplate(recipe);
              const ingredientsCard = mediaGalery.ingredients;
              const ustensilsCard = mediaGalery.ustensils; 
              const appliancesCard = mediaGalery.appliance;

          
              // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
              const recipeIngredients = ingredientsCard.map(ingredient => ingredient.ingredient);
              const recipeUstensils = ustensilsCard.map(ustensil => ustensil);
              return(
                
              selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient)) &&
              selectedUtensil.every(ustensil => recipeUstensils.includes(ustensil)) ||

              selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient)) &&
              selectedAppliance.every(appliances => appliancesCard.includes(appliances))

              )
            });

          
            filteredRecipes.forEach(recipe => {
              const mediaGalery = mediaTemplate(recipe);
              const recipeCard = mediaGalery.getRecette();             
              recipeContainer.appendChild(recipeCard); 
              
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
              const ingredientsCard = mediaGalery.ingredients;
              const appliancesCard = mediaGalery.appliance;
          
              // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
              const recipeUstensils = ustensilsCard.map(ustensil => ustensil);
              const recipeIngredients = ingredientsCard.map(ingredient => ingredient.ingredient);
              return (

              selectedUtensil.every(ustensil => recipeUstensils.includes(ustensil)) &&
              selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient))||

              selectedUtensil.every(ustensil => recipeUstensils.includes(ustensil)) &&
              selectedAppliance.every(appliances => appliancesCard.includes(appliances)) //||

              // selectedUtensil.every(ustensil => recipeUstensils.includes(ustensil)) &&
              // selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient)) &&
              // selectedAppliance.every(appliances => appliancesCard.includes(appliances))

              )
                        
                     
            });
          
            filteredRecipes.forEach(recipe => {
              const mediaGalery = mediaTemplate(recipe);
              const recipeCard = mediaGalery.getRecette();             
              recipeContainer.appendChild(recipeCard);
              
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
              const ingredientsCard = mediaGalery.ingredients;
              const ustensilsCard = mediaGalery.ustensils; 
             
          
              // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
              const recipeIngredients = ingredientsCard.map(ingredient => ingredient.ingredient);
              const recipeUstensils = ustensilsCard.map(ustensil => ustensil);
              return (
                selectedAppliance.every(appliances => appliancesCard.includes(appliances)) &&
                selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient))||

                selectedAppliance.every(appliances => appliancesCard.includes(appliances)) &&
                selectedUtensil.every(ustensil => recipeUstensils.includes(ustensil)) //||
                
                // selectedAppliance.every(appliances => appliancesCard.includes(appliances)) &&
                // selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient)) &&
                // selectedUtensil.every(ustensil => recipeUstensils.includes(ustensil))
              ) 
    
            });
          
            filteredRecipes.forEach(recipe => {
              const mediaGalery = mediaTemplate(recipe);
              const recipeCard = mediaGalery.getRecette();             
              recipeContainer.appendChild(recipeCard);
              
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

            });

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
          });
   
  }


async function init() {
    const { recipes } = await getPhotographers();
  await  filterRecipes(recipes); 
 }
 init()