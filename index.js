import { menuArr } from './data.js'

const menuEl = document.getElementById('menu')

function renderHTML() {
   const menuHTML = `
      <div class="menu-item-container">
         <img src="/images/pizza.jpg" class="item-img">
         <div class="item-info">
            <div class="item-name">Pizza</div>
            <div class="item-ingredients">pepperoni, mushrom, mozarella</div>
            <div class="item-price">$14</div>
         </div>
         <button class="add-button">+</button>
      </div>
   `

   menuEl.innerHTML += menuHTML
}

renderHTML()