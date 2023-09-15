function mediaTemplate(recipes) {
    const { name,ingredients,image,time,description,appliance,ustensils,servings} = recipes

    const picture = `photos/${image}`

     
    function getRecette() {
        const article = document.createElement( 'article' ) 
        article.classList.add('article')
 
        const article_haut =  document.createElement( 'div' ) 
        article_haut.classList.add('article_haut')
        const img = document.createElement( 'img' )
        img.setAttribute("src", picture)
        article_haut.appendChild(img)

        const time_recettes = document.createElement( 'div' )
        time_recettes.classList.add('time_recettes')

        const time = document.createElement( 'p' )
        time.textContent = recipes.time 

        const times_txt = document.createElement( 'p' )
        times_txt.textContent = "min"

        time_recettes.appendChild(time)
        time_recettes.appendChild(times_txt)
        article_haut.appendChild(time_recettes)

        const article_bas =  document.createElement( 'div' ) 
        article_bas.classList.add('article_bas')

        const name_recette = document.createElement( 'h2' )
        name_recette.textContent = name
        name_recette.classList.add('name_recette')

        const servings = document.createElement( 'p' )
        servings.textContent = recipes.servings
       servings.classList.add('servings')

      //   const ingredients_recettes = document.createElement( 'div' )
      //   ingredients_recettes.textContent = recipes.ingredients
      //  ingredients_recettes.classList.add('ingredients_recettes')
    
      const block_ingredients =  document.createElement('div');
      block_ingredients.classList.add('block_ingredients')

      const ingredients_txt = document.createElement( 'p' )
      ingredients_txt.textContent = "ingredients"

      block_ingredients.appendChild(ingredients_txt)

      const div_ingredients = document.createElement('div');
      div_ingredients.classList.add('div_ingredients')

      block_ingredients.appendChild(div_ingredients)

      ingredients.forEach((ingredient) => {
        const parti_ingredients= document.createElement('div');
        const haut_ingredients= document.createElement('p');
        const bas_ingredients= document.createElement('p');
        haut_ingredients.textContent = `${ingredient.ingredient}`;
        bas_ingredients.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''}`;
        parti_ingredients.appendChild(haut_ingredients)
        parti_ingredients.appendChild(bas_ingredients)
        div_ingredients.appendChild(parti_ingredients);
      });

       

        const descriptions_recettes = document.createElement( 'div' )
        descriptions_recettes.classList.add('descriptions_recettes')

        const recettes = document.createElement( 'p' )
        recettes.textContent = "recettes"
        recettes.classList.add('recettes')

        const description = document.createElement( 'p' )
        description.textContent = recipes.description
        description.classList.add('description')

        descriptions_recettes.appendChild(recettes)
        descriptions_recettes.appendChild(description)

        const appliance = document.createElement( 'p' )
        appliance.textContent = recipes.appliance
        appliance.classList.add('appliance')

        const ul_ustensils = document.createElement( 'ul' )
        ustensils.forEach((ustensil) =>{
          const li = document.createElement('li');
          li.textContent = ustensil.ustensil;
          ul_ustensils.appendChild(li)
        });


       
        article_bas.appendChild(name_recette)
       // article.appendChild(servings)
       // article.appendChild(time_recettes)
       article_bas.appendChild(descriptions_recettes)
       article_bas.appendChild(block_ingredients)
       article.appendChild(article_haut)
       article.appendChild(article_bas)
      //  article.appendChild(appliance)
       // article.appendChild(ul_ustensils)
        


        return (article)
    }   

    return {name,ingredients,image,time,description,servings,appliance,ustensils,getRecette}
}



// const filtresSelected = document.getElementById("filtres-selected");
// const filtresSelectedButton = document.createElement('div')
// filtresSelectedButton.classList.add('filtresSelectedButton')
// const nameFiltresSelected = document.createElement( 'p' )
// nameFiltresSelected.innerText = selectedIngredient;
// const closeFiltresSelected = document.createElement( 'p' )
// closeFiltresSelected.innerText = "X"
// filtresSelectedButton.appendChild(nameFiltresSelected)
// filtresSelectedButton.appendChild(closeFiltresSelected)
// filtresSelected.appendChild(filtresSelectedButton)
// closeFiltresSelected.addEventListener("click", closeModal);
// function closeModal() {
//   filtresSelectedButton.style.display = "none";
//   let count = 0;
//   recipes.forEach(recipe => {
//     const mediaGalery = mediaTemplate(recipe);
//     const recipeCard = mediaGalery.getRecette();
//  recipeContainer.appendChild(recipeCard);
//  count++;
// })
// const numberRecettes = document.getElementById('number-recettes'); 
// const numberR = document.createElement('p')
// const nameNumberRecettes = document.createElement('p')
// nameNumberRecettes.textContent =`${count}`;
// numberR.textContent="recettes";
// numberRecettes.innerHTML=""
// numberRecettes.appendChild(nameNumberRecettes)
// numberRecettes.appendChild(numberR)
// }




 // const numberRecettes = document.getElementById('number-recettes'); 
            // const numberR = document.createElement('p')
            // const nameNumberRecettes = document.createElement('p')
            // nameNumberRecettes.textContent =`${count}`;
            // numberR.textContent="recettes";
            // numberRecettes.innerHTML=""
            // numberRecettes.appendChild(nameNumberRecettes)
            // numberRecettes.appendChild(numberR)       