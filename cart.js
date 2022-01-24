if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready())
} else {
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('removebtn');
    for (var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cartItemQty')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('addToCartButton')
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cart-title')[0]
    title = title.innerText
    var price = shopItem.getElementsByClassName('cart-price')[0]
    price = price.innerText
    var imgSrc = shopItem.getElementsByClassName('cart-image')[0]
    imgSrc = imgSrc.src
    addItemToCart(title,price,imgSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imgSrc){
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item already added to the cart!')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-row row align-items-start">
    <div class="col-3 mb-2">
      <img src="${imgSrc}" class="img-fluid" alt="">
    </div>
    <div class="col-2 mb-2">
      <h6 class="cart-title">${title}</h6>
    </div>
    <div class="col-4">
      <div class="input-group my-0 d-flex flex-row">
        <input type="number" name="qty" value="1" class="input-field-cart cartItemQty text-center">
      </div>
      <button type="button" class="removebtn btn btn-danger btn-sm my-2" id="removeCartButton"><i class="bi bi-trash"></i> Remove</button>
    </div>
    <div class="col-3">
      <p id="cartItemprice" class="cartPrice">${price}</p>
    </div>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('removebtn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cartItemQty')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var subtotal = 0
    var tax = 0
    var total = 0
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cartPrice')[0]
        var quantityElement = cartRow.getElementsByClassName('cartItemQty')[0]
        var price = parseFloat(priceElement.innerText.replace('Rp', ''))
        var quantity = quantityElement.value
        subtotal = subtotal + (price * quantity)
    }
    subtotal = subtotal * 1000
    tax = (subtotal * 5/100)
    total = (subtotal + tax)
    document.getElementsByClassName('cartSubtotal')[0].innerText = 'Rp' + subtotal
    document.getElementsByClassName('cartTax')[0].innerText = 'Rp' + tax
    document.getElementsByClassName('cartTotal')[0].innerText = 'Rp' + total
}