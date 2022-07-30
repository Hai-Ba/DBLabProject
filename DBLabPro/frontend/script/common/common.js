// Các hàm dùng chung toàn chương trình
var CommonFn = CommonFn || {};


// Hàm ajax gọi lên server lấy dữ liệu
CommonFn.Ajax = (url, method, data, fnCallBack, async = true) => {
    $.ajax({
        url: url,
        method: method,
        async: async,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            fnCallBack(response);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    })
}

CommonFn.FormateDate = (string) => {
    let year = string.slice(0,4);
    let month = string.slice(5,7);
    let date = string.slice(8,10);
    return `${date}-${month}-${year}`;
}