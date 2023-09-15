  
async function getJSON() {
const res = await fetch('recipes.json')
const resData = await res.json()
return resData
}

async function getPhotographers() {

const { recipes } = await getJSON()

return { recipes }

}



// page js
async function filterRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-container');

    const wrapper = document.querySelector(".wrapper"),
        selectBtn = wrapper.querySelector(".select-btn"),
        searchInp = wrapper.querySelector("input"),
        option = wrapper.querySelector(".option");

    let ingredients = [];

    recipes.forEach(recipe => {
        const mediaGallery = mediaTemplate(recipe);
        const recipeCard = mediaGallery.getRecette();
        recipeContainer.appendChild(recipeCard);
    });

    function listeIngredients(recipes) {
        recipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.ingredients;

            recipeCard.forEach(ingredient => {
                const listeIngredients = `${ingredient.ingredient}`;

                if (!ingredients.includes(listeIngredients)) {
                    ingredients.push(listeIngredients);

                    let li = document.createElement("li");
                    li.textContent = listeIngredients;
                    li.addEventListener("click", function () {
                        updateName.call(this);
                        filtreRecherche();
                    });
                    option.appendChild(li);
                }
            });
        });
    }

    function updateName() {
        selectBtn.firstElementChild.innerText = this.innerText;

        wrapper.classList.remove("active"); // Hide the options when a selection is made

        filtreRecherche();
    }

    function normalize(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    searchInp.addEventListener("keyup", () => {
        const searchedVal = normalize(searchInp.value.toLowerCase());
        console.log(searchedVal)

        const filteredIngredients = ingredients.filter(data => {
            const normalizedData = normalize(data.toLowerCase());
            return normalizedData.includes(searchedVal);
        });

        option.innerHTML = ""; // Clear previous options

        if (filteredIngredients.length === 0) {
            option.innerHTML = "<li>No results found</li>";
        } else {
            filteredIngredients.forEach(data => {
                let li = document.createElement("li");
                li.textContent = data;
                li.addEventListener("click", function () {
                    updateName.call(this);

                });
                option.appendChild(li);
            });
        }
    });

    selectBtn.addEventListener("click", () => {
        wrapper.classList.toggle("active");
        // option.innerHTML = ""; // Clear previous options
        listeIngredients(recipes);
        console.log(selectBtn)
    });

    function filtreRecherche() {
        const selectedIngredient = selectBtn.firstElementChild.innerText;

        const filteredRecipes = recipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient);

            return recipeIngredients.includes(selectedIngredient);
        });

        recipeContainer.innerHTML = "";

        // Affiche les recettes filtrées
        filteredRecipes.forEach(recipe => {
            const mediaGalery = mediaTemplate(recipe);
            const recipeCard = mediaGalery.getRecette();
            recipeContainer.appendChild(recipeCard);
        });

        // Met à jour les listes en fonction des recettes filtrées
        ingredients = [];
        option.innerHTML = "";
        listeIngredients(filteredRecipes);
    }

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
    await filterRecipes(recipes);
}

init();

