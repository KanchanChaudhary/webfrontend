$(document).ready(function () {
    let link = window.location.href;
    let feedbackid = link.split('?')[1];
    $('#btn-post-comment').click(function () {
        let comment = $('#txt-feedback').val();
        let userid = localStorage.getItem('userid');
        let username = localStorage.getItem('username');

        console.log(feedbackid);


        if (comment === '') {
            alert('Please write something')
        }
        else {
            $.ajax({
                url: 'http://localhost:8080/comment',
                type: 'POST',
                data: {
                    'feedbackid': feedbackid,
                    'comment': comment,
                    'userid': userid,
                    'username': username
                },
                success: function (data) {
                    if (data.added) {
                        setTimeout(function () {
                            window.location.reload()
                        }, 3000)
                    }
                    else if (!data.added) {
                        alert(data.message)
                    }
                }, error: function () {
                    alert('Something went wrong')
                }
            })
        }
    })

    $.getJSON('http://localhost:8080/comment/' + feedbackid, function (data) {
        let commentData = data.data
        $.each(commentData, function (index) {
            $('#comments-box').append(
                '<div class="comment-section col-sm-12" id="comments-container">' +
                ' <div class="comments-content">' +
                '<div class="commenter-name col-sm-1"> ' + commentData[index].username + ' </div>' +
                '<div class="comment col-sm-10"> ' + commentData[index].comment + ' </div>' +
                '</div>' +
                '</div>'
            )
        })
    })
})