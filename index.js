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
}

renderHTML()