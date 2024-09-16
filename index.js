import { menuArr } from './data.js'

const menuEl = document.getElementById('menu')

function renderHTML() {
   const menuHTML = menuArr.map(function (arr) {
      return `
         <div class="menu-item-container">
            <img src="${arr.image}" class="item-img">
            <div class="item-info">
               <div class="item-name">${arr.name}</div>
               <div class="item-ingredients">${arr.ingredients.join(', ')}</div>
               <div class="item-price">$${arr.price}</div>
            </div>
            <button class="add-button">+</button>
         </div>
   `
   }).join('')
   menuEl.innerHTML += menuHTML

   function toggler() {
      const optionsEl = document.getElementById('toggleContainer')
      const deliveryOption = document.getElementById('deliveryOption')
      const pickupOption = document.getElementById('pickupOption')

      optionsEl.addEventListener('click', () => {
         deliveryOption.classList.toggle('selected')
         pickupOption.classList.toggle('selected')
      })
   }
   toggler()
}

renderHTML()