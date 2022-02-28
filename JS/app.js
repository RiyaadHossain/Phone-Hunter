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

/* -------------- Print Search Result in the Result Div -------------- */
const printPhone = phones => {
   
    phones.forEach(phon => {
        console.log(phon)
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
        <div class="card shadow border-2">
          <img src="${phon.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${phon.phone_name}</h3>
            <p><span class="fw-bold">Brand:</span> ${phon.brand}</p>
            <button class="btn btn-info" onclick="printDetals('${phon.slug}')">Explore</button>
          </div>
        </div>
        `
        phoneContainer.appendChild(div)
    });
}


/* -------------- Print Details in the Details Div -------------- */
const printDetals = phoneID => {
    console.log(phoneID)
}