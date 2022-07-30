var userCurrent = {};
if(window.localStorage.length != 0){
    userCurrent = JSON.parse(window.localStorage.getItem("user"));
}

renderData(userCurrent);
$("#cart-button").click(function(){
    //Todo
    location.assign("cart.html");
});
$("#user-button").click(function(){
    //Todo
    location.assign("userinfo.html");
});

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
    let userName = $("#user-name"),
        userDob = $("#user-dob"),
        userAccount = $("#user-account"),
        userPassword = $("#user-password"),
        userNameInput = $("<div></div>"),
        userDobInput = $("<div></div>"),
        userAccountInput = $("<div></div>"),
        userPasswordInput = $("<div></div>");
    userNameInput.text(`${userCur.full_name}`);
    userDobInput.text(CommonFn.FormateDate(`${userCur.dob}`));
    userAccountInput.text(`${userCur.email}`);
    userPasswordInput.text(`${userCur.password}`);
    userName.append(userNameInput);
    userDob.append(userDobInput);
    userAccount.append(userAccountInput);
    userPassword.append(userPasswordInput);
}






