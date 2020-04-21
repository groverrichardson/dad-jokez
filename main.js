"use strict";

function watchSubmit() {
    $("#search-button").click(event => {
        event.preventDefault();
        let searchTerm = $(".search-input").val();
        getResults(searchTerm);
    });
}

function watchMobileSubmit() {
    $(".search-mobile").click(event => {
        event.preventDefault();
        let searchTerm = $(".search-input-mobile").val();
        getResults(searchTerm);
    });
}

function getResults(searchTerm) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("User-Agent", "groverrichardson.github.io/dad-jokez");

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(
        "https://icanhazdadjoke.com/search?term=" + searchTerm,
        requestOptions
    )
        .then(response => response.json())
        .then(result => displayResults(result, searchTerm))
        .catch(err => {
            $("#js-error-message").text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(result, searchTerm) {
    $(".result-list").empty();
    $(".results-container").removeClass("hide");
    $(".results").removeClass("hide");
    $(".showing-results-for").text(`Showing results for "${searchTerm}"`);
    for (let i = 0; i < result.results.length; i++) {
        console.log(result.results);
        if (result) {
            $(".result-list").append(
                `<li class="result">
                        <div class="joke">
                        ${result.results[i].joke} 
                        </div>
                        <div class="rating">Rate This Joke<div class="thumbs-container">
                            <img src="Images/thumb-up.png" alt="Image of a thumbs up emoji." class="thumb greyscale"><img src="Images/thumb-down.png" alt="Image of a thumbs down emoji." class="thumb greyscale"></div>
                        </div>
                    </li>`
            );
        }
    }
    $(".search-input-mobile").val("");
    $(".search-input").val("");
    $("document").ready(function() {
        $("body,html").animate(
            {
                scrollTop: $(".results-container").offset().top
            },
            1000
        );
    });
}

$(window).scroll(function() {
    stickySearch();
});

function stickySearch() {
    const sticky = $(".results-container").offset();
    console.log("window-pagey-offset", window.pageYOffset);
    if (window.pageYOffset > $(".results-container").offset().top - 1) {
        $(".results").css("margin-top", "150px");
        $("#sticky-search").removeClass("scroll-hide");
    } else {
        $("#sticky-search").addClass("scroll-hide");
        $(".results").css("margin-top", "0px");
    }
}

function watchButton() {
    $(".results-view").click(event => {
        $("div.sticky-search").toggleClass("hide");
        $("section.results").toggleClass("hide");
    });
}

$(watchButton);
$(watchSubmit);
$(watchMobileSubmit);
//$(onScroll);
