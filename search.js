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
    console.log(`HERE IS THE E `);
    console.log(e);
    //THIS WILL STORE THE USER INPUT
    let artistName = document.getElementById('header__search-input').value    
    fetchJsonp(`https://itunes.apple.com/search?term=${artistName}&media=music&entity=album&attribute=artistTerm&limit=200​`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(`THE LENGTH OF THE DATA IS ${data.resultCount}`);
        
        //THIS WILL CLEAR OUT THE CURRENT RESULTS WHEN YOU SEARCH FOR NEW ONES
        let newWrapper = document.getElementById('list-wrapper')
        newWrapper.replaceChildren()

        //THIS WILL DISPLAY THE RESULT COUNT
        let count = document.getElementById("result-count")   
        count.innerHTML = data.resultCount + ` results for `+artistName
        
        //MODIFACTION FOR PAGANTION
        let beginCounter = 0
        //GRAB THE BUTTON PARENT
        let btns = document.getElementById('pages')
        btns.replaceChildren()

        //LOOP THROUGH EACH RESULT TO CREATE THE CARDS
        data.results.forEach(element => {
        //MODIFACTION FOR PAGANTION
            if(beginCounter<20){
                //CREATE A NEW CARD
                let newCard = document.createElement('div')
                
                //CREATE THE NEW CARD PIC
                let newCardPic = document.createElement('img')
                
                //GIVE THE IMG THE SOURCE ADDRESS
                newCardPic.src = element.artworkUrl60;

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
            }
            beginCounter++
        });


        //========WE ARE OUTSIDE OF THE FIRST FOREACH LOOP========
        //=========THIS WILL ADD THE PAGANATION==========
        let itemPerPage = 20
        let currentPage = 1
        let totalItems = data.resultCount
        let numOfPages = [Math.ceil(totalItems/itemPerPage)]
        let counter = 0

        //CREATE THE PAGE BUTTONS
        for(let i = 0; i < numOfPages; i++ ){
            let newBtn = document.createElement('button')
            let btnTextNode = document.createTextNode(`${i}`)
            let parent = document.getElementById('pages')
            newBtn.appendChild(btnTextNode)
            newBtn.setAttribute('class','test')
            newBtn.addEventListener('click', function(event){
                newWrapper.replaceChildren() 
                let indexStart = itemPerPage * i
                let indexEnd = itemPerPage + indexStart
                counter = 0
                data.results.forEach(element =>{
                    if(counter >= indexStart && counter < indexEnd){
                        //CREATE A NEW CARD
                        let newCard = document.createElement('div')
                        
                        //CREATE THE NEW CARD PIC
                        let newCardPic = document.createElement('img')
                        
                        //GIVE THE IMG THE SOURCE ADDRESS
                        newCardPic.src = element.artworkUrl60;

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
                    }
                    counter++
                })
                // newWrapper.replaceChildren()
            })
            parent.appendChild(newBtn)
            

            console.log(newBtn)
            console.log(`HI`)
        }        
    })
}