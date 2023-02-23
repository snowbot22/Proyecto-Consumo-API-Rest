//VARIABLES
let mainImage = document.getElementById('mainImage');
let container= document.getElementById('container');
let mobileContainer= document.getElementById('mobileContainer');
let marioImg = document.getElementById('marioImg');
let zeldaImg = document.getElementById('zeldaImg');
let animalImg = document.getElementById('animalImg');
let marioImgMobile = document.getElementById('marioImgMobile');
let zeldaImgMobile = document.getElementById('zeldaImgMobile');
let animalImgMobile = document.getElementById('animalImgMobile');
let main= document.getElementById('main');
let amiibo;
let counter= 0;

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
    let itemsPerPage = 8;
    let currentPage = 1;
    console.log(data);

    //CLEAN CONTAINER
    container.classList.add('state--hidden');
    mobileContainer.classList.add('state--hidden');

    //CREATING CONTAINER 
    let cardContainer = document.createElement('div');
    let cardContainerButtonContainer = document.createElement('div');
    let cardContainerNextButton = document.createElement('button');
    let cardContainerPreviousButton = document.createElement('button');
    let flexContainer = document.createElement('article');
    cardContainerButtonContainer.append(cardContainerPreviousButton);

    

    //CREATE CARDS
    function createCards(current){
      current.forEach(amiibo=>{
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
        flexContainer.classList.add('ammiboContainer');
        cardContainerButtonContainer.classList.add('buttonContainer');
        cardContainerNextButton.classList.add('button--pagination');
        cardContainerPreviousButton.classList.add('button--pagination');
  
        //APPENDING ELEMENTS
        main.append(flexContainer);
        cardContainer.append(card);
        card.append(cardFigure);
        cardFigure.append(cardImage);
        card.append(cardText)
        card.append(cardTitle);
        cardText.append(cardTitle);
        cardText.append(type);
        cardText.append(series);
        flexContainer.append(cardContainer);
        flexContainer.append(cardContainerButtonContainer);
        cardContainerButtonContainer.append(cardContainerNextButton);
  
        //SETTING CONTENT
        cardImage.src = amiibo.image;
        cardTitle.textContent = amiibo.name;
        type.textContent= `Type: ${amiibo.type}`
        series.textContent= `Series: ${amiibo.amiiboSeries}`
        cardContainerNextButton.textContent = 'Next';
        cardContainerPreviousButton.textContent = 'Previous';
        
      })
    }
    
    //SHOW PAGE 1 FUNCTION
    function showPage(page, itemsPerPage) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageItems = dataAmiibo.slice(startIndex, endIndex);
      createCards(pageItems);
    }
    showPage( currentPage, itemsPerPage);
    
    //SHOW NEXT PAGE FUNCTION
    function showNextPage(){
      //SETTING TOTAL PAGES
      const totalPages = Math.ceil(dataAmiibo.length / itemsPerPage);
      //CLEAN CARD CONTAINER
      cardContainer.innerHTML = '';
      //ADD 1 TO CURRENT PAGE
      currentPage++;
      //ADDING CONDITIONAL TO PREVENT SHOWING MORE PAGES THAN TOTAL PAGES
      if(currentPage > totalPages){
        currentPage = totalPages;
      }
      //SHOW NEXT PAGE
      showPage(currentPage, itemsPerPage);
    }

    cardContainerNextButton.addEventListener('click', showNextPage);

    //SHOW PREVIOUS PAGE FUNCTION
    function showPreviousPage(){
      //CLEAN CARD CONTAINER
      cardContainer.innerHTML = '';
      //REST 1 TO CURRENT PAGE
      currentPage--;
      //ADDING CONDITIONAL TO PREVENT SHOWING MORE PAGES THAN TOTAL PAGES
      if(currentPage < 1){
        currentPage = 1;
      }
      //SHOW NEXT PAGE
      showPage(currentPage, itemsPerPage);
    }

    cardContainerPreviousButton.addEventListener('click', showPreviousPage);
    
  }
  catch(error){
    console.log(error);
  }
}


function getMario(){
  //SETTING CLICK LIMIT TO 1 
  counter++;
  if(counter > 1){
    return;
  }
  getAmiibos('Super%20Mario');
}

function getZelda(){
  //SETTING CLICK LIMIT TO 1 
  counter++;
  if(counter > 1){
    return;
  }
  getAmiibos('The%20Legend%20of%20Zelda');
}

function getAnimal(){
  //SETTING CLICK LIMIT TO 1 
  counter++;
  if(counter > 1){
    return;
  }
  getAmiibos('Animal%20Crossing');
}

//EVENT LISTENERS
marioImg.addEventListener('click', getMario);
zeldaImg.addEventListener('click', getZelda);
animalImg.addEventListener('click', getAnimal);
marioImgMobile.addEventListener('click', getMario);
zeldaImgMobile.addEventListener('click', getZelda);
animalImgMobile.addEventListener('click', getAnimal);

//CREATING CACHE
if(window.caches){
  caches.open("testCache").then(cache=>{
    cache.add('https://www.amiiboapi.com/api/amiibo/?gameseries=Super%20Mario&limit=10');
    cache.add('https://www.amiiboapi.com/api/amiibo/?gameseries=The%20Legend%20of%20Zelda&limit=10');
    cache.add('https://www.amiiboapi.com/api/amiibo/?gameseries=Animal%20Crossing&limit=10');
  });
}


