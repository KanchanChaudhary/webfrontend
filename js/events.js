$(document).ready(function () {
    $.getJSON('http://localhost:8080/content/events', function (data) {
        let eventdata = data.data;
        $.each(eventdata, function (index) {
            $('#events-container').append(
                '<div id="events-heading" class="col-sm-12 p-5 text-center"> <h3>' + eventdata[index].title + '  </h3> </div>' +
                '<div id="events-content" class="col-sm-12 p-5 text-left"> <h4> ' + eventdata[index].description + ' </h4> </div>'
            )
        })

    })
})