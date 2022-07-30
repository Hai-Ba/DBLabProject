class Product{
    constructor(gridId,userCur){
        let me = this;
        me.grid = $(`#${gridId}`);
        me.getData(userCur);
    }

    async getData(userCur){
        let me = this;
        // let data = products;
        // me.renderData(data);
        let url = "http://localhost:8080/api/products";
        await $.get(url,function(response,status) {
            console.log(response[0]);
            me.renderData(response[0],userCur);
        })
        me.initEvent();
    }

    initEvent(){
        $(".action-buy").click(function(){
            //TODO check if is login
            if(window.localStorage.length == 0){
                alert("You need login to buy:))))");
            }
            // window.localStorage.setItem("productid",$(this).attr("productid"));// Luu productid vao local storage
            // location.assign("productpage.html");
        });
    }
    /**
     * Render Du Lieu
     * @param {*} data 
     */
    renderData(data,userCur){
        let me = this;
        if(data && JSON.stringify(userCur) === JSON.stringify({})) {
            data.filter(function(item) {
                let div = $("<div></div>"),
                    divChild1 = $("<div></div>"),
                    imgChild = $("<img>"),
                    divChild2 = $("<div></div>"),
                    divChild2Child1 = $("<div></div>"),
                    divChild2Child2 = $("<div></div>"),
                    divChild3 = $("<div></div>"),
                    divChild3Child1 = $("<div></div>");
                div.addClass("content-item");
                divChild1.addClass("content-item-name");
                imgChild.addClass("content-item-img");
                divChild2.addClass("content-item-price");
                divChild3.addClass("content-item-action");
                divChild3Child1.addClass("action-buy");
                divChild3Child1.attr("productid",`${item.product_id}`);
                divChild3Child1.text("Buy");
                divChild1.text(item.product_name);
                divChild2Child1.text(`${item.price}VND`);
                divChild2Child2.text(`SL: ${item.quantity}`);
                divChild2.append(divChild2Child1);
                divChild2.append(divChild2Child2);
                imgChild.attr("src",item.product_image);
                divChild3.append(divChild3Child1);
                div.append(divChild1);
                div.append(imgChild);
                div.append(divChild2);
                div.append(divChild3);
                me.grid.append(div);
            });
        }
        if(data && JSON.stringify(userCur) !== JSON.stringify({})) {
            let navbar = $("#nav-user-access"),
                navdiv1 = $("<div></div>"),
                navdiv2 = $("<div></div>"),
                nava = $("<a></a>");
            navdiv1.addClass("button");
            navdiv2.addClass("button");
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

            //Content
            data.filter(function(item) {
                let div = $("<div></div>"),
                    divChild1 = $("<div></div>"),
                    imgChild = $("<img>"),
                    divChild2 = $("<div></div>"),
                    divChild2Child1 = $("<div></div>"),
                    divChild2Child2 = $("<div></div>"),
                    divChild3 = $("<div></div>"),
                    divChild3Child1 = $("<div></div>"),
                    divChild3Child2 = $("<div></div>");
                div.addClass("content-item");
                divChild1.addClass("content-item-name");
                imgChild.addClass("content-item-img");
                divChild2.addClass("content-item-price");
                divChild3.addClass("content-item-action");
                divChild3Child1.addClass("action-buy");
                divChild3Child1.attr("id",`${item.product_id}`);
                divChild3Child1.text("Buy");
                // divChild3Child2.text("Add to cart");
                // divChild3Child2.addClass("action-addcart");
                divChild1.text(item.product_name);
                divChild2Child1.text(`${item.price}VND`);
                divChild2Child2.text(`SL: ${item.quantity}`);
                divChild2.append(divChild2Child1);
                divChild2.append(divChild2Child2);
                imgChild.attr("src",item.product_image);
                divChild3.append(divChild3Child1);
                divChild3.append(divChild3Child2);
                div.append(divChild1);
                div.append(imgChild);
                div.append(divChild2);
                div.append(divChild3);
                me.grid.append(div);
            });
            $(".action-buy").click(function(){
                //Todo
                var isInCart = false;
                var idInCart = 0;
                for(let key of Object.keys(localStorage)){
                    if(key == $(this).attr("id")){
                        isInCart = true;
                        idInCart = key;
                    }
                }
                if(!isInCart){
                    $.get(`http://localhost:8080/api/products/${$(this).attr("id")}`,function(response){
                        if(response[0][0].quantity > 0) {
                            localStorage.setItem(`${response[0][0].product_id}`,JSON.stringify(response[0][0]));
                            alert(`Add ${response[0][0].product_name} to cart successfully`);
                        }
                        else {
                            alert("Out of number!!!!");
                        }
                    })
                } 
                if(isInCart){
                    alert(`${JSON.parse(localStorage.getItem(idInCart)).product_name} is already in the cart`);
                }
            });
            $("#cart-button").click(function(){
                //Todo
                location.assign("cart.html");
            });
            $("#user-button").click(function(){
                //Todo
                location.assign("userinfo.html");
            });
        }
    }
}
var userCurrent = {};
if(window.localStorage.length != 0){
    userCurrent = JSON.parse(window.localStorage.getItem("user"));
    $("#login-button").css("display","none");
    $("#register-button").css("display","none");
}
var product = new Product("grid-container",userCurrent);


