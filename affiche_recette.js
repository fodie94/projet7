 


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


 async function getRecettes(recipes) {

    const recipeContainer = document.getElementById('recipe-container');
   let count = 0;
recipes.forEach(recipe => {
    const mediaGalery = mediaTemplate(recipe);
    const recipeCard = mediaGalery.getRecette();
    recipeContainer.appendChild(recipeCard);
   count++;
})

const numberRecettes = document.getElementById('number-recettes'); 
const numberR = document.createElement('p')
const nameNumberRecettes = document.createElement('p')
nameNumberRecettes.textContent =`${count}`;
numberR.textContent="recettes";
numberRecettes.innerHTML=""
numberRecettes.appendChild(nameNumberRecettes)
numberRecettes.appendChild(numberR)

      const tri_select1 = document.getElementById('tri-select1');
      let ingredientsAffiches = []; // tableau pour stocker les ingrédients déjà affichés
      
      recipes.forEach(recipe => {
        const mediaGalery = mediaTemplate(recipe);
        const recipeCard = mediaGalery.ingredients;
      
        recipeCard.forEach(ingredient => {
        const  haut_ingredients = `${ingredient.ingredient}`;
       // console.log(haut_ingredients)

      if(!ingredientsAffiches.includes(haut_ingredients)) { // vérifier si l'ingrédient n'est pas déjà dans le tableau
          ingredientsAffiches.push(haut_ingredients); // ajouter l'ingrédient au tableau des ingrédients affichés

      const option = document.createElement('option');
      option.value = haut_ingredients;
      option.text = haut_ingredients;
      tri_select1.appendChild(option);
      }
    
      });
    });

    tri_select1.addEventListener('change', function(event) {
      const selectedIngredient = event.target.value;
      console.log(selectedIngredient)
      const filtresSelected = document.getElementById("filtres-selected");
      const filtresSelectedButton = document.createElement('div')
      filtresSelectedButton.classList.add('filtresSelectedButton')
      const nameFiltresSelected = document.createElement( 'p' )
      nameFiltresSelected.innerText = selectedIngredient;
      const closeFiltresSelected = document.createElement( 'p' )
      closeFiltresSelected.innerText = "X"
      filtresSelectedButton.appendChild(nameFiltresSelected)
      filtresSelectedButton.appendChild(closeFiltresSelected)
      filtresSelected.appendChild(filtresSelectedButton)
      closeFiltresSelected.addEventListener("click", closeModal);
      function closeModal() {
        filtresSelectedButton.style.display = "none";
        let count = 0;
        recipes.forEach(recipe => {
          const mediaGalery = mediaTemplate(recipe);
          const recipeCard = mediaGalery.getRecette();
       recipeContainer.appendChild(recipeCard);
       count++;
      })
      const numberRecettes = document.getElementById('number-recettes'); 
      const numberR = document.createElement('p')
      const nameNumberRecettes = document.createElement('p')
      nameNumberRecettes.textContent =`${count}`;
      numberR.textContent="recettes";
      numberRecettes.innerHTML=""
      numberRecettes.appendChild(nameNumberRecettes)
      numberRecettes.appendChild(numberR)
      }
      const recipeContainer = document.getElementById('recipe-container');
      recipeContainer.innerHTML = ""
      let newIngredientsList = [];
      let count = 0;
      recipes.forEach(recipe => {
        const mediaGalery = mediaTemplate(recipe);
        const recipeCard = mediaGalery.ingredients;
        recipeCard.forEach(ingredient => {
          if (ingredient.ingredient.includes(selectedIngredient)) {
            const card = mediaGalery.getRecette();
            count++;
            // console.log(card)
            recipeContainer.appendChild(card);
           const recipeCard2 = mediaGalery.ingredients; 
           recipeCard2.forEach(ingredient => {
              const  newIngredients = ingredient.ingredient;
              if(!newIngredientsList.includes(newIngredients)) { // vérifier si l'ingrédient n'est pas déjà dans le tableau
                newIngredientsList.push(newIngredients); 
               // console.log(newIngredients);
              }              
            }); 
            const numberRecettes = document.getElementById('number-recettes'); 
            const numberR = document.createElement('p')
            const nameNumberRecettes = document.createElement('p')
            nameNumberRecettes.textContent =`${count}`;
            numberR.textContent="recettes";
            numberRecettes.innerHTML=""
            numberRecettes.appendChild(nameNumberRecettes)
            numberRecettes.appendChild(numberR)       
          }
        });
    });
    tri_select1.innerHTML = "";
newIngredientsList.forEach(newIngredients => {
  const option = document.createElement('option');
  option.value = newIngredients;
  option.text = newIngredients;
  console.log(option)
  tri_select1.appendChild(option);


});

  });


      const tri_select2 = document.getElementById('tri-select2');
      recipes.forEach(recipe => {
        const mediaGalery = mediaTemplate(recipe);
        const recipeCard = mediaGalery.appliance;
        if(!ingredientsAffiches.includes(recipeCard)) { // vérifier si l'ingrédient n'est pas déjà dans le tableau
          ingredientsAffiches.push(recipeCard); // ajouter l'ingrédient au tableau des ingrédients affichés

        const option = document.createElement('option');
        option.value = recipeCard;
        option.text = recipeCard;
        tri_select2.appendChild(option);
        }
      });

      tri_select2.addEventListener('change', function(event) {
        const selectedIngredient = event.target.value;
        console.log(selectedIngredient)
        const filtresSelected = document.getElementById("filtres-selected");
        const filtresSelectedButton = document.createElement('div')
        filtresSelectedButton.classList.add('filtresSelectedButton')
        const nameFiltresSelected = document.createElement( 'p' )
        nameFiltresSelected.innerText = selectedIngredient;
        const closeFiltresSelected = document.createElement( 'p' )
        closeFiltresSelected.innerText = "X"
        filtresSelectedButton.appendChild(nameFiltresSelected)
        filtresSelectedButton.appendChild(closeFiltresSelected)
        filtresSelected.appendChild(filtresSelectedButton)
        closeFiltresSelected.addEventListener("click", closeModal);
        function closeModal() {
          filtresSelectedButton.style.display = "none";
          recipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.getRecette();
         recipeContainer.appendChild(recipeCard);
        })
        }
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = ""
        recipes.forEach(recipe => {
          const mediaGalery = mediaTemplate(recipe);
          const recipeCard = mediaGalery.appliance;
            if (recipeCard.includes(selectedIngredient)) {
              const card = mediaGalery.getRecette();
              console.log(card)
              recipeContainer.appendChild(card);
            }          
      });
    });

      const tri_select3 = document.getElementById('tri-select3');
      recipes.forEach(recipe => {
        const mediaGalery = mediaTemplate(recipe);
        const recipeCard = mediaGalery.ustensils;
        if(!ingredientsAffiches.includes(recipeCard)) { // vérifier si l'ingrédient n'est pas déjà dans le tableau
          ingredientsAffiches.push(recipeCard); // ajouter l'ingrédient au tableau des ingrédients affichés
          
        const option = document.createElement('option');
        option.value = recipeCard;
        option.text = recipeCard;
        tri_select3.appendChild(option);
      }
      });

      tri_select3.addEventListener('change', function(event) {
        const selectedIngredient = event.target.value;
        console.log(selectedIngredient)
        const filtresSelected = document.getElementById("filtres-selected");
        const filtresSelectedButton = document.createElement('div')
        filtresSelectedButton.classList.add('filtresSelectedButton')
        const nameFiltresSelected = document.createElement( 'p' )
        nameFiltresSelected.innerText = selectedIngredient;
        const closeFiltresSelected = document.createElement( 'p' )
        closeFiltresSelected.innerText = "x"
        filtresSelectedButton.appendChild(nameFiltresSelected)
        filtresSelectedButton.appendChild(closeFiltresSelected)
        filtresSelected.appendChild(filtresSelectedButton)
        closeFiltresSelected.addEventListener("click", closeModal);
        function closeModal() {
          filtresSelectedButton.style.display = "none";
          recipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.getRecette();
         recipeContainer.appendChild(recipeCard);
        })
        }
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = ""
        recipes.forEach(recipe => {
          const mediaGalery = mediaTemplate(recipe);
          const recipeCard = mediaGalery.ustensils;
          recipeCard.forEach(ustensil => {
            if (ustensil.includes(selectedIngredient)) {
              const card = mediaGalery.getRecette();
              console.log(card)
              recipeContainer.appendChild(card);
            }
          });
      });
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
    const { recipes } = await getPhotographers();
  await  getRecettes(recipes); 
 }
 init()

