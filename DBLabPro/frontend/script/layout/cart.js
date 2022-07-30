var userCurrent = {};

if(window.localStorage.length != 0){
    userCurrent = JSON.parse(window.localStorage.getItem("user"));
}

function renderData(userCur){
    //navbar
    let navbar = $("#nav-user-access"),
        navdiv1 = $("<div></div>"),
        navdiv2 = $("<div></div>"),
        nava = $("<a></a>");
    navdiv2.addClass("button");
    navdiv1.addClass("button");
    nava.addClass("button");
    navdiv1.attr("id","cart-button");
    navdiv2.attr("id","user-button");
    nava.attr("id","logout-button");
    nava.attr("href","homepage.html");
    navdiv1.text("Cart");
    navdiv2.text(`Hello,${userCur.full_name}`);
    nava.text("Logout");
    navbar.append(navdiv1);
    navbar.append(navdiv2);
    navbar.append(nava);

    //content
    for(let key of Object.keys(localStorage)){
        if(key == "user" || key == "__paypal_storage__"){
            continue;
        }
        let grid = $("#order-grid"),
            order = $("<div></div>"),
            orderName = $("<div></div>"),
            orderPrice = $("<div></div>"),
            orderQuan = $("<div></div>"),
            orderQuanDown = $("<div></div>"),
            orderQuanNumber = $("<div></div>"),
            orderQuanUp = $("<div></div>");
        order.addClass("orders");
        orderName.addClass("product-name");
        orderPrice.addClass("product-price");
        orderQuan.addClass("order-quantity");
        orderQuan.attr("id",key);
        orderQuanDown.addClass("quantity-adjust down");
        orderQuanUp.addClass("quantity-adjust up");
        orderQuanNumber.addClass("number-order");
        //Todo  
        orderName.text(`${JSON.parse(localStorage.getItem(key)).product_name}`);
        orderPrice.text(`${JSON.parse(localStorage.getItem(key)).price}USD`);
        orderQuanDown.text("-");
        orderQuanUp.text("+");
        orderQuanNumber.text("1");
        //Apend
        orderQuan.append(orderQuanDown);
        orderQuan.append(orderQuanNumber);
        orderQuan.append(orderQuanUp);
        order.append(orderName);
        order.append(orderPrice);
        order.append(orderQuan);
        grid.append(order);
    }
}
var total = 0;
var totalPrice = $("#total-price");
renderData(userCurrent);
if(localStorage.length == 2){
    totalPrice.text("0USD");
} else{
    for(let key of Object.keys(localStorage)){
        if(key == "user" || key == "__paypal_storage__"){
            continue;
        }
        total += JSON.parse(localStorage.getItem(key)).price * 1;
    }
    totalPrice.text(`${total}USD`);
}
$("#cart-button").click(function(){
    //Todo
    location.assign("cart.html");
});
$("#user-button").click(function(){
    //Todo
    location.assign("userinfo.html");
});
$(".up").click(function(){

    if($(this).prev().text()*1 == JSON.parse(localStorage.getItem($(this).parent().attr("id"))).quantity){
        alert("cannot Buy more");
    }
    else{
        $(this).prev().text(`${$(this).prev().text() * 1 + 1}`);
        let price = JSON.parse(localStorage.getItem($(this).parent().attr("id"))).price * 1,
            number = $(this).prev().text() * 1;
        total += price;
        $(this).parent().prev().text(`${price*number}VND`);
        totalPrice.text(`${total}VND`);
    }
});
$(".down").click(function(){
    if($(this).next().text() == 1){
        localStorage.removeItem(`${JSON.parse(localStorage.getItem($(this).parent().attr("id"))).product_id}`);
        location.reload(true);
    }
    else{
        $(this).next().text(`${$(this).next().text() * 1 - 1}`);
        let price = JSON.parse(localStorage.getItem($(this).parent().attr("id"))).price * 1,
            number = $(this).next().text() * 1;
        total -= price;
        $(this).parent().prev().text(`${price*number}VND`);
        totalPrice.text(`${total}VND`);
    }
    
});
// $(".cart-buy").click(async function(){
//     if(total > 0){
//         await buyClick();
//         sessionStorage.setItem("totalPrice",`${total}`);
//         // location.reload(true);
//         // alert(`Pay ${total} successfully`);
//         alert("Direct to paying page");
//         location.assign("cartpay.html");
//     }
// });
paypal.Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total // Can also reference a variable or function
          }
        }]
      });
    },
    // Finalize the transaction after payer approval
    onApprove: (data, actions) => {
    //   await buyClick();
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        const transaction = orderData.purchase_units[0].payments.captures[0];
        alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
        buyClick();
        // When ready to go live, remove the alert and show a success message within this page. For example:
        // const element = document.getElementById('paypal-button-container');
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
    });
}
}).render('#paypal');

async function buyClick(){
    //add to order TODO
    let objProduct = {},
        orderId = 0;
    objProduct.total_price = total;
    objProduct.customer_id = JSON.parse(localStorage.getItem("user")).customer_id * 1;
    await $.post("http://localhost:8080/api/orders", objProduct, function(data){
        if(data === "e001"){
            alert("them order sai");
        } else{
            orderId = data;
        }
    });
    
    for(let key of Object.keys(localStorage)){
        if(key == "user" || key == "__paypal_storage__"){
            continue;
        }
        //Modified quantity
        let objQuantity = {},
            objOrder = {};
        objQuantity.quantity = JSON.parse(localStorage.getItem(key)).quantity * 1 - $(`#${key}`).children("div.number-order").text() * 1;
        objOrder.order_id = orderId;
        objOrder.product_id = key * 1;
        objOrder.order_quantity = $(`#${key}`).children("div.number-order").text() * 1;
        await $.ajax({
            url: `http://localhost:8080/api/products/${key}`,
            type: 'PUT',
            data: objQuantity,
            success: function(result) {
                // location.reload(true); //Auto reload page
            }
        });

        await $.post("http://localhost:8080/api/productOrders", objOrder, function(data){
            if(data === "e001"){
                alert("sai them tung order");
            }
        });
        localStorage.removeItem(key);
        location.reload(true);
    }
}

