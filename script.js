let recommendationsData = null;

async function loadRecommendations() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    recommendationsData = await response.json();
    console.log(recommendationsData); 
  } catch (error) {
    console.error("Erreur lors du chargement:", error);
  }
}

loadRecommendations();

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector(".search-btn");
const clearButton = document.querySelector(".clear-btn");
const recommendationsList = document.querySelector(".recommendations-list");

const recommendationsSearch = (keyword) => {
  let word = keyword.toLowerCase();
  let recommendationsSearches = [];
  
  if (word === "beach") {
    recommendationsSearches = recommendationsData.beaches;
  } else if (word === "temple") { 
    recommendationsSearches = recommendationsData.temples;
  } else if (word === "country") { 
    recommendationsSearches = recommendationsData.countries;
  }
  return recommendationsSearches;
};

const displaySearches = (keyword) => {
  recommendationsList.innerHTML = ""; 
  
  const results = recommendationsSearch(keyword); 
  
  if (!results || results.length === 0) {
    console.log("Aucun résultat trouvé");
    return;
  }
  
  results.forEach(element => {
    const recommendationItem = document.createElement("li");
    recommendationItem.classList.add("recommendations-item");
    
    const recommendationImg = document.createElement("img");
    const recommendationName = document.createElement("p");
    recommendationName.classList.add("recommendation-name");
    const recommendationInfo = document.createElement("span");
    recommendationInfo.classList.add("recommendation-info");
    const visitButton = document.createElement("button");
    visitButton.classList.add("visit-btn");
    visitButton.textContent = "Visit"; 
    
    if (element.cities) {
      recommendationsList.style.overflow = 'scroll'
      element.cities.forEach(city => {
        const cityItem = document.createElement("li");
        cityItem.classList.add("recommendations-item");
        
        const cityImg = document.createElement("img");
        cityImg.src = city.imageUrl;
        
        const cityName = document.createElement("p");
        cityName.classList.add("recommendation-name");
        cityName.textContent = city.name;
        
        const cityInfo = document.createElement("span");
        cityInfo.classList.add("recommendation-info");
        cityInfo.textContent = city.description;
        
        const cityButton = document.createElement("button");
        cityButton.classList.add("visit-btn");
        cityButton.textContent = "Visit";
        
        cityItem.append(cityImg, cityName, cityInfo, cityButton);
        recommendationsList.append(cityItem);
      });
    } else {
      recommendationImg.src = element.imageUrl;
      recommendationName.textContent = element.name;
      recommendationInfo.textContent = element.description;
      recommendationItem.append(recommendationImg, recommendationName, recommendationInfo, visitButton);
      recommendationsList.append(recommendationItem);
    }
  });
};

searchButton.addEventListener('click', () => {
  displaySearches(searchInput.value);
});

clearButton.addEventListener('click', () => {
  searchInput.value = "";
  recommendationsList.innerHTML = "";
  recommendationsList.style.overflow = 'hidden'
});