/* -------------- Get All Global Variables -------------- */
const searchInput = document.getElementById('search-input')
const phoneContainer = document.getElementById('phone-container')
const detailsContainer = document.getElementById('details-container')


/* -------------- Onclick Function -------------- */
const searchPhone = () => {
    const inputValue = searchInput.value
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
    .then(Response => Response.json())
    .then(json => printPhone(json.data))
}

const printPhone = phones => {
   
    phones.forEach(phon => {
        console.log(phon)
    });
}