import { menuArr } from './data.js'

const menuEl = document.querySelector('main')
let orders = 0
let totalPrice = 0

function renderHTML() {
   window.onload = () => {
      setInterval(() => {
         document.querySelector('.loader').classList.add('loader-hidden')
      }, 1000);
   }

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
   menuEl.innerHTML += menuHTML

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

      e.target.classList.contains('toggle-option') ? optionsToggler() : ''

      e.target.classList.contains('checkout-btn') ? renderModal() : ''

      e.target.classList.contains('close-modal-button') ? closeModal() : ''

      e.target.classList.contains('close-form-button') ? closeForm() : ''

      e.target.classList.contains('submit-form-button') ? submitForm() : ''

      if (e.target.closest('.card-method')) {
         cardMethodForm()
      } else if (e.target.closest('.cod-method')) {
         codMethodForm()
      }
   })
}

function renderCheckoutSection() {
   if (!document.querySelector('.checkout-container')) {
      menuEl.innerHTML += `
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

   ordersListEl.innerHTML += `
      <div class="orders-item-container" data-id='${orderId}'>
         <div class="orders-item-name">${targetOrderObj.name}<span class='remove-btn' data-id='${orderId}'>remove</span></div>
         <div class="orders-item-price">$${targetOrderObj.price}</div>
      </div>
      `

   updateTotalPrice()
}

function removeOrder(orderId) {
   document.querySelector(`.orders-item-container[data-id='${orderId}']`).remove()
   !orders ? document.querySelector(`.checkout-container`).remove() : ''

   const targetOrderObj = menuArr.find((order) => order.id === orderId)
   totalPrice -= targetOrderObj.price

   updateTotalPrice()
}

function optionsToggler() {
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
   renderLoader()

   menuEl.classList.add('pointer-none')

   if (!document.querySelector('.payment-modal')) {
      document.querySelector('.container').innerHTML += `
      <div class="payment-modal id="paymentModal">
         <div class="payment-methods-title-container">
            <div class="payment-methods-title">Payment Methods</div>
            <button class="close-modal-button" id="closeModalBtn">✖</button>
         </div>
         <div class="cod-method payment-methods-container">
            <div class="payment-icon-container">
               <svg class="payment-method-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
               <div class="payment-methods">Cash on Delivery</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
         </div>
         <div class="card-method payment-methods-container ">
            <div class="payment-icon-container">
               <svg class="payment-method-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
               <div class="payment-methods">Credit or Debit Cards</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
         </div>
         <div class="upi-method payment-methods-container disabled">
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

function closeModal() {
   document.querySelector('.payment-modal').remove()
   document.querySelector('main').classList.remove('pointer-none')
}

function cardMethodForm() {
   document.querySelector('.container').innerHTML += `
         <form class='form-container'>
               <div class="form-header">
                  <svg class="payment-method-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round" class="feather feather-credit-card">
                     <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                     <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  <h2 class="form-header-title">Card Details</h2>
                  <button class="close-form-button" id="closeFormBtn">✖</button>
               </div>
               <div class="name-input-group full-width-group">
                  <label for="name">Name on Card</label>
                  <input type="text" id="name" name="name" placeholder="Jordan Carter" required>
               </div>
               <div class="cardnumber-input-group full-width-group">
                  <label for="cardnumber">Card Number</label>
                  <input type="text" pattern="[0-9]{19}" inputmode="numeric" id="cardnumber" name="cardnumber"
                     placeholder="XXXX XXXX XXXX XXXX" maxlength="19" required>
               </div>
               <div class="cvv-and-date-input-group">
                  <div class="cvv-input-group">
                     <label for="cvv">CVV</label>
                     <input type="text" pattern="[0-9]{3}" inputmode="numeric" id="cvv" name="cvv" placeholder="123"
                           maxlength="3" required>
                  </div>
                  <div class="date-input-group">
                     <label for="expirydate">Expiration Date</label>
                     <input type="text" pattern="[0-9]{2}" inputmode="numeric" id="expirydate" name="expirydate"
                           placeholder="MM" maxlength="2" required>
                     <div>/</div>
                     <input type="text" pattern="[0-9]{2}" inputmode="numeric" id="expirydate" name="expirydate"
                           placeholder="YY" maxlength="2" required>
                  </div>
               </div>
               <div class="coupon-code-input-group full-width-group">
                  <label for="couponcode">Coupon Code<span>(if any)</span></label>
                  <input type="text" id="couponcode" name="couponcode" maxlength="6" placeholder="EFGHI2">
               </div>
               <div class="save-checkbox">
                  <input type="checkbox" id="savecheckbox" name="savecheckbox">
                  <label for="savecheckbox">Save this card for later.</label>
               </div>
               <input type="submit" value="Submit">
         </form>
   `
}

function codMethodForm() {
   document.querySelector('.container').innerHTML += `
      <form class='form-container'>
            <div class="form-header">
                <svg class="payment-method-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="feather feather-truck">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <h2 class="form-header-title">Delivery Address</h2>
                <button class="close-form-button" id="closeFormBtn">✖</button>
            </div>
            <div class="name-input-group full-width-group">
                <label for="name">Full name</label>
                <input type="text" id="name" name="name" placeholder="Jordan Carter" required>
            </div>
            <div class="mobile-number-input-group full-width-group">
                <label for="mobilenumber">Mobile number</label>
                <input type="text" pattern="[0-9]{10}" inputmode="numeric" id="mobilenumber" name="mobilenumber"
                    placeholder="XXXXXXXXXX" maxlength="10" required>
            </div>
            <div class="address-1-input-group full-width-group">
                <label for="address1">Flat, House no., Building, Company, Apartment</label>
                <input type="text" id="address1" name="address1" required>
            </div>
            <div class="address-2-input-group full-width-group">
                <label for="address2">Area, Street, Sector, Village</label>
                <input type="text" id="address2" name="address2">
            </div>
            <div class="landmark-input-group full-width-group">
                <label for="landmark">Landmark</label>
                <input type="text" id="landmark" name="landmark" placeholder="E.g. near apollo hospital">
            </div>
            <div class="town-input-group full-width-group">
                <label for="town">Town/City</label>
                <input type="text" id="town" name="town" required>
            </div>
            <div class="pincode-state-input-group">
                <div class="pincode-input-group">
                    <label for="pincode">Pincode</label>
                    <input type="text" pattern="\d*" inputmode="numeric" id="pincode" name="pincode"
                        placeholder="123123" maxlength="6" required>
                </div>
                <div class="state-input-group">
                    <label for="state">State</label>
                    <select id="state" name="state">
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="GA">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="GA">Goa</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ML">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OR">Odisha</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TG">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UT">Uttarakhand</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="WB">West Bengal</option>
                        <option value="AN">Andaman and Nicobar Islands</option>
                        <option value="CH">Chandigarh</option>
                        <option value="DN">Dadra and Nagar Haveli</option>
                        <option value="DD">Daman and Diu</option>
                        <option value="DL">Delhi</option>
                        <option value="LD">Lakshadweep</option>
                        <option value="PY">Puducherry</option>
                    </select>
                </div>
            </div>
            <div class="save-checkbox">
                <input type="checkbox" id="savecheckbox" name="savecheckbox">
                <label for="savecheckbox">Make this my default address</label>
            </div>
            <input type="submit" class="submit-form-button" value="Use this address">
        </form>
   `
}

function closeForm() {
   document.querySelector('form').remove()
}

function submitForm() {
   renderLoader()
}

function renderLoader() {
   document.querySelector('.loader').classList.remove('loader-hidden')

   setTimeout(() => {
      document.querySelector('.loader').classList.add('loader-hidden')
   }, 1000)
}

renderHTML()