class Product{
    constructor(gridId){
        let me = this;
        me.grid = $(`#${gridId}`);
        me.getData();
    }

    async getData(){
        let me = this;
        // let data = products;
        // me.renderData(data);
        let url = "http://localhost:8080/api/products";
        await $.get(url,function(response,status) {
            console.log(response[0]);
            me.renderData(response[0]);
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
    renderData(data){
        let me = this;
        if(data) {
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
    }
}
window.sessionStorage.clear();
window.localStorage.clear();
var product = new Product("grid-container");


