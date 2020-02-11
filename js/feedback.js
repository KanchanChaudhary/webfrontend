$(document).ready(function () {
    $.getJSON('http://localhost:8080/content/feedback', function (data) {
        let feedbackdata = data.data;
        $.each(feedbackdata, function (index) {
            $('#feedback-container').append(
                '<div id="feedback-heading" class="col-sm-12 p-5 text-center"> <h3>' + feedbackdata[index].title + '  </h3> </div>' +
                '<div id="feedback-content" class="col-sm-12 p-5 text-left"> <h4> ' + feedbackdata[index].description + ' </h4>' +
                '<a href = "feedbacksingle.html?' + feedbackdata[index]._id + '" > <i class="fa fa-comment"></i> </a >  </div>'

            )
        })

    })
})