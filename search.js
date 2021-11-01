//GRABING THE FORM ELEMENT
let userInput = document.getElementById('header__search-form')

//GRABING THE CARD ELEMENT
let resultCard = document.getElementById('list-wrapper')

//ADDING AN EVENT LISTENER TO THE SUBMIT FORM
userInput.addEventListener('submit', formSubmited)

//THE FUCTION THAT WILL EXECUTE WHEN USER PRESS SUBMIT
function formSubmited(e) {
    //THIS IS SO THE PAGE WAIT'S FOR US TO PRESS SUBMIT
    e.preventDefault()
    
    //THIS WILL STORE THE USER INPUT
    let artistName = document.getElementById('header__search-input').value
    console.log(`THE ARTIST NAME IS ${artistName}`)
    
    fetchJsonp(`https://itunes.apple.com/search?term=${artistName}&media=music&entity=album&attribute=artistTerm&limit=200​`)
    .then(response => response.json())
    .then(data => {
        //THIS WILL DISPLAY THE RESULT COUNT
        let count = document.getElementById("result-count")   
        count.innerHTML = data.resultCount + ` results for `+artistName
        
        //LOOP THROUGH EACH RESULT
        data.results.forEach(element => {

            //CREATE A NEW CARD
            let newCard = document.createElement('div')
            
            //CREATE THE NEW CARD PIC
            let newCardPic = document.createElement('img')
            
            //GIVE THE IMG THE SOURCE ADDRESS
            newCardPic.src = element.artistViewUrl;

            //CREATE THE NEW CARD NAME
            let newCardName = document.createElement('div')
            
            //GIVE THE NEW CARD THEIR CLASS NAMES
            newCard.setAttribute('class','card-design')
            newCardPic.setAttribute('class','pic')
            newCardName.setAttribute('class','name')

            //CREATE NAME TEXT NODE
            newCardNameText = document.createTextNode(element.collectionName)

            //APPEND EVERYTHING
            newCardName.appendChild(newCardNameText)
            newCard.appendChild(newCardPic)
            newCard.appendChild(newCardName)
            resultCard.appendChild(newCard)

            // console.log(data)
            // console.log(`The result count is ${data.resultCount}`);
            // console.log(`The first album name is ${data.results[0].collectionName}`);
            //data.results.forEach(element => {
            // console.log(`The album name is ${element.collectionName}`);
            // console.log(`The album cover is ${element.collectionViewUrl}`);
        });
        
    })
  

    
}