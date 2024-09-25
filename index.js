import { menuArr } from './data.js'

const mainEl = document.getElementById('menu')
let orders = 0
let totalPrice = 0

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

   document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-button')) {
         orders++
         totalPriceCal(Number(e.target.dataset.id))
         renderOrder(Number(e.target.dataset.id))
      }

      if (e.target.classList.contains('remove-btn')) {
         orders--
         removeOrder(Number(e.target.dataset.id))
      }

      e.target.classList.contains('toggle-option') ? toggler() : ''
   })
}

function renderCheckoutSection() {
   if (!document.querySelector('.checkout-conatiner')) {
      mainEl.innerHTML += `
         <section class="checkout-container">
            <h2 class="orders-heading">Your Order</h2>
            <div class="orders-list"></div>
            <div class="divider"></div>
            <div class="total-container">
               <div class="total-price-title">Total</div>
               <div class="total-price" id="totalPrice">$${totalPrice}</div>
            </div>
            <button class="checkout-btn" id="checkoutBtn">Checkout</button>
         </section>
      `
   }
   updateTotalPrice()
   payment()
}

function renderOrder(orderId) {
   const ordersListEl = document.querySelector('.orders-list')
   const targetOrderObj = menuArr.find((order) => order.id === orderId)

   const orderHTML = `
      <div class="orders-item-container" data-id='${orderId}'>
         <div class="orders-item-name">${targetOrderObj.name}<span class='remove-btn' data-id='${orderId}'>remove</span></div>
         <div class="orders-item-price">$${targetOrderObj.price}</div>
      </div>
      `
   ordersListEl.innerHTML += orderHTML
   updateTotalPrice()
}

function removeOrder(orderId) {
   document.querySelector(`.orders-item-container[data-id='${orderId}']`).remove()
   if (!orders) {
      document.querySelector(`.checkout-container`).remove()
   }
   const targetOrderObj = menuArr.find((order) => order.id === orderId)
   totalPrice -= targetOrderObj.price
   updateTotalPrice()
}

function toggler() {
   const deliveryOption = document.getElementById('deliveryOption')
   const pickupOption = document.getElementById('pickupOption')

   deliveryOption.classList.toggle('selected')
   pickupOption.classList.toggle('selected')
}

function totalPriceCal(orderId) {
   const targetOrderObj = menuArr.find((order) => order.id === orderId)
   totalPrice += targetOrderObj.price
   orders === 1 ? renderCheckoutSection(orderId) : ''
}

function updateTotalPrice() {
   if (document.getElementById('totalPrice')) {
      document.getElementById('totalPrice').textContent = `$${totalPrice}`
   }
}

function payment() {
   document.getElementById('checkoutBtn').addEventListener('click', () => {
      console.log('checkout clicked')
   })
}

renderHTML()