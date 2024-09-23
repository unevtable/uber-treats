import { menuArr } from './data.js'

const mainEl = document.getElementById('menu')
let orders = 0
const totalPrice = 26

function renderHTML() {
   const menuHTML = menuArr.map((arr) => {
      return `
         <div class="menu-item-container">
            <div class="item-img">${arr.emoji}</div>
            <div class="item-info">
               <div class="item-name">${arr.name}</div>
               <div class="item-ingredients">${arr.ingredients.join(', ')}</div>
               <div class="item-price">$${arr.price}</div>
            </div>
            <button class="add-button" id='addBtn' data-id='${arr.id}'>+</button>
         </div>
         <div class="divider"></div>
   `
   }).join('')
   mainEl.innerHTML += menuHTML

   toggler()

   document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-button')) {
         orders++
         orders === 1 ? renderCheckout() : ''
         renderOrder(Number(e.target.dataset.id))
      }

      if (e.target.classList.contains('remove-btn')) {
         orders--
         removeOrder(Number(e.target.dataset.id))
      }
   })
}

function renderCheckout() {
   mainEl.innerHTML += `
   <section class="checkout-container">
      <h2 class="orders-heading">Your Order</h2>
      <div class="orders-list"></div>
      <div class="divider"></div>
      <div class="total-container">
         <div class="total-price-title">Total</div>
         <div class="total-price" id="totalPrice">$${totalPrice}</div>
      </div>
      <button class="checkout-btn" id="checkout-btn">Checkout</button>
   </section>
   `
}

function renderOrder(orderId) {
   const ordersListEl = document.querySelector('.orders-list')
   const removeBtn = document.querySelector('#removeBtn')
   const targetOrderObj = menuArr.find((order) => {
      return order.id === orderId
   })

   const orderHTML = `
      <div class="orders-item-container">
         <div class="orders-item-name">${targetOrderObj.name}<span class="remove-btn" id="removeBtn"'>remove</span></div>
         <div class="orders-item-price">$${targetOrderObj.price}</div>
      </div>
      `
   ordersListEl.innerHTML += orderHTML
   console.log(`orders logged: ${orders}`);
}

function toggler() {
   const optionsEl = document.getElementById('toggleContainer')
   const deliveryOption = document.getElementById('deliveryOption')
   const pickupOption = document.getElementById('pickupOption')

   optionsEl.addEventListener('click', () => {
      deliveryOption.classList.toggle('selected')
      pickupOption.classList.toggle('selected')
   })
}

function removeOrder() {
   console.log('remove clicked');
}

renderHTML()