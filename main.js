'use strict';

function watchSubmit() {
    $('#search-button').click((event) => {
        event.preventDefault();
        let searchTerm = $('.search-input').val();
        getResults(searchTerm);
    });
}

function watchMobileSubmit() {
    $('.search-mobile').click((event) => {
        event.preventDefault();
        let searchTerm = $('.search-input-mobile').val();
        getResults(searchTerm);
    });
}

function getResults(searchTerm) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('User-Agent', 'groverrichardson.github.io/dad-jokez');

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    fetch(
        'https://icanhazdadjoke.com/search?term=' + searchTerm,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))
        .catch((err) => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(result, searchTerm) {
    $('.result-list').empty();
    $('.results-container').removeClass('hide');
    $('.results').removeClass('hide');
    $('.showing-results-for').text(`Showing results for "${searchTerm}"`);
    for (let i = 0; i < result.results.length; i++) {
        console.log(result.results);
        if (result) {
            $('.result-list').append(
                `<li class="result">
                        <div class="joke">
                        ${result.results[i].joke} 
                        </div>
                    </li>`
            );
        }
    }
    $('.search-input-mobile').val('');
    $('.search-input').val('');
    $('document').ready(function () {
        $('body,html').animate(
            {
                scrollTop: $('.results-container').offset().top,
            },
            1000
        );
    });
}

$(window).scroll(function () {
    stickySearch();
});

function watchButton() {
    $('.results-view').click((event) => {
        $('div.sticky-search').toggleClass('hide');
        $('section.results').toggleClass('hide');
    });
}

$(watchButton);
$(watchSubmit);
$(watchMobileSubmit);
//$(onScroll);
