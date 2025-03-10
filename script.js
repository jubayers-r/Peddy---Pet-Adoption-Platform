// help
// like btn (selected column grid problem)
// picture on details is working well, but on same logic, picture on displaypet doesnt work

// todo
// responsive page (main)
// footer
// readme file
//check requirements git
function removeClass() {
const btns = document.getElementsByClassName("btn");
for (btn of btns) {
    btn.classList.remove('active');
}
}
function loadCategoryPets(petCategory){
  // Show loading spinner
  const dealsSection = document.getElementById('deals');
  dealsSection.classList.remove('grid');
  dealsSection.innerHTML = `
    <div class="flex justify-center items-center min-h-[300px]">
      <span class="loading loading-bars loading-xl text-[#0E7A81]"></span>
    </div>
  `;

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${petCategory}`)
    .then(res => new Promise(resolve => setTimeout(() => resolve(res), 2000)))
    .then(res => res.json())
    .then(data => {
      removeClass();
      const activeBtn = document.getElementById(petCategory);
      activeBtn.classList.add('active');
      displayPets(data.data)})
    .catch(err => console.log(err))
}
function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
        displayCategories(data.categories)})
    .catch((err) => console.log(err))
}
function displayCategories(categories){
const categoriesSection = document.getElementById("categories");
categories.forEach(category => {
const btn = document.createElement("button");
btn.classList = ('btn btn-xl p-10 flex gap-4');
btn.id = category.category;
btn.innerHTML = `
<div class="w-10">
<img src="${category.category_icon}">
</div>
<h1 class="font-bold text-2xl">${category.category}</h1>
`
btn.onclick = () => {
loadCategoryPets(category.category);
}
categoriesSection.append(btn);
});
}
function loadPets(){
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayPets(data.pets))
    .catch(err => console.log(err))
}
function sortByPrice() {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
  .then(res => res.json())
  .then(data => {
    // Sort the pets array by price
    const sortedPets = data.pets.sort((a, b) => {
      return b.price - a.price;
    });
    displayPets(sortedPets);
  })
  .catch(err => console.log(err));
}

async function loadModal (petId) {
    my_modal_5.showModal();
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();
    displayModal(data.petData);
}

function displayModal (petData){
const modal = document.getElementById('my_modal_5');
modal.innerHTML =  `
<div class="modal-box">
    <div class= "max-h-[305px] max-w-[465px]">
    <img src="${petData.image}" class="rounded-xl object-cover w-full h-full">
    </div>
    <h3 class="text-lg font-bold py-5">${petData.pet_name}</h3>

<div class="grid grid-cols-2">
<div>
<div class="flex gap-1 items-center">
<div>
<img src="https://cdn-icons-png.flaticon.com/512/3934/3934041.png " width="17" height="17" alt="" title="" class="img-small">
</div>
<p class="text-black/70 font-normal text-base" >Breed: ${petData.breed ? `${petData.breed}` : 'Not Available'}</p>
</div>
<div class="flex gap-1 items-center">
  <div>
  <img src="   https://cdn-icons-png.flaticon.com/512/18297/18297619.png " width="17" height="17" alt="" title="" class="img-small">
  </div>
  <p class="text-black/70 font-normal text-base" >Gender: ${petData.gender ? `${petData.gender}` : 'Not Available'}</p>
  </div>
<div class="flex gap-1 items-center">
  <div>
  <img src="   https://cdn-icons-png.flaticon.com/512/18297/18297619.png " width="17" height="17" alt="" title="" class="img-small">
  </div>
  <p class="text-black/70 font-normal text-base" >Vaccinated Status: ${petData.vaccinated_status ? `${petData.vaccinated_status}` : 'Not Available'}</p>
  </div>
</div>
<div>
<div class="flex gap-1 items-center">
  <div>
  <img src="https://cdn-icons-png.flaticon.com/512/3106/3106790.png " width="17" height="17" alt="" title="" class="img-small">
  </div>
    <p class="text-black/70 font-normal text-base" >Birth: ${petData.date_of_birth ? `${petData.date_of_birth}` : 'Not Available'}</p>
  </div>
 <div class="flex gap-1 items-center">
  <div>
 <img src="   https://cdn-icons-png.flaticon.com/512/2530/2530493.png " width="18" height="18" alt="" title="" class="img-small">
  </div>
  <p class="text-black/70 font-normal text-base" >Price : ${petData.price ? `${petData.price} $` : 'Not Available'}</p>
  </div>
</div>
</div>
     <hr class="text-gray-200 my-4">
     <div class="flex flex-col gap-4">
     <h5 class="font-semibold">Details Information</h5>
     <p class="text-black/70">${petData.pet_details}</p>
    <div class="flex justify-center">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-[#0E7A811A] text-[#0E7A81] py-3">Close</button>
      </form>
    </div>
     </div>
  </div>
`;
}
function displayCountdown (petId) {
  const modal = document.getElementById('my_modal_5');
  const adoptBtn = document.getElementById(petId);
  modal.showModal();
  let timeLeft = 3;

  modal.innerHTML = `
    <div class="modal-box text-center">
    <h1 class="font-bold text-3xl ">Congrats</h1>
    <p>Adoption process is started for your pet</p>
      <span class="countdown text-9xl">
        <span id="countdown-value" style="--value:3;" aria-live="polite" aria-label="3">3</span>
      </span>
      <div class="modal-action">
      </div>
    </div>
  `;

  const countdownInterval = setInterval(() => {
    timeLeft--;
    const countdownElement = document.getElementById('countdown-value');
    if (countdownElement) {
      countdownElement.style = `--value:${timeLeft}`;
      countdownElement.textContent = timeLeft;
    }
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      modal.close();
      adoptBtn.innerText = "Adopted";
      adoptBtn.classList = "btn text-lg bg-gray-300 text-white";
    }
  }, 1000);
}
function selected (image) {
  const selectedDiv = document.getElementById("selected");
  const selected = document.createElement("div");
  selected.classList = "";
  selected.innerHTML = `
                    <img
                      src="${image}"
                      alt=""
                      class="rounded-xl object-cover" />
  `;
  selectedDiv.append(selected);
}




function displayPets(pets){
const dealsSection = document.getElementById('deals');
dealsSection.innerHTML = "";

if(pets.length == 0) {
    dealsSection.classList.remove('grid');
    dealsSection.innerHTML = `
    <div class="bg-gray-100 py-25 flex flex-col gap-10 rounded-3xl items-center text-center ">
    <div>
    <img src="./images/error.webp">
    </div>
    <div class="flex flex-col gap-4 w-[63%]">
    <h1 class="font-bold text-3xl">No Information Available</h1>
    <p class="text-black/70">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    </div>
    `
} else{
    dealsSection.classList.add('grid');
}
pets.forEach(pet => {
    const card = document.createElement("div");

card.innerHTML = `
<div class="card bg-base-100 shadow-sm rounded-xl p-5 border-1 border-gray-200">
  <div class="max-h-[200px] max-w-[320px]">
    <img
      src="${pet.image}"
      class="rounded-xl object-cover h-full w-full" />
  </div>
  <div class="items-left text-left">
  <h2 class="font-extrabold text-xl my-3" >${pet.pet_name}</h2>
  <div class="flex gap-1 items-center">
  <div>
  <img src="https://cdn-icons-png.flaticon.com/512/3934/3934041.png " width="17" height="17" alt="" title="" class="img-small">
  </div>
  <p class="text-black/70 font-normal text-base" >Breed: ${pet.breed ? `${pet.breed}` : 'Not Available'}</p>
  </div>
  <div class="flex gap-1 items-center">
  <div>
  <img src="https://cdn-icons-png.flaticon.com/512/3106/3106790.png " width="17" height="17" alt="" title="" class="img-small">
  </div>
    <p class="text-black/70 font-normal text-base" >Birth: ${pet.date_of_birth ? `${pet.date_of_birth}` : 'Not Available'}</p>
  </div>
  <div class="flex gap-1 items-center">
  <div>
  <img src="   https://cdn-icons-png.flaticon.com/512/18297/18297619.png " width="17" height="17" alt="" title="" class="img-small">
  </div>
  <p class="text-black/70 font-normal text-base" >Gender: ${pet.gender ? `${pet.gender}` : 'Not Available'}</p>
  </div>
  <div class="flex gap-1 items-center">
  <div>
 <img src="   https://cdn-icons-png.flaticon.com/512/2530/2530493.png " width="18" height="18" alt="" title="" class="img-small">
  </div>
  <p class="text-black/70 font-normal text-base" >Price : ${pet.price ? `${pet.price} $` : 'Not Available'}</p>
  </div>
    </div>
    <hr class="text-gray-200 my-4">
    <div class="grid grid-cols-4 text-lg font-bold">
    <div >
    <button onclick = "selected ('${pet.image}')" class="btn text-[#0E7A81]" >
    <img src="   https://cdn-icons-png.flaticon.com/512/126/126473.png " width="20" height="20" alt="" title="" class="img-small">
    </button>
    </div>
    <div class= "col-span-3">
    <div class="grid grid-cols-2 gap-3">
    <button onclick="displayCountdown(${pet.petId})" class="btn text-[#0E7A81] text-lg" id="${pet.petId}">Adopt</button>
    <button onclick="loadModal (${pet.petId})" class="btn text-[#0E7A81] text-lg">Details</button>
    </div>
  </div>
    </div>
</div>
`
dealsSection.append(card);

});
}

loadPets();
loadCategories();
