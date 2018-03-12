$(document).ready(function() {
    // Show Projects page
    $('#linkProjects').click(function() {
        $('#page-main').hide();
        $('#page-projects').show();
    });

    // Show Portfolio page
    $('#linkPortfolio').click(function() {
        $('#page-projects').hide();
        $('#page-main').show();
    });
    // Request projects, populate cards
    $.get('https://api.github.com/users/mrybak834/repos', function(data) {
        // $('.result').html(data);
        var position = 0;
        var card = '';
        $.each(data, function(index, value) {
            // value.name value.description

            if (value.language == null || value.language == 'null') {
                value.language = 'Various Languages';
            }

            text =
                '<div class="col-lg-3 col-md-6 col-sm-12"><div class="card card-project" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' +
                value.name +
                '</h5><h6 class="card-subtitle mb-2 text-muted">' +
                value.language +
                '</h6><p class="card-text">' +
                value.description +
                '</p><a href="' +
                value.html_url +
                '" class="card-link">View Repo</a></div></div></div>';

            // Add new row if necessary
            console.log('Position = ' + position);
            if (position == 4) {
                console.log('Closing row = ' + position);
                card += '</div>';
                $('#page-projects').append(card);
            } else if (position == 0) {
                console.log('Opening row = ' + position);
                card = '<div class="row">' + text;
            } else {
                card += text;
            }

            if (position == 4) {
                position = 0;
            } else {
                position++;
            }
        });

        // Hide all cards until requested
        $('#page-projects').hide();
    });
});
