var btn=document.querySelector('.btn')
var srchbox=document.querySelector('.Search') 
var recipe=document.querySelector('.recipes')
const recipedetails=document.querySelector('.recipe-details')
const clsbtn=document.querySelector('.closebtn')    
const recipeDetailsContent=document.querySelector('.recipe-deatail-content')

const fetchrecipe=async (query)=>
{
   recipe.innerHTML="<h2>Fetching Recipes...<h2/>"
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response=await data.json();
    recipe.innerHTML=""
    response.meals.forEach(meals =>{
       const recipeDiv=document.createElement('div')
       recipeDiv.classList.add('recipeitem')
       recipeDiv.innerHTML=`
       <img src="${meals.strMealThumb}">
       <h3>${meals.strMeal}</h3>
        <p>${meals.strArea}</p>
         <p>${meals.strCategory}</p>
       `
       const butn=document.createElement('button')
       butn.textContent='View More'
       recipeDiv.appendChild(butn)

       butn.addEventListener('click',()=>{
        openRecipePopup(meals)
        console.log('jj')
       })
       
       recipe.appendChild(recipeDiv)
    });
    console.log('fetched');
}

const fetchIngredients=(meals)=>{
    let IngredientList="";
    for(let i=1;i<=20;i++)
    {
        const Ingredient=meals[`strIngredient${i}`]
        if(Ingredient)
        {
            const measure= meals[`strMeasure${i}`]
            IngredientList+=`<li>${measure} ${Ingredient}</li>`
        }
        else break;
    }
    return IngredientList;
}


const openRecipePopup=(meals)=>{
   recipeDetailsContent.innerHTML=`
    <h2 class="recipename">${meals.strMeal}</h2>
    <h3>Ingredent: </h3>
    <ul class="ingredientlist">${fetchIngredients(meals)}</ul>
    <div class="recipeinstrution">
    <h3>Instructions:</h3>
    <p>${meals.strInstructions}</p>
</div>
    `
    recipeDetailsContent.parentElement.style.display="block"

}

clsbtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none"
})

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput=srchbox.value.trim();
    if(srchbox.value=='')
    {
        alert("Please Enter Recipe")
        return
    }
    
    fetchrecipe(searchinput);
    
})