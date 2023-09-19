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

    let ingredients = [];
    let appliances = [];
    let ustensils = [];
    let select = [];
    // Déclarez une variable globale pour stocker les recettes actuellement affichées
let filteredRecipes = recipes;

    

    const toggleButtonIngredient = document.getElementById('toggleButtonIngredient');
    const ingredientsContainer = document.getElementById('ingredientsContainer'); 
    const ingredientList =  document.getElementById('ingredientList');
    const ingredientInput = document.getElementById('ingredientInput');
    const ingrédientSelect = document.getElementById('ingrédientSelect');  
    const closeIngredient = document.getElementById('closeIngredient'); 

   
    const toggleButtonAppliance = document.getElementById('toggleButtonAppliance');
    const applianceContainer = document.getElementById('applianceContainer');
    const applianceList =  document.getElementById('applianceList');
    const applianceInput = document.getElementById('applianceInput');
    const applianceSelect = document.getElementById('applianceSelect');
    const closeAppliance = document.getElementById('closeAppliance'); 

    
    const toggleButtonUstensil = document.getElementById('toggleButtonUstensil');
    const ustensilContainer = document.getElementById('ustensilContainer');
    const ustensilList =  document.getElementById('ustensilList');
    const ustensilInput = document.getElementById('ustensilInput');
    const ustensilSelect = document.getElementById('ustensilSelect');
    const closeUstensil = document.getElementById('closeUstensil'); 
  
    const recipeContainer = document.getElementById('recipe-container');


  
    recipes.forEach(recipe => {
      const mediaGalery = mediaTemplate(recipe);
      const recipeCard = mediaGalery.getRecette();
      recipeContainer.appendChild(recipeCard);
    })
  
        // Liste des ingrédients
        function listeIngredients(recipes) {
          recipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.ingredients;
        
            recipeCard.forEach(ingredient => {
              const listeIngredients = `${ingredient.ingredient}`;
        
              if (!ingredients.includes(listeIngredients)) {
                ingredients.push(listeIngredients);
                const listItem = document.createElement('li');
                listItem.textContent = listeIngredients;
                ingredientList.appendChild(listItem);
              }
            });
          });
        }
        listeIngredients(recipes);
        toggleButtonIngredient.addEventListener('click', () => {
          if (ingredientsContainer.style.display === 'none' || ingredientsContainer.style.display === '') {
              ingredientsContainer.style.display = 'block';
            
          } else {
              ingredientsContainer.style.display = 'none';
          }
        });

        ingredientInput.addEventListener("keyup", () => {
          function normalize(text) {
              return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          }
          const searchedVal = normalize(ingredientInput.value.toLowerCase());
          console.log(searchedVal)

          closeIngredient.style.display = 'block'; 
          closeIngredient.addEventListener('click', () => {
              ingredientInput.value = "";
         closeIngredient.style.display = 'none'; 
         ingredientList.innerHTML = ""; // Efface la liste actuelle
         ingredients.forEach(data => {
             const listItem = document.createElement('li');
             listItem.textContent = data;
             ingredientList.appendChild(listItem);
          });
      });
             
  
          const filteredIngredients = ingredients.filter(data => {
              const normalizedData = normalize(data.toLowerCase());
              return normalizedData.includes(searchedVal);
          });
  
          ingredientList.innerHTML = ""; // Clear previous options
  
          if (filteredIngredients.length === 0) {
              ingredientList.innerHTML = "<li>No results found</li>";
          } else {
              filteredIngredients.forEach(data => {
                  const listItem = document.createElement('li');
            listItem.textContent = data;
            ingredientList.appendChild(listItem);
              });
          }
      });
// Ajoutez un gestionnaire d'événements au conteneur de la liste ul pour les ingrédients
ingredientList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const selectedIngredient = event.target.textContent;
    ingrédientSelect.innerText =  selectedIngredient;
    // Filtrer les recettes en fonction de l'ingrédient sélectionné
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())
      )
    );

    updateLists(filteredRecipes);
    displayFilteredRecipes(filteredRecipes);
  }
});

          
        // liste appliance//
        function listeAppliance(recipes){
                recipes.forEach(recipe => {
                    const mediaGalery = mediaTemplate(recipe);
                    const listeAppliance = mediaGalery.appliance;

                    if (!appliances.includes(listeAppliance)) {
                    appliances.push(listeAppliance);

                    const listItem = document.createElement('li');
              listItem.textContent = listeAppliance;
              applianceList.appendChild(listItem);
                    }
                });
        }
        listeAppliance(recipes);
        toggleButtonAppliance.addEventListener('click', () => {
              if (applianceContainer.style.display === 'none' || applianceContainer.style.display === '') {
                  applianceContainer.style.display = 'block';
                
              } else {
                  applianceContainer.style.display = 'none';
              }
        });
        applianceInput.addEventListener("keyup", () => {
          function normalize(text) {
              return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          }
          const searchedVal = normalize(applianceInput.value.toLowerCase());
          console.log(searchedVal)
        
        
          closeAppliance.style.display = 'block'; 
          closeAppliance.addEventListener('click', () => {
              applianceInput.value = "";
              closeAppliance.style.display = 'none'; 
         applianceList.innerHTML = ""; // Efface la liste actuelle
         appliances.forEach(data => {
             const listItem = document.createElement('li');
             listItem.textContent = data;
             applianceList.appendChild(listItem);
          });
      });
  
          const filteredAppliance = appliances.filter(data => {
              const normalizedData = normalize(data.toLowerCase());
              return normalizedData.includes(searchedVal);
          });
  
          applianceList.innerHTML = ""; // Clear previous options
  
          if (filteredAppliance.length === 0) {
              applianceList.innerHTML = "<li>No results found</li>";
          } else {
              filteredAppliance.forEach(data => {
                  const listItem = document.createElement('li');
                  listItem.textContent = data;
                  applianceList.appendChild(listItem);

              });
          }
      });
      applianceList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const selectedAppliance = event.target.textContent;
          applianceSelect.innerText = selectedAppliance;
          // Filtrer les recettes en fonction de l'appareil sélectionné
          filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.appliance.toLowerCase().includes(selectedAppliance.toLowerCase())
          );
      
          updateLists(filteredRecipes);
          displayFilteredRecipes(filteredRecipes);
          console.log(filterRecipes)
        }
      });


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
            
                            const listItem = document.createElement('li');
                            listItem.textContent = listeUstensils;
                            ustensilList.appendChild(listItem);
                            }
                        });
                        });
        }    
        listeUstensils(recipes);   
        toggleButtonUstensil.addEventListener('click', () => {
          if (ustensilContainer.style.display === 'none' || ustensilContainer.style.display === '') {
              ustensilContainer.style.display = 'block';
            
          } else {
              ustensilContainer.style.display = 'none';
          }
        });
        ustensilInput.addEventListener("keyup", () => {
          function normalize(text) {
              return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          }
          const searchedVal = normalize(ustensilInput.value.toLowerCase());
          console.log(searchedVal)
         
          closeUstensil.style.display = 'block'; 
          closeUstensil.addEventListener('click', () => {
              ustensilInput.value = "";
              closeUstensil.style.display = 'none'; 
         ustensilList.innerHTML = ""; // Efface la liste actuelle
         ustensils.forEach(data => {
             const listItem = document.createElement('li');
             listItem.textContent = data;
             ustensilList.appendChild(listItem);
          });
      });

          const filteredUstensil = ustensils.filter(data => {
              const normalizedData = normalize(data.toLowerCase());
              return normalizedData.includes(searchedVal);
          });
  
          ustensilList.innerHTML = ""; // Clear previous options
  
          if (filteredUstensil.length === 0) {
              ustensilList.innerHTML = "<li>No results found</li>";
          } else {
              filteredUstensil.forEach(data => {
                  const listItem = document.createElement('li');
                  listItem.textContent = data;
                  ustensilList.appendChild(listItem);
              });
          }
      });
       // Ajoutez un gestionnaire d'événements au conteneur de la liste ul
       ustensilList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const selectedUtensil = event.target.textContent;
          ustensilSelect.innerText = selectedUtensil;
          // Filtrer les recettes en fonction de l'ustensile sélectionné
          filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.ustensils.some(utensil =>
              utensil.toLowerCase().includes(selectedUtensil.toLowerCase())
            )
          );
      
          updateLists(filteredRecipes);
          displayFilteredRecipes(filteredRecipes);
        }
      });
      


      function updateLists(filteredRecipes) {
        ingredients = [];
        appliances = [];
        ustensils = [];
        
        ingredientList.innerHTML = "";
        applianceList.innerHTML = "";
        ustensilList.innerHTML = "";
    
        listeIngredients(filteredRecipes);
        listeAppliance(filteredRecipes);
        listeUstensils(filteredRecipes);
      }
    
      // Function to display filtered recipes
      function displayFilteredRecipes(filteredRecipes) {
        recipeContainer.innerHTML = '';

        filteredRecipes.forEach(recipe => {
          const mediaGalery = mediaTemplate(recipe);
          const recipeCard = mediaGalery.getRecette();
          recipeContainer.appendChild(recipeCard);
        });
      }

      

        
//           // Récupérez l'élément d'entrée de texte
const searchInput = document.getElementById('search-input');
const buttonSearchInput = document.getElementById('loucheSubmit');
// Ajoutez un gestionnaire d'événements input
searchInput.addEventListener('input', function () {
  const searchText = searchInput.value.toLowerCase(); // Texte entré dans la barre de recherche en minuscules

  // Filtrer les recettes en fonction du texte entré parmi les recettes déjà affichées
  const searchFilteredRecipes = filteredRecipes.filter(recipe => {
    // Vous pouvez ajuster cette logique de filtrage selon vos besoins
    return (
      recipe.name.toLowerCase().includes(searchText) || // Vérifie le nom de la recette
      recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) || // Vérifie les ingrédients
      recipe.appliance.toLowerCase().includes(searchText) || // Vérifie l'appareil
      recipe.ustensils.some(utensil => utensil.toLowerCase().includes(searchText)) // Vérifie les ustensiles
    );
  });


   filteredRecipes = searchFilteredRecipes;

  updateLists(searchFilteredRecipes);
  // Affichez les recettes filtrées dans le conteneur
  displayFilteredRecipes(searchFilteredRecipes); 
});   
  }


async function init() {
    const { recipes } = await getPhotographers();
  await  filterRecipes(recipes); 
 }
 init()