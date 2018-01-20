let request = require('superagent');
var $ =  require('jquery');


$("#e_reg_submit").on("click",function(event)
{
   let name = $("#name").val();
   let email = $("#email").val();
   let phone_no = $("#phone_no").val();
   let manager_id = $("#manager_id").val();
   let write_access = $("#write_access").val();
   let read_access = $("#read_access").val();
   request
       .post('/api/employees/register')
       .send({name: name, email:email, phone_no:phone_no, manager_id:manager_id, write_access:write_access, read_access:read_access})
       .set('Accept','application/json')
});

$("#mlogin_form_submit").on( "click", function( event ) {

    let email = $("#f_email").val();
    let password = $("#f_password").val();
    request
        .post('/api/managers/login')
        .send({ email: email, password: password })
        .set('Accept', 'application/json')
        .then(function() {
            alert("Managers Log in Successful");
            window.location = "/dashboard/"+email;
        });
});

$("#elogin_form_submit").on( "click", function( event ) {

    let email = $("#email").val();
    let phone_no = $("#phone_no").val();
    request
        .post('/api/employees/login')
        .send({ email: email, phone_no: phone_no })
        .set('Accept', 'application/json')
        .then(function() {
            alert("Employee Log in Successful");
            window.location = "/dashboard1/"+email;
        });
});

$("#test").on("click",function(event)
{
    alert("Test has click");
    // request
    // 	.post ("/dashboard1");
    window.location = "/dashboard1";
});