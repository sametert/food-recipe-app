const search = document.getElementById("search");
const submit = document.getElementById("submit");
const apiReq = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


const satir = document.getElementById("satir");

async function displayFood() {
    try {
        const request = await fetch(apiReq + search.value);
        const response = await request.json();
        clearDisplay();
        displayMeal(response);
    } catch {
        alert("böyle bir arama sonucu bulunamadi");
    }
}

const displayMeal = foods => {
    let meals = foods.meals;
    for (let meal of meals) {
        console.log(meal);
        let tag = `
        <div class="col-md-3 mb-4">
            <div class="card">
                <img src="${meal.strMealThumb}" alt="" class="card-img-top">
                <h5 class="card-title text-center pt-2 ">${meal.strMeal}</h5>

                <div class="card-body">
                    <p class="ulke">Country : ${meal.strArea}</p>
                    <p class="malzemeler">Category : ${meal.strCategory}</p>
                </div>
                <div class="card-footer text-center">
                    <button class="btn btn-warning rounded-3" type="button" data-bs-toggle="modal" data-bs-target="#${meal.strArea}${meal.idMeal}">Food Recipe</button>
                </div>
            </div>

            <div class="modal fade" id="${meal.strArea}${meal.idMeal}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-uppercase" id="foodRecipeLabel">${meal.strMeal}</h5>
                            <button type="button" class="btn-close btn-warning" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body badge bg-danger text-wrap" style="font-size:14px; line-height: 1.6;">
                            ${meal.strInstructions}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-outline-warning"><a href="${meal.strYoutube}" target="_blank"  class="text-decoration-none text-dark">Youtube Go</a></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        satir.insertAdjacentHTML("beforeend", tag);
    }
}


const clearDisplay = () => {
    satir.innerHTML = "";
}

submit.addEventListener("click", displayFood);