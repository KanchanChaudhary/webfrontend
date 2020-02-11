$(document).ready(function () {

    $.getJSON('http://localhost:8080/vote', function (data) {
        let candiateTable = $('#votestable').DataTable();
        let candiateData = data.data;
        $.each(candiateData, function (index) {
            candiateTable.row.add([
                candiateData[index].partyname,
                candiateData[index].candiatename,
                '<img src="http://localhost:8080/asset/uploads/images/candiate/' + candiateData[index].image + '" class="img-thumbnail img-responsive" width="100px" height="100px">',
                candiateData[index].username,
                candiateData[index].useremail,
                ]).draw(false)
        })
    })
})