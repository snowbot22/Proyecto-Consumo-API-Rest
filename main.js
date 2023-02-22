//VARIABLES
let mainImage = document.getElementById('mainImage');
let container= document.getElementById('container');
let marioImg = document.getElementById('marioImg');
let zeldaImg = document.getElementById('zeldaImg');
let animalImg = document.getElementById('animalImg');
let main= document.getElementById('main');

//SWIPER  
let swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


//FUNCTIONS

async function getAmiibos(gameSeries){
  try{
    //FETCH
    let response = await fetch(`https://www.amiiboapi.com/api/amiibo/?gameseries=${gameSeries}&limit=10`);
    let data = await response.json();
    let dataAmiibo = data.amiibo;
    let amiibo = dataAmiibo.slice(0, 8)
    console.log(data);

    //CLEAN CONTAINER
    container.classList.add('state--hidden');

    //CREATING CONTAINER 
    let cardContainer = document.createElement('article');

    //CREATE CARDS
    amiibo.forEach(amiibo=>{
      //CREATING ELEMENTS
      let card = document.createElement('div');
      let cardFigure = document.createElement('figure');
      let cardImage = document.createElement('img');
      let cardTitle = document.createElement('h3');
      let cardText = document.createElement(`div`);
      let type = document.createElement('p');
      let series= document.createElement('p');

      //SETTING CLASSES
      cardContainer.classList.add('cardContainer');
      card.classList.add('card');
      cardFigure.classList.add('cardFigure');
      cardImage.classList.add('cardImage');
      cardTitle.classList.add('cardTitle');
      cardText.classList.add('cardText');
      type.classList.add('cardType');
      series.classList.add('cardSeries');

      //APPENDING ELEMENTS
      main.append(cardContainer);
      cardContainer.append(card);
      card.append(cardFigure);
      cardFigure.append(cardImage);
      card.append(cardText)
      card.append(cardTitle);
      cardText.append(cardTitle);
      cardText.append(type);
      cardText.append(series);

      //SETTING CONTENT
      cardImage.src = amiibo.image;
      cardTitle.textContent = amiibo.name;
      type.textContent= `Type: ${amiibo.type}`
      series.textContent= `Series: ${amiibo.amiiboSeries}`
    })

  }
  catch(error){
    console.log(error);
  }
}


function getMario(){
  getAmiibos('Super%20Mario');
}

function getZelda(){
  getAmiibos('The%20Legend%20of%20Zelda');
}

function getAnimal(){
  getAmiibos('Animal%20Crossing');
}

//EVENT LISTENERS
marioImg.addEventListener('click', getMario);
zeldaImg.addEventListener('click', getZelda);
animalImg.addEventListener('click', getAnimal);