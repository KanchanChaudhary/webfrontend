$(document).ready(function () {

    $.getJSON('http://localhost:8080/candiate', function (data) {
        let candiateTable = $('#candiate-table').DataTable();
        let candiateData = data.data;
        $.each(candiateData, function (index) {
            candiateTable.row.add([
                candiateData[index].partyname,
                candiateData[index].candiatenname,
                '<img src="http://localhost:8080/asset/uploads/images/candiate/' + candiateData[index].image + '" class="img-thumbnail img-responsive" width="100px" height="100px">',
                '<button id="btn-delete-candiate"  class="btn btn-danger"  candiate_id="' + candiateData[index]._id + '"> <i class="fa fa-trash"> </i> </button>'
            ]).draw(false)
        })
    })


    $('#candiate-table-body').on('click', '#btn-delete-candiate', function () {
        let id = $(this).attr('candiate_id');
        let confirm = window.confirm('Are you sure to delete');
        if (confirm) {
            deletecandiate(id)
        }

    })


    $.getJSON('http://localhost:8080/candiate', function (data) {
        let candiateTable = $('#votestable').DataTable();
        let candiateData = data.data;
        $.each(candiateData, function (index) {
            candiateTable.row.add([
                candiateData[index].partyname,
                candiateData[index].candiatenname,
                '<img src="http://localhost:8080/asset/uploads/images/candiate/' + candiateData[index].image + '" class="img-thumbnail img-responsive" width="100px" height="100px">',
                '<button id="btn-vote"  class="btn btn-success"' +
                'candiate_name="' + candiateData[index].candiatenname + '"' +
                'party_name="' + candiateData[index].partyname + '"' +
                'image="' + candiateData[index].image + '"' +
                'candiate_id="' + candiateData[index]._id + '"> <i class="fa fa-send"> </i> </button>'
            ]).draw(false)
        })
    })


    $('#candiate-votes-body').on('click', '#btn-vote', function () {
        let partyname = $(this).attr('party_name');
        let candiatename = $(this).attr('candiate_name');
        let candiateid = $(this).attr('candiate_id');
        let image = $(this).attr('image');
        let userid = localStorage.getItem('userid');
        let username = localStorage.getItem('username');
        let useremail = localStorage.getItem('useremail');


        $.ajax({
            url: 'http://localhost:8080/vote',
            type: 'POST',
            data: {
                'partyname': partyname,
                'candiatename': candiatename,
                'candiateid': candiateid,
                'userid': userid,
                'username': username,
                'useremail': useremail,
                'image': image
            },
            success: function (data) {
                if (data.added) {
                    alert(data.message)
                }

                else if (!data.added) {
                    alert(data.message)
                }
            }
        })
    })






    $('#btn-add-candiate').click(function () {
        let partyname = $('#txt-party-name').val();
        let candiatename = $('#txt-candiate-name').val();
        let image = $('#image');


        if (partyname === '') {
            alert('Enter party  name')

        }
        else if (candiatename === '') {
            alert('Enter candiate name')

        }

        else {
            UploadDatatoServer(image, partyname, candiatename)
        }

    })

})

function UploadDatatoServer(imageUploadSelector, partyname, candiatename) {
    let formData = new FormData();
    let files = imageUploadSelector.get(0).files;
    if (files.length > 0) {
        formData.append("image", files[0]);
        formData.append("partyname", partyname);
        formData.append("candiatename", candiatename);
    }

    var fileDetails = imageUploadSelector[0].files[0]
    var fileSize = fileDetails.size;

    if (fileSize > 1000000) {
        alert('Image size is larger');
    }

    else {

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/candiate',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,

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
                ('Something went wrong please try again')
            }
        });
    }
}

function deletecandiate(candiateid) {
    $.ajax({
        url: 'http://localhost:8080/candiate',
        type: 'DELETE',
        data: {
            'id': candiateid,
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