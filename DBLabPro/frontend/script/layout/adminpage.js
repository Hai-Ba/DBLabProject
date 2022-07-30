class Product{
    constructor(gridId){
        let me = this;
        me.grid = $(`#${gridId}`);
        me.getData();
        me.initEvent();
    }

    initEvent(){
        let me = this;
        //add new product
        $("#nav-add-product").click(function(){
            $("#add-product-form").css("display","flex");
        });
        // document.querySelector("#nav-add-product").onclick = () => {
        //     document.querySelector("#add-product-form").style.display = "flex";
        // }
        document.querySelector("#login-escape").onclick = () => {
            document.querySelector("#add-product-form").style.display = "none";
        }
        
        document.querySelector("#add-new-product").onclick = () => {
            let objProduct = {};
            objProduct.product_name = $("#product-name").val();
            objProduct.price = $("#product-price").val();
            objProduct.quantity = $("#product-quantity").val();
            objProduct.product_image = `../../assets/img/${$("#product-image").val()}`;
            $.post("http://localhost:8080/api/products", objProduct, function(data){
                if(data === "e001"){
                    alert("Trùng tên sản phẩm");
                }else{
                    location.reload(true);
                }
            });
        }
    }
    
    getData(){
        let me = this;
        // let data = products;
        // me.renderData(data);
        let url = "http://localhost:8080/api/products";
        $.get(url,function(response,status) {
            console.log(response[0]);
            me.renderData(response[0]);
        })
        
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
                    divChild3Child1 = $("<div></div>"),
                    divChild3Child2 = $("<div></div>");
                div.addClass("content-item");
                divChild1.addClass("content-item-name");
                imgChild.addClass("content-item-img");
                divChild2.addClass("content-item-price");
                divChild3.addClass("content-item-action");
                divChild3Child1.addClass("action-add");
                divChild3Child1.text("Modified Quantity");
                divChild3Child2.text("Delete From Store");
                divChild3Child2.addClass("action-delete");
                divChild3.attr("productid",`${item.product_id}`);
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
        }
        $(".action-delete").click(async function(){
            var idDelete = $(this).parent().attr("productid");
            await $.ajax({
                url: `http://localhost:8080/api/productOrders/${idDelete}`,
                type: 'DELETE',
                success: function(result) {
                    // location.reload(true); //Auto reload page
                }
            });
            await $.ajax({
                url: `http://localhost:8080/api/products/${idDelete}`,
                type: 'DELETE',
                success: function(result) {
                    location.reload(true); //Auto reload page
                }
            });
        });
        $(".action-add").click(function(){
            var idAddQuantity = $(this).parent().attr("productid");
            $("#add-quantity-form").css("display","flex");
            $("#add-escape").click(function(){
                $("#add-quantity-form").css("display","none");
            });
            $("#add-new-quantity").click(function(){
                let objQuantity = {};
                objQuantity.quantity = $("#product-quantity-add").val();
                $.ajax({
                    url: `http://localhost:8080/api/products/${idAddQuantity}`,
                    type: 'PUT',
                    data: objQuantity,
                    success: function(result) {
                        location.reload(true); //Auto reload page
                    }
                });
            });
            
        });
    }
}
var product = new Product("grid-container");
// Click

//Add new











