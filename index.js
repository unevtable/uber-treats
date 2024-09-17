import { menuArr } from './data.js'

const mainEl = document.getElementById('menu')
const totalPrice = 26

function renderHTML() {
   const menuHTML = menuArr.map(function (arr) {
      return `
         <div class="menu-item-container">
            <div class="item-img">${arr.emoji}</div>
            <div class="item-info">
               <div class="item-name">${arr.name}</div>
               <div class="item-ingredients">${arr.ingredients.join(', ')}</div>
               <div class="item-price">$${arr.price}</div>
            </div>
            <button class="add-button">+</button>
         </div>
   `
   }).join('')
   mainEl.innerHTML += menuHTML
   mainEl.innerHTML += `
         <section class="checkout-container">
               <h2 class="orders-heading">Your Order</h2>
               <div class="orders-list">
                  <div class="orders-item-container">
                     <div class="orders-item-name">Hamburger <span class="remove-btn" id="removeBtn">remove</span></div>
                     <div class="orders-item-price">$12</div>
                  </div>
                  <div class="orders-item-container">
                     <div class="orders-item-name">Beer <span class="remove-btn" id="removeBtn">remove</span></div>
                     <div class="orders-item-price">$9</div>
                  </div>
                  <div class="orders-item-container">
                     <div class="orders-item-name">Pizza <span class="remove-btn" id="removeBtn">remove</span></div>
                     <div class="orders-item-price">$14</div>
                  </div>
               </div>
               <div class="divider"></div>
               <div class="total-container">
                  <div class="total-price-title">Total</div>
                  <div class="total-price" id="totalPrice">$${totalPrice}</div>
               </div>
               <button class="checkout-btn" id="checkout-btn">Checkout</button>
         </section>
   `

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

   // function order() {
   //    const orderArr = []
   //    function takeOrder() {

   //    }
   // }
   // order()
}

renderHTML()
