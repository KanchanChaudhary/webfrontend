$(document).ready(function(){
    $('#btn-signup').click(function(){
        let name= $('#txt-name').val();
        let email= $('#txt-email').val();
        let phone= $('#txt-phone').val();
        let password= $('#txt-password').val();
        let cpassword= $('#txt-cpassword').val();

        if(name===''){
            $('#validate-name').text('Please enter your name');
            $('#txt-name').focus();
        }

        else if(!name.match('^[A-Z a-z a-z A-Z]{3,16}$')){
            $('#validate-name').text('Please enter your name');
            $('#txt-name').focus();
        }
        

       else if(email===''){
            $('#validate-email').text('Please enter your email');
            $('#txt-email').focus();
        }

        else if (!email.match('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')) {
            $('#validate-email').text('Please enter valid email');
            $('#txt-email').focus();
        }

        else if (phone == "") {
            $('#validate-phone').text('Please enter  phone number');
            $('#txt-phone').focus();
        }

        else if (!phone.match('([0-9 + -]+).{7,}')) {
            $('#validate-phone').text('Please enter valid phone');
            $('#txt-phone').focus();
        }

        else if(password===''){
            $('#validate-password').text('Please enter your password');
            $('#txt-password').focus();
        }

        else if(cpassword!=password){
            $('#validate-cpassword').text('Please re enter same password');
            $('#txt-cpassword').focus();
        }

        else{

          
            $.ajax({
                url:'http://localhost:8080/users/signup',
                data:{
                    'name':name,
                    'phone':phone,
                    'email':email,
                    'password':password
                },
                type:'POST',

                success: function(data){
                   if(data.registered){
                    $('#signup-validation').removeClass('alert-danger');
                    $('#signup-validation').addClass('alert-success');
                    $('#signup-validation').text(data.message);
                    $('#signup-validation').fadeIn(100);
                    setTimeout(function(){
                        window.location.reload();
                    },3000)
                   }
                   else if(!data.registered){
                    $('#signup-validation').removeClass('alert-success');
                    $('#signup-validation').addClass('alert-danger');
                    $('#signup-validation').text(data.message);
                    $('#signup-validation').fadeIn(100);
                   }
                },

                error: function(err){
                    $('#signup-validation').removeClass('alert-success');
                    $('#signup-validation').addClass('alert-danger');
                    $('#signup-validation').text(data.message);
                    $('#signup-validation').fadeIn(100);
                }
            })
        }
    })
})