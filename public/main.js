let request = require('superagent');
var $ =  require('jquery');


// $('#write_access').click(function() {
//     $("#txtAge").toggle(this.checked);
// });
//
// $('#read_access').click(function() {
//     $("#txtAge").toggle(this.checked);
// });

$("#e_reg_submit").on("click",function(event)
{
    console.log('Click');
    console.log("Write access "+document.getElementById('write_access').checked);
    console.log("Read Access "+document.getElementById('read_access').checked);
    var memail = document.getElementById('memail').textContent;
    let write_access = document.getElementById('write_access').checked;
    let read_access = document.getElementById('read_access').checked;
    let name = $("#name").val();
    let email = $("#email").val();
    let phone_no = $("#phone_no").val();
    let manager_id = $("#manager_id").val();

   request
       .post('/api/employees/register/'+memail)
       .send({name: name, email:email, phone_no:phone_no, manager_id:manager_id, write_access:write_access, read_access:read_access})
       .set('Accept','application/json')
       .then(function() {
        alert("Employee is Created");
    });

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

$("#btn_file_submit").on( "click", function( event ) {
    console.log("Click");
     //var file = this.refs.File.getDOMNode().files[0];

    var files = document.getElementById('file_input').files;
    var formData = new FormData();
    var email = document.getElementById('email').textContent;

    for (var key in files) {
        // is the item a File?
        if (files.hasOwnProperty(key) && files[key] instanceof File) {
            formData.append(key, files[key]);
        }
    }
    console.log("Body Email: "+email);
    request
        .post('/api/files/'+email)
        .send(formData)
        // .end((err, res) => {
        //     console.log(err);
        //     console.log(res);
        // });
    .then(function(){
        alert("Document is Uploaded Successfully");
    })
});

$("#read_files").on( "click", function( event ) {
    console.log("Read file clicked");
    request
        .get('/api/files/read')
        .then(function(res) {
            console.log(res.body);
            let bookmarksResults = document.getElementById('files_list');
                for(let i=0;i<res.body.length;i++){
                let name = res.body[i].name;
                let time = res.body[i].time_stamp;
                bookmarksResults.innerHTML += '<div class="well"' +
                    '<h3>'+name +
                    '<h5>'+time+'</h5>'+
                    '</h3>' +
                    '<button>'+'Get'+'</button>'+
                    '</div>';

            }
        });
});
