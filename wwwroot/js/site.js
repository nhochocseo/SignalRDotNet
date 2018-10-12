// creater a connection for signal r
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

// recevice the message
connection.on("ReceiveMessage", (user, message) => {
    const rec_msg = user + ":" + message;
    const li = document.createElement("li");
    li.textContent = rec_msg;
    document.getElementById("messagesList").appendChild(li);
    $.ajax({
        type: "GET",
        url: "/api/StudentAPI/GetAllStudents",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            //alert(JSON.stringify(data));                  
            $("#DIV").html('');
            var DIV = '';
            $.each(data, function(i, item) {
                var rows = "<tr>" +
                    "<td id='RegdNo'>" + item.regNo + "</td>" +
                    "<td id='Name'>" + item.name + "</td>" +
                    "<td id='Address'>" + item.address + "</td>" +
                    "<td id='PhoneNo'>" + item.phoneNo + "</td>" +
                    "<td id='AdmissionDate'>" + Date(item.admissionDate,
                        "dd-MM-yyyy") + "</td>" +
                    "</tr>";
                $('#Table').append(rows);
            }); //End of foreach Loop   
            console.log(data);
        }, //End of AJAX Success function  

        failure: function(data) {
            alert(data.responseText);
        }, //End of AJAX failure function  
        error: function(data) {
                alert(data.responseText);
            } //End of AJAX error function  

    });
})

connection.start().catch(err => console.err(err.toString()));

//send the message
document.getElementById("sendMessage").addEventListener("click", event => {
    const user = document.getElementById("userName").value;
    const message = document.getElementById("userMessage").value;

    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
    event.preventDefault();
});