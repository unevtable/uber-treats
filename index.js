import { menuArr } from './data.js'

const mainEl = document.getElementById('menu')
let orders = 0
let totalPrice = 0

feather.replace()

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

      e.target.classList.contains('checkout-btn') ? renderModal() : ''
   })
}

function renderCheckoutSection() {
   if (!document.querySelector('.checkout-container')) {
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

function renderModal() {
   if (!document.querySelector('.payment-modal')) {
      return document.querySelector('.container').innerHTML += `
      <div class="payment-modal id="paymentModal">
         <div class="payment-methods-container disabled">
            <div class="error-message" id="errorMessage">This service is not available right now.</div>
            <div class="payment-icon-container">
               <svg class="payment-method-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
               <div class="payment-methods">Cash on Delivery</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
         </div>
         <div class="payment-methods-container">
            <div class="payment-icon-container">
               <svg class="payment-method-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
               <div class="payment-methods">Credit or Debit Cards</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
         </div>
         <div class="payment-methods-container">
            <div class="payment-icon-container">
               <svg class="payment-method-icon upi" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                     width="32" height="32" fill-rule="evenodd">
                     <path d="M55.05 32.542L38.715 0l-18.15 64z" fill="#888888" />
                     <path d="M43.433 32.542L27.1 0 8.95 64z" fill="#162328" />
               </svg>
               <div class="payment-methods">Any UPI</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
         </div>
   </div>
   `}
}

renderHTML()