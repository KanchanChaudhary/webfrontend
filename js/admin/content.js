$(document).ready(function () {
    $.getJSON('http://localhost:8080/content', function (data) {
        let contentTable = $('#content-table').DataTable();
        let contentData = data.data;
        $.each(contentData, function (index) {
            contentTable.row.add([
                contentData[index].contenttype,
                contentData[index].title,
                contentData[index].description,
                '<button id="btn-delete-content"  class="btn btn-danger" content_id="' + contentData[index]._id + '"> <i class="fa fa-trash"> </i> </button>'
            ]).draw(false)
        })
    })


    $('#content-table-body').on('click', '#btn-delete-content', function () {
        let id = $(this).attr('content_id');
        let confirm = window.confirm('Are you sure to delete');
        if (confirm) {
            deleteContent(id)
        }

    })

})

function deleteContent(contentid) {
    $.ajax({
        url: 'http://localhost:8080/content',
        type: 'DELETE',
        data: {
            'id': contentid,
        },
        success: function (data) {
            if (data.deleted) {
                alert(data.message)
                setTimeout(function () {
                    window.location.reload()
                }, 3000)
            }
            else if (!data.deleted) {
                alert(data.message)
            }
        },
        error: function () {
            alert('Something went wrong')
        }
    })
}

function AddContent() {
    let contenttype = $('#content-type').val();
    let title = $('#txt-title').val();
    let description = $('#txt-description').val();


    if (contenttype === '') {
        alert('Select content type')
    }

    else if (title === '') {
        alert('Enter title')

    }

    else if (description === '') {
        alert('Enter description')

    }

    else {
        $.ajax({
            url: 'http://localhost:8080/content',
            type: 'POST',
            data: {
                'contenttype': contenttype,
                'title': title,
                'description': description
            },
            success: function (data) {
                if (data.added) {
                    alert(data.message)
                    setTimeout(function () {
                        window.location.reload()
                    }, 3000)
                }
                else if (!data.added) {
                    alert(data.message)
                }
            },
            error: function () {
                alert('Something went wrong')
            }
        })
    }


}