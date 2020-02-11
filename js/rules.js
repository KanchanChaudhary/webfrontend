$(document).ready(function () {
    $.getJSON('http://localhost:8080/content/rules', function (data) {
        let ruledata = data.data;
        $.each(ruledata, function (index) {
            $('#rules-container').append(
                '<div id="rules-heading" class="col-sm-12 p-5 text-center"> <h3>' + ruledata[index].title + '  </h3> </div>' +
                '<div id="rules-content" class="col-sm-12 p-5 text-left"> <h4> ' + ruledata[index].description + ' </h4> </div>'
            )
        })

    })
})