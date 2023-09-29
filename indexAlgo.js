import mediaTemplate from "./recettes.js";

async function getJSON() {
  const res = await fetch("recipes.json");
  const resData = await res.json();
  return resData;
}
async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

  const { recipes } = await getJSON();

  return { recipes };
}

async function filterRecipes(recipes) {
  const recipeContainer = document.getElementById("recipe-container");
  const searchInput = document.querySelector('input[type="text"]');
  // const filtresSelected = document.getElementById("filtres-selected");

  const toggleButtonIngredient = document.getElementById(
    "toggleButtonIngredient"
  );
  const ingredientsContainer = document.getElementById("ingredientsContainer");
  const ingredientList = document.getElementById("ingredientList");
  const ingredientInput = document.getElementById("ingredientInput");
  const ingrédientSelect = document.getElementById("ingrédientSelect");
  const closeIngredient = document.getElementById("closeIngredient");

  const toggleButtonAppliance = document.getElementById(
    "toggleButtonAppliance"
  );
  const applianceContainer = document.getElementById("applianceContainer");
  const applianceList = document.getElementById("applianceList");
  const applianceInput = document.getElementById("applianceInput");
  const applianceSelect = document.getElementById("applianceSelect");
  const closeAppliance = document.getElementById("closeAppliance");

  const toggleButtonUstensil = document.getElementById("toggleButtonUstensil");
  const ustensilContainer = document.getElementById("ustensilContainer");
  const ustensilList = document.getElementById("ustensilList");
  const ustensilInput = document.getElementById("ustensilInput");
  const ustensilSelect = document.getElementById("ustensilSelect");
  const closeUstensil = document.getElementById("closeUstensil");

  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  let select = [];
  console.log(select);

  let count = 0;
  recipes.forEach((recipe) => {
    count++;
    const mediaGalery = mediaTemplate(recipe);
    const recipeCard = mediaGalery.getRecette();
    recipeContainer.appendChild(recipeCard);
    updateNumberRecettes(count);
  });

  // Liste des ingrédients
  function listeIngredients(recipes) {
    recipes.forEach((recipe) => {
      const mediaGalery = mediaTemplate(recipe);
      const recipeCard = mediaGalery.ingredients;

      recipeCard.forEach((ingredient) => {
        const listeIngredients = `${ingredient.ingredient}`;

        if (!ingredients.includes(listeIngredients)) {
          ingredients.push(listeIngredients);
          const listItem = document.createElement("li");
          listItem.textContent = listeIngredients;
          ingredientList.appendChild(listItem);
        }
      });
    });
  }
  listeIngredients(recipes);

  toggleButtonIngredient.addEventListener("click", () => {
    if (
      ingredientsContainer.style.display === "none" ||
      ingredientsContainer.style.display === ""
    ) {
      ingredientsContainer.style.display = "block";
    } else {
      ingredientsContainer.style.display = "none";
    }
  });

  ingredientInput.addEventListener("keyup", () => {
    function normalize(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const searchedVal = normalize(ingredientInput.value.toLowerCase());
    console.log(searchedVal);

    closeIngredient.style.display = "block";
    closeIngredient.addEventListener("click", () => {
      ingredientInput.value = "";
      closeIngredient.style.display = "none";
      ingredientList.innerHTML = ""; // Efface la liste actuelle
      ingredients.forEach((data) => {
        const listItem = document.createElement("li");
           // Ajouter un style CSS pour supprimer les puces
           listItem.style.listStyle = 'none';
        listItem.textContent = data;
        ingredientList.appendChild(listItem);
      });
    });

    const filteredIngredients = ingredients.filter((data) => {
      const normalizedData = normalize(data.toLowerCase());
      return normalizedData.includes(searchedVal);
    });

    ingredientList.innerHTML = ""; // Clear previous options

    if (filteredIngredients.length === 0) {
      ingredientList.innerHTML = "<li>No results found</li>";
    } else {
      filteredIngredients.forEach((data) => {
        const listItem = document.createElement("li");
        listItem.textContent = data;
        ingredientList.appendChild(listItem);
      });
    }
  });
  // Ajoutez un gestionnaire d'événements au conteneur de la liste ul
  ingredientList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const selectedIngredient = event.target.textContent;
      console.log(selectedIngredient);
      ingrédientSelect.innerText = selectedIngredient;

      // Vérifiez si l'ingrédient est déjà dans le tableau select
      if (!select.includes(selectedIngredient)) {
        select.push(selectedIngredient);
      }
    }
    filtreRecherche();
    buttonFiltre();
  });

  // liste appliance//
  function listeAppliance(recipes) {
    recipes.forEach((recipe) => {
      const mediaGalery = mediaTemplate(recipe);
      const listeAppliance = mediaGalery.appliance;

      if (!appliances.includes(listeAppliance)) {
        appliances.push(listeAppliance);

        const listItem = document.createElement("li");
           // Ajouter un style CSS pour supprimer les puces
           listItem.style.listStyle = 'none';
        listItem.textContent = listeAppliance;
        applianceList.appendChild(listItem);
      }
    });
  }
  listeAppliance(recipes);

  toggleButtonAppliance.addEventListener("click", () => {
    if (
      applianceContainer.style.display === "none" ||
      applianceContainer.style.display === ""
    ) {
      applianceContainer.style.display = "block";
    } else {
      applianceContainer.style.display = "none";
    }
  });

  applianceInput.addEventListener("keyup", () => {
    function normalize(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const searchedVal = normalize(applianceInput.value.toLowerCase());
    console.log(searchedVal);

    closeAppliance.style.display = "block";
    closeAppliance.addEventListener("click", () => {
      applianceInput.value = "";
      closeAppliance.style.display = "none";
      applianceList.innerHTML = ""; // Efface la liste actuelle
      appliances.forEach((data) => {
        const listItem = document.createElement("li");
        listItem.textContent = data;
        applianceList.appendChild(listItem);
      });
    });

    const filteredAppliance = appliances.filter((data) => {
      const normalizedData = normalize(data.toLowerCase());
      return normalizedData.includes(searchedVal);
    });

    applianceList.innerHTML = ""; // Clear previous options

    if (filteredAppliance.length === 0) {
      applianceList.innerHTML = "<li>No results found</li>";
    } else {
      filteredAppliance.forEach((data) => {
        const listItem = document.createElement("li");
        listItem.textContent = data;
        applianceList.appendChild(listItem);
      });
    }
  });

  // Ajoutez un gestionnaire d'événements au conteneur de la liste ul
  applianceList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const selectedAppliance = event.target.textContent;
      console.log(selectedAppliance);
      applianceSelect.innerText = selectedAppliance;

      // Vérifiez si l'ingrédient est déjà dans le tableau select
      if (!select.includes(selectedAppliance)) {
        select.push(selectedAppliance);
      }
    }
    filtreRecherche();
    buttonFiltre();
  });

  // liste ustensils//
  function listeUstensils(recipes) {
    recipes.forEach((recipe) => {
      const mediaGalery = mediaTemplate(recipe);
      const recipeCard = mediaGalery.ustensils;
      recipeCard.forEach((utensil) => {
        const listeUstensils = `${utensil}`;
        // console.log(listeUstensils);

        if (!ustensils.includes(listeUstensils)) {
          ustensils.push(listeUstensils);

          const listItem = document.createElement("li");
             // Ajouter un style CSS pour supprimer les puces
        listItem.style.listStyle = 'none';
          listItem.textContent = listeUstensils;
          ustensilList.appendChild(listItem);
        }
      });
    });
  }
  listeUstensils(recipes);

  toggleButtonUstensil.addEventListener("click", () => {
    if (
      ustensilContainer.style.display === "none" ||
      ustensilContainer.style.display === ""
    ) {
      ustensilContainer.style.display = "block";
    } else {
      ustensilContainer.style.display = "none";
    }
  });

  ustensilInput.addEventListener("keyup", () => {
    function normalize(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const searchedVal = normalize(ustensilInput.value.toLowerCase());
    console.log(searchedVal);

    closeUstensil.style.display = "block";
    closeUstensil.addEventListener("click", () => {
      ustensilInput.value = "";
      closeUstensil.style.display = "none";
      ustensilList.innerHTML = ""; // Efface la liste actuelle
      ustensils.forEach((data) => {
        const listItem = document.createElement("li");
        listItem.textContent = data;
        ustensilList.appendChild(listItem);
      });
    });

    const filteredUstensil = ustensils.filter((data) => {
      const normalizedData = normalize(data.toLowerCase());
      return normalizedData.includes(searchedVal);
    });

    ustensilList.innerHTML = ""; // Clear previous options

    if (filteredUstensil.length === 0) {
      ustensilList.innerHTML = "<li>No results found</li>";
    } else {
      filteredUstensil.forEach((data) => {
        const listItem = document.createElement("li");
        listItem.textContent = data;
        ustensilList.appendChild(listItem);
      });
    }
  });

  // Ajoutez un gestionnaire d'événements au conteneur de la liste ul
  ustensilList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const selectedUtensil = event.target.textContent;
      console.log(selectedUtensil);
      ustensilSelect.innerText = selectedUtensil;

      // Vérifiez si l'ingrédient est déjà dans le tableau select
      if (!select.includes(selectedUtensil)) {
        select.push(selectedUtensil);
      }
    }
    filtreRecherche();
    buttonFiltre();
  });

  function filtreRecherche() {
    //let listRecipes = recipes
    let listRecipes = displayedRecipes;
  
    const filteredRecipes = [];
    for (let i = 0; i < listRecipes.length; i++) {
      const recipe = listRecipes[i];
  
      // Vérifie si les ingrédients de la recette contiennent la valeur sélectionnée
      const selectedIngredients = [];
      for (let j = 0; j < select.length; j++) {
        if (ingredients.includes(select[j])) {
          selectedIngredients.push(select[j]);
        }
      }
      const recipeIngredients = recipe.ingredients;
      console.log(recipeIngredients);
  
      const selectedAppliance = [];
      for (let j = 0; j < select.length; j++) {
        if (appliances.includes(select[j])) {
          selectedAppliance.push(select[j]);
        }
      }
      const recipeAppliances = Array.isArray(recipe.appliance)
        ? recipe.appliance
        : [recipe.appliance];
  
      const selectedUtensil = [];
      for (let j = 0; j < select.length; j++) {
        if (ustensils.includes(select[j])) {
          selectedUtensil.push(select[j]);
        }
      }
      const recipeUstensils = recipe.ustensils;
  
      if (selectedIngredients.length > 0) {
        let ingredientsMatch = false;
        for (let j = 0; j < selectedIngredients.length; j++) {
          if (
            recipeIngredients.some((ingredient) =>
              ingredient.ingredient.includes(selectedIngredients[j])
            )
          ) {
            ingredientsMatch = true;
            break;
          }
        }
        if (!ingredientsMatch) {
          continue;
        }
      }
  
      if (selectedAppliance.length > 0) {
        let applianceMatch = false;
        for (let j = 0; j < selectedAppliance.length; j++) {
          if (
            recipeAppliances.some((appliance) =>
              appliance.includes(selectedAppliance[j])
            )
          ) {
            applianceMatch = true;
            break;
          }
        }
        if (!applianceMatch) {
          continue;
        }
      }
  
      if (selectedUtensil.length > 0) {
        let utensilMatch = false;
        for (let j = 0; j < selectedUtensil.length; j++) {
          if (
            recipeUstensils.some((utensil) =>
              utensil.includes(selectedUtensil[j])
            )
          ) {
            utensilMatch = true;
            break;
          }
        }
        if (!utensilMatch) {
          continue;
        }
      }
  
      filteredRecipes.push(recipe);
    }
  
    recipeContainer.innerHTML = "";
  
    // Affiche les recettes filtrées
    count = 0;
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      count++;
      const mediaGalery = mediaTemplate(recipe);
      const recipeCard = mediaGalery.getRecette();
      recipeContainer.appendChild(recipeCard);
      updateNumberRecettes(count);
    }
  
    // Met à jour les listes en fonction des recettes filtrées
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

  let countButtoFiltre = 0;
  function buttonFiltre() {
    countButtoFiltre++;
    console.log(countButtoFiltre);
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
    console.log("filtre ajoute numero: " + select.length + "   " + select);
    console.log(select);

    closeFiltresSelected.addEventListener("click", closeModal);

    function closeModal() {
      countButtoFiltre--;

      // Retirer le filtre du tableau select en utilisant l'attribut data-index
      const indexToRemove = parseInt(
        filtresSelectedButton.getAttribute("data-index")
      );
      select.splice(indexToRemove, 1);

      filtresSelectedButton.remove(); // supprimer complètement le bouton des filtres sélectionnés
      recipeContainer.innerHTML = "";

      filtreRecherche(); // Appliquer les filtres restants
      console.log(select);
      console.log("filtre restant(s): " + select);

      if (countButtoFiltre <= 0) {
        countButtoFiltre = 0;
        select = [];
        filtreRecherche(); // Afficher toutes les recettes si tous les filtres sont supprimés
      }
      // Mettre à jour les index des boutons des filtres restants
      const filtresButtons = document.getElementsByClassName(
        "filtresSelectedButton"
      );
      for (let i = 0; i < filtresButtons.length; i++) {
        filtresButtons[i].setAttribute("data-index", i);
      }
    }
  }

  //  const searchInput = document.querySelector('input[type="text"]');
  // Déclarez une variable pour stocker les recettes actuellement affichées
  let displayedRecipes = recipes;

  searchInput.addEventListener("keyup", () => {
    const searchTerm = normalize(searchInput.value);
    console.log(searchTerm);

    // Vérifiez si la longueur de la chaîne de recherche est d'au moins 3 caractères
    if (searchTerm.length >= 3) {
      // Seulement si la chaîne de recherche a au moins 3 caractères, effectuez la recherche
      displayedRecipes = filterRecipesBySearchTerm(
        displayedRecipes,
        searchTerm
      );

      // Appliquez les filtres sélectionnés aux recettes actuellement affichées
      filtreRecherche();
    } else {
      // Si la chaîne de recherche a moins de 3 caractères, réinitialisez les recettes affichées
      displayedRecipes = recipes;

      // Appliquez les filtres sélectionnés aux recettes actuellement affichées
      filtreRecherche();
    }
  });

  // Fonction pour filtrer les recettes par terme de recherche
  function filterRecipesBySearchTerm(recipes, searchTerm) {
    return recipes.filter((recipe) => {
      const recipeText = `${recipe.name} ${recipe.description}`;
      const normalizedRecipeText = normalize(recipeText.toLowerCase());
      return normalizedRecipeText.includes(searchTerm);
    });
  }

  function normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function updateNumberRecettes(count) {
    const numberRecettes = document.getElementById("number-recettes");

    // Créez un élément <p> pour le nombre de recettes
    const numberR = document.createElement("p");

    // Créez un élément <p> pour le texte "recettes"
    const nameNumberRecettes = document.createElement("p");
    nameNumberRecettes.innerHTML = `<code>${count}</code>`;

    numberR.textContent = "recettes";

    numberRecettes.innerHTML = "";
    numberRecettes.appendChild(nameNumberRecettes);
    numberRecettes.appendChild(numberR);
  }
}

async function init() {
  const { recipes } = await getPhotographers();
  // Stockage des recettes initiales dans state
  await filterRecipes(recipes);
}
init();
