$(document).ready(function () {
    $('#btn-contact').click(function () {
        let name = $('#txt-name').val();
        let email = $('#txt-email').val();
        let phone = $('#txt-phone').val();
        let message = $('#txt-message').val();
        let cmessage = $('#txt-cmessage').val();

        if (name === '') {
            $('#validate-name').text('Please enter your name');
            $('#txt-name').focus();
        }

        else if (!name.match('^[A-Z a-z a-z A-Z]{3,16}$')) {
            $('#validate-name').text('Please enter your name');
            $('#txt-name').focus();
        }


        else if (email === '') {
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

        else if (message === '') {
            $('#validate-message').text('Please enter your message');
            $('#txt-message').focus();
        }


        else {


            $.ajax({
                url: 'http://localhost:8080/contact',
                data: {
                    'name': name,
                    'phone': phone,
                    'email': email,
                    'message': message
                },
                type: 'POST',

                success: function (data) {
                    if (data.registered) {
                        alert(data.message)
                        setTimeout(function () {
                            window.location.reload();
                        }, 3000);
                    }
                    else if (!data.registered) {

                        alert(data.message);

                    }
                },

                error: function (err) {
                    alert('Something went wrong')
                }
            })
        }
    })
})