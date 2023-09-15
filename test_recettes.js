async function getJSON() {
    const res = await fetch('recipes.json')
    const resData = await res.json()
    return resData
 }
 async function getRecettesJSON() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

    const { recipes } = await getJSON()

    return { recipes }
}


 async function getRecettes(recipes) {

    const ingredientSelect = document.getElementById('tri-select1');
    const applianceSelect = document.getElementById('tri-select2');
    const ustensilSelect = document.getElementById('tri-select3');
  
    

    let ingredients = [];
    let appliances = [];
    let ustensils = [];
    console.log(ustensils)

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


        
          

// Déclarer la variable filteredRecipes en dehors de la fonction
let filteredRecipes = [];
let selectedIngredients = [];
let selectedAppliance= [];
let selectedUtensil= [];


ingredientSelect.addEventListener('change', function() {
    selectedIngredients.push(this.value);
    console.log("ingredient selectionner"+selectedIngredients)

  
    // Supprimer les recettes actuellement affichées
    recipeContainer.innerHTML = "";
  
    // Filtrer les recettes en fonction de tous les ingrédients sélectionnés
    filteredRecipes = recipes.filter(recipe => {
      const mediaGalery = mediaTemplate(recipe);
      const recipeCard = mediaGalery.ingredients;
      const recipeUstensils = mediaGalery.ustensils;
  
      // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
      const recipeIngredients = recipeCard.map(ingredient => ingredient.ingredient);
      return selectedIngredients.every(ingredient => recipeIngredients.includes(ingredient));
    });
  
    filteredRecipes.forEach(recipe => {
      const mediaGalery = mediaTemplate(recipe);
      const recipeCard = mediaGalery.getRecette();
      const recipeUstensils = mediaGalery.ustensils;
      const recipeAppliances= [mediaGalery.appliance];
      recipeContainer.appendChild(recipeCard);
       recipeUstensils.forEach((ustensil) => {
      
      const listeUstensils = `${ustensil}`;
      console.log("listeUstensils:"+listeUstensils)

      if (!ustensils.includes(listeUstensils)) {
        ustensils.push(listeUstensils);

        const option = document.createElement('option');
        option.value = listeUstensils;
        option.text = listeUstensils;
        ustensilSelect.appendChild(option);
      }       
       });       
       recipeAppliances.forEach((appliances) => {

        const listeAppliance = `${appliances}`;
        console.log("listeAppliance:"+listeAppliance)

        if (!appliances.includes(listeAppliance)) {
          appliances.push(listeAppliance);
  
          const option = document.createElement('option');
          option.value = listeAppliance;
          option.text = listeAppliance;
          applianceSelect.appendChild(option);
        }   
       });

    });
    ustensilSelect.innerHTML= "";
    applianceSelect.innerHTML="";
    console.log("")  ;
    // Actualiser la liste d'ingrédients avec les recettes affichées
    ingredientSelect.innerHTML = "";   
    ingredients = [];    
    listeIngredients(filteredRecipes);
  });

ustensilSelect.addEventListener('change', (event) => {
    const selectedUtensil = event.target.value;
    if (selectedUtensil !== '') {
      recipeContainer.innerHTML = '';
      ingredients=[];
      recipeAppliances=[];
      recipes.forEach((recipe) => {
        const mediaGalery = mediaTemplate(recipe);
        const utensils = mediaGalery.ustensils;
        const recipeIngredients = mediaGalery.ingredients;
        const recipeAppliances= [mediaGalery.appliance];
       // console.log(recipeAppliances)
        if (utensils.includes(selectedUtensil)) {
          const recipeCard = mediaGalery.getRecette();
          recipeContainer.appendChild(recipeCard);
          recipeIngredients.forEach(ingredient => {

            const listeIngredients = `${ingredient.ingredient}`;
      
            if (!ingredients.includes(listeIngredients)) {
              ingredients.push(listeIngredients);
      
              const option = document.createElement('option');
              option.value = listeIngredients;
              option.text = listeIngredients;
              ingredientSelect.appendChild(option);
            }
          });

                 
       recipeAppliances.forEach((appliances) => {

        const listeAppliance = `${appliances}`;
        console.log("listeAppliance:"+listeAppliance)

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
      ingredientSelect.innerHTML = "";
      ingredients.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient;
        option.text = ingredient;
        ingredientSelect.appendChild(option);
      });      
    }

  });



  applianceSelect.addEventListener('change', (event) => {
    const selectedAppliance = event.target.value;
    if (selectedAppliance !== '') {
      recipeContainer.innerHTML = '';
        ingredients=[];
      recipes.forEach((recipe) => {
        const mediaGalery = mediaTemplate(recipe);
        const appliance = mediaGalery.appliance;
        const recipeIngredients = mediaGalery.ingredients;
      
        if (appliance.includes(selectedAppliance)) {
          const recipeCard = mediaGalery.getRecette();
          const recipeUstensils = mediaGalery.ustensils;
          recipeContainer.appendChild(recipeCard);

          recipeIngredients.forEach(ingredient => {           
            const listeIngredients = `${ingredient.ingredient}`;
           // console.log(listeIngredients)
            
             if (!ingredients.includes(listeIngredients)) {
                ingredients.push(listeIngredients);
      
              const option = document.createElement('option');
              option.value = listeIngredients;
              option.text = listeIngredients;
              ingredientSelect.appendChild(option);
            }
          });  

          recipeUstensils.forEach((ustensil) => {
      
            const listeUstensils = `${ustensil}`;
           
      
            if (!ustensils.includes(listeUstensils)) {
              ustensils.push(listeUstensils);
              
              const option = document.createElement('option');
              option.value = listeUstensils;
              option.text = listeUstensils;
              ustensilSelect.appendChild(option);
              
            }       
             }); 
        }
       
      });
      
      ingredientSelect.innerHTML = "";
      ingredients.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient;
        option.text = ingredient;
        ingredientSelect.appendChild(option);
      });
    }

  });


  const searchInput = document.querySelector('input[type="text"]');
  const searchButton = document.querySelector('button[type="submit"]');
  filtresSelected = document.getElementById('filtres-selected');
//  const recipeContainer = document.getElementById('recipe-container');
//recipeContainer.innerHTML = ""

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
    const { recipes } = await getRecettesJSON();
  await  getRecettes(recipes); 
 }
 init()

