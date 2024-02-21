import { menuArray } from "./data.js";

let orderArray = []

function getitemsHtml(itemsArray) {
    return itemsArray.map(item => {
        return `<div id ="item-card">
                    <h2>${item.emoji}</h2>
                    <div id ="item-description">    
                        <h3>${item.name}</h3>
                        <p id="ingredients">${ item.ingredients}</p>
                        <h4>$${item.price}</h4>
                    </div>
                    <button id="add-button" data-add="${item.id}">+</button>
                </div><hr>`
                
    })
}

document.addEventListener(
    'click', function(e) {
        if (e.target.dataset.add) {
            addMenuItem(e.target.dataset.add)
            document.getElementById('order-container').style.display = 'block'
        }
        else if (e.target.dataset.remove) {
            removeOrderItem(e.target.dataset.remove)
        }
        else if (e.target.dataset.completeOrder){
            document.getElementById('payment-modal-container').style.display = 'block'
        }
        else if (e.target.dataset.close){
            document.getElementById('payment-modal-container').style.display = 'none'
        }
    }
)

document.getElementById('payment-modal-form').addEventListener(
    'submit', function(e) {
        e.preventDefault()
        paymentSuccessFeedback()
    }
)

function addMenuItem(itemId) {
     const order = menuArray.filter(function(item) {
        return item.id == itemId
    })[0]
    
orderArray.push(order)
document.getElementById('order-items').innerHTML = getOrder()
getTotalPrice()

}

function getOrder() {
    return orderArray.map(order => `<div id="order-card">
                                        <h3>${order.name}</h3>
                                        <p id="remove" data-remove= ${order.id}>remove</p>
                                        <h4 id="order-price">$${order.price}</h4>
                                    </div>`
    )
}

function getTotalPrice() {
    let totalPrice = orderArray.reduce(function(total, currentOrder) {
    return total + currentOrder.price
}, 0)
if (totalPrice == 0) {
    document.getElementById('order-container').style.display = 'none'
} else
document.getElementById('total-price-value').textContent =  `$${totalPrice}`
}

function removeOrderItem(orderId) {
    const orderItem = orderArray.filter(function (item) {
        return item.id == orderId
    })
    const index = orderArray.findIndex(orderItem => orderItem.id == orderId)
    const updatedArray = orderArray.splice(index, 1)
    document.getElementById('order-items').innerHTML = getOrder(updatedArray)
    getTotalPrice(updatedArray)
}

function paymentSuccessFeedback() {
    const paymentForm = document.getElementById('payment-modal-form')
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('name')
    
    document.getElementById('payment-modal-container').style.display = 'none'
    document.getElementById('order-container').style.display = 'block'
    document.getElementById('order-container').innerHTML = `<p id="success-feedback">Thanks, ${name}! Your order is on its way!</p>`
}

document.getElementById('items-container').innerHTML = getitemsHtml(menuArray)