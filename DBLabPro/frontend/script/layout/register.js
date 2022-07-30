const register = $("#register");
var userRegister = {};
// Click on Register button
document.getElementById("register-button").onclick = () => {
    document.querySelector("#register-popup").style.display = "flex";
}

document.querySelector("#register-escape").onclick = () => {
    document.querySelector("#register-popup").style.display = "none";
}

register.click(function(){
    userRegister.full_name = $("#register-name").val();
    userRegister.dob = $("#register-dob").val();
    userRegister.email = $("#register-email").val();
    userRegister.password = $("#register-password").val();
    $.post("http://localhost:8080/api/customers/register", userRegister, function(data){
        if(data === "e001"){
            alert("Tên đăng nhập đã tồn tại");
        }
        location.reload(true);
    });
});

