/* -------------- Get Global Variables -------------- */
const searchInput = document.getElementById("search-input");
const phoneContainer = document.getElementById("phone-container");
const detailsContainer = document.getElementById("details-container");
const errorMsg = document.getElementById("error-msg");

/* -------------- Onclick Function for Search -------------- */
const searchPhone = () => {
  const inputValue = searchInput.value;
  if (inputValue.length == "") {
    phoneContainer.textContent = "";
    errorMsg.innerHTML = `<h2> Please Input what Phone you want to Search 😓</h2>`;
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
      .then((Response) => Response.json())
      .then((json) => printPhone(json.data));
    errorMsg.textContent = "";
  }
  searchInput.value = "";
};

/* -------------- Print Search Result in the Result Div -------------- */
const printPhone = (phones) => {
  phoneContainer.textContent = "";
  detailsContainer.textContent = "";
  const limitedItem = phones.slice(0, 20)
  if (phones.length == 0) {
    errorMsg.innerHTML = ` <h2>No, result Found! 😥</h2>`;
  } else {
    limitedItem.forEach((phon) => {
      const div = document.createElement("div");
      div.className = "col";
      div.innerHTML = `
        <div class="card shadow border-2">
          <img src="${phon.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${phon.phone_name}</h3>
            <p><span class="fw-bold">Brand:</span> ${phon.brand}</p>
            <button class="fw-bold btn btn-info" onclick="printDetals('${phon.slug}')">Explore</button>
          </div>
        </div>
        `;
      phoneContainer.appendChild(div);
    });
  }
};

/* -------------- Onclick Function for Explore -------------- */
const printDetals = (phoneID) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
  fetch(url)
    .then((Response) => Response.json())
    .then((json) => printDetails(json.data));
};

/* -------------- Print Details in the Details Div -------------- */
const printDetails = (data) => {
 console.log(data.mainFeatures.sensors)
  detailsContainer.textContent = ''
  let releaseMsg = "";
  if (data.releaseDate == "") {
    releaseMsg = "No, release Data Found 😔";
  } else {
    releaseMsg = data.releaseDate;
  }
  let sensor = ''
  data.mainFeatures.sensors.forEach(element => sensor =  ` ${sensor} ${element},`)
  console.log(sensor)
  const div = document.createElement("div");
  div.className = "col";
  if (data.others) {
    div.innerHTML = `
    <h2 class="text-center my-3">Explored <span class="text-info">${data.name}</span></h2>
    <div class="card shadow border-2">
      <img src="${data.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${data.name}</h3>
        <p><span class="fw-bold">Release Date:</span> ${releaseMsg}</p>
        <p><span class="fw-bold">Brand:</span> ${data.brand}</p>
        <p><span class="fw-bold">Memory:</span> ${data.mainFeatures.memory}</p>
        <p><span class="fw-bold">Storage:</span> ${data.mainFeatures.storage}</p>
        <p><span class="fw-bold">Sensor:</span> ${sensor}</p>
        <p><span class="fw-bold">Display Size:</span> ${data.mainFeatures.displaySize}</p>
        <p><span class="fw-bold">ChipSet:</span> ${data.mainFeatures.chipSet}</p>
        <h5 class="text-center">-Others-</h5>
        <p><span class="fw-bold">WLAN:</span> ${data.others.WLAN}</p>
        <p><span class="fw-bold">Bluetooth:</span> ${data.others.Bluetooth}</p>
        <p><span class="fw-bold">GPS:</span> ${data.others.GPS}</p>
        <p><span class="fw-bold">NFC:</span> ${data.others.NFC}</p>
        <p><span class="fw-bold">Radio:</span> ${data.others.Radio}</p>
      </div>
    </div>
    `;
  } else {
    div.innerHTML = `
    <h2 class="text-center my-3">Explored <span class="text-info">${data.name}</span></h2>
    <div class="card shadow border-2">
      <img src="${data.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${data.name}</h3>
        <p><span class="fw-bold">Release Date:</span> ${releaseMsg}</p>
        <p><span class="fw-bold">Brand:</span> ${data.brand}</p>
        <p><span class="fw-bold">Memory:</span> ${data.mainFeatures.memory}</p>
        <p><span class="fw-bold">Storage:</span> ${data.mainFeatures.storage}</p>
        <p><span class="fw-bold">Sensor:</span> ${data.mainFeatures.sensors}</p>
        <p><span class="fw-bold">Display Size:</span> ${data.mainFeatures.displaySize}</p>
        <p><span class="fw-bold">ChipSet:</span> ${data.mainFeatures.chipSet}</p>
    `;
  }
  detailsContainer.appendChild(div);
};
