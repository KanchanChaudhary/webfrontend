$(document).ready(function () {
    $('#btn-login').click(function () {
        let email = $('#txt-email').val();
        let password = $('#txt-password').val();

        if (email === '') {
            $('#validate-email').text('Please enter your email');
            $('#txt-email').focus();
        }

        else if (password === '') {
            $('#validate-password').text('Please enter your password');
            $('#txt-password').focus();
        }

        else {

            $.ajax({
                url: 'http://localhost:8080/users/login',
                data: {
                    'email': email,
                    'password': password
                },
                type: 'POST',

                success: function (data) {
                    if (data.loggedin && data.userdata.usertype === 'normal') {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userid', data.userdata._id);
                        localStorage.setItem('username', data.userdata.name);
                        localStorage.setItem('userphone', data.userdata.phone);
                        localStorage.setItem('useremail', data.userdata.email);
                        window.location.href = 'homepage.html';

                    }

                    if (data.loggedin && data.userdata.usertype === 'admin') {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userid', data.userdata._id);
                        localStorage.setItem('username', data.userdata.name);
                        window.location.href = 'admin/index.html';

                    }
                    else if (!data.loggedin) {
                        $('#login-validation').removeClass('alert-success');
                        $('#login-validation').addClass('alert-danger');
                        $('#login-validation').text(data.message);
                        $('#login-validation').fadeIn(100);
                    }
                },

                error: function (err) {
                    $('#login-validation').removeClass('alert-success');
                    $('#login-validation').addClass('alert-danger');
                    $('#login-validation').text(data.message);
                    $('#login-validation').fadeIn(100);
                }
            })
        }
    })
})