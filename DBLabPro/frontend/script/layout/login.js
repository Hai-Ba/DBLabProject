const login = $("#log-in"); //button ele
const form = $("form");
var userCurrent = {};
var userObj = {};
var adminArr = [];
var customerArr = [];
var error = "";
var isAdmin = false;
var isUserExist = false;

// Click on login button
document.getElementById("login-button").onclick = () => {
    document.querySelector("#login-popup").style.display = "flex";
}

document.querySelector("#login-escape").onclick = () => {
    document.querySelector("#login-popup").style.display = "none";
}

$.get("http://localhost:8080/api/admins",function(response,status) {
    adminArr = response[0];
})

$.get("http://localhost:8080/api/customers",function(response,status) {
    customerArr = response[0];
})

login.click(function(){  
    //USer local storage to login
    userObj.email = $("#user-email-input").val();
    userObj.password = $("#user-password-input").val();
    adminArr.forEach((value) => {
        if(JSON.stringify(value) === JSON.stringify(userObj)){
            isAdmin = true;
            form.attr("action","admin.html");
        }
    });
    if(!isAdmin){
        customerArr.forEach((value) => {
            if(userObj.email == "" || userObj.password == ""){
                error = "e001"; //Thieu user name, password
            }
            if((userObj.email === value.email) && (userObj.password !== value.password)){
                error = "e002"; //Sai mat khau
            }
            if((userObj.email === value.email) && (userObj.password === value.password)){
                isUserExist = true;
                window.localStorage.setItem("user",JSON.stringify(value));
                form.attr("action","userpage.html");
            }
        });
        if(!isUserExist && error == ""){
            error = "e003";
        }
        switch (error){
            case "e001":
                alert("Please fill all the box"); 
                break;
            case "e002":
                alert("Wrong password");
                break;
            case "e003":
                alert("User not exist! Please Register");
                break;
        }
    }
    console.log(userCurrent);
});



// async function changeAdminPage(){
//     alert("chage to admin");
// }



