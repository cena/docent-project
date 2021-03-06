var embedName = "",
    logo = "",
    embedLink = "",
    howto = "",
    description = "",
    category = "",
    subject = "",
    tags = "";
var pageNumber = 1;
var resources=[];
var value="";
var filteredArray=[];
var query;

$(document).ready(function() {


    $(".navDirectory").on("mouseenter", function () {
        $('.sub-nav').stop().slideUp(500);
        $(this).find('.sub-nav').stop().slideDown(500);
    });
    $(".navDirectory").on("mouseleave", function () {
        $('.sub-nav').stop().slideUp(500);
        $(this).find('.sub-nav').stop().slideUp(500);
    });

//modal example
    $("body").on("click", '.example', function () {
        getResourceById($(this).data('id'));
        $('#embedExample').empty();
        $('#embedLink').empty();
        $("#myModal").modal("show");
        var embedLink = '<iframe src="https://www.haikudeck.com/e/SnptnKTSEr/?isUrlHashEnabled=false&isPreviewEnabled=false&isHeaderVisible=false" width="520" height="341" frameborder="0" marginheight="0" marginwidth="0"></iframe><br/><span style="font-family: arial, sans-serif; font-size: 8pt;"><a title="Heat Presentation" href="https://www.haikudeck.com/p/SnptnKTSEr/heat?utm_campaign=embed&utm_source=webapp&utm_medium=text-link">Heat</a> - Created with Haiku Deck, presentation software that inspires</span>';
        $('#embedExample').append(embedLink);
        embedLink = embedLink.replace(/</g, "&lt");
        embedLink = embedLink.replace(/>/g, "&gt");
        $('#embedLink').html(embedLink);


    });

    //reset page to show all resources
    $('.seeAllResources').on('click', function () {
        pageNumber = 1;
        mainDisplayFunction ();
    });

    //page number navigation button
    $('body').on('click', '.pageNum', function () {
        pageNumber = $(this).data('page');
        getNewPage();
    });

    //Arrow navigation button
    $('body').on('click', '.arrow', function () {
        pageNumber += $(this).data('page-turn');
        getResources(function (response) {
            getNewPage();
        })
    });

    //runs search for input when search button clicked
    $('body').on('click', '#submit', function (event) {
        event.preventDefault();
        query = $('#search').val();
        if (query != null && query != " " && query !="") {
            searchFunction(query, function (response) {
                displayCards(response);
                makePages(response);
            })
        }
    });

    mainDisplayFunction ();
});

function getNewPage() {
    if (filteredArray.length > 0) {
        displayCards(filteredArray);
        makePages(filteredArray);
    } else if (search == true) {
        searchFunction(function (response) {
            displayCards(response);
            makePages(response);
        });
    } else {
        getResources(function (response) {
            displayCards(response);
            makePages(response);
        });
    }
}

function getResources(callback) {
    filteredArray = [];
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/resources",
        success: function (data) {
            data.resources.sort(compareAlphabetically);
            callback(data.resources);
        }
    })
}

function searchFunction(query, callback) {
    filteredArray = [];
    search = true;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {search: query},
        url: '/resources',
        success: function (data) {
            $("#search").val("");
            callback(data);
        }
    })
}

function filterResources(key, value, data) {
    filteredArray = [];
    switch (key) {
        case "category":
            for (i = 0; i < data.length; i++) {
                if (data[i].category === value) {
                    filteredArray.push(data[i]);
                }
            }
            break;

        case "subject":
            for (i = 0; i < data.length; i++) {
                if (data[i].subject === value) {
                    filteredArray.push(data[i]);
                }
            }
            for (i = 0; i < data.length; i++) {
                if (data[i].subject == null) {
                    filteredArray.push(data[i]);
                }
            }
            break;

        case "tag":
            for (var j = 0; j < data.length; j++) {
                if (data[j].tags != null) {
                    for (var k = 0; k < data[j].tags.length; k++) {
                        if (data[j].tags[k] === value) {
                            filteredArray.push(data[j]);
                        }
                    }
                }
            }
            break;

        default:
            filteredArray = data;
    }
    return filteredArray;
}


function compareAlphabetically(a, b) {
    if (a.embedName < b.embedName)
        return -1;
    if (a.embedName > b.embedName)
        return 1;
    return 0;
}

function makePages(data) {
    $('.pageNav').empty();
    numOfPages = Math.ceil(data.length / 30);
    if (pageNumber > 1) {
        $('.pageNav').append('<img class ="arrow" data-page-turn="-1" src="/assets/images/nav_backArrow.svg">')
    }
    for (i = 1; i <= numOfPages; i++) {
        $('.pageNav').append('<div data-page=' + i + ' class="pageNum">' + i + '</div>');
    }
    if (pageNumber < numOfPages) {
        $('.pageNav').append('<img class ="arrow" data-page-turn="1" src="/assets/images/nav_forwardArrow.svg">')
    }
    $(".pageNum").removeClass("currentPage");
    $('.pageNum[data-page=' + pageNumber + ']').addClass('currentPage');
}


function displayCards(data) {
    $('#cardContainer').empty();
    for (var i = (pageNumber * 30 - 30); i < data.length && i < (pageNumber * 30); i++) {
        var descriptionPlaceholder = "Description Coming Soon";

        //sets data
        tags = "";
        embedName = data[i].embedName;
        logo = (data[i].logo) ? data[i].logo : data[i].embedName;
        embedLink = (data[i].embedLink) ? data[i].embedLink : data[i].embedName;
        howto = (data[i].howto) ? data[i].howto : "";
        description = (data[i].description) ? data[i].description : descriptionPlaceholder;
        category = (data[i].category) ? data[i].category : "";
        subject = (data[i].subject) ? "" : data[i].embedName;
        if (data[i].tags !== null && data[i].tags !== 0) {
            for (var j = 0; j < data[i].tags.length; j++) {
                tags += '<p class="tag">' + data[i].tags[j] + '</p>';
            }
        }

        //appends cards
        var logoImgTag = '<img class="logo" src="' + logo + '">';
        var cardDiv = '<main class="col-xs-offset-1 col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-1 col-md-4 col-lg-offset-0 card"></main>';
        var logoDiv = '<div class="col-xs-offset-1 col-xs-10">' + logoImgTag + '</div>';
        var nameDiv = '<h4 class="title col-xs-6 col-md-8">' + embedName + '</h4>';
        var categoryDiv = '<h3 class="category col-xs-offset-5 col-xs-10">' + category + '</h3>';
        var videoDiv = '<div class="col-md-offset-1"><iframe width="290" height="150" src="' + howto + '" frameborder="0" allowfullscreen></iframe></iframe></div>';
        var descriptionDiv = '<p class="paragraph col-md-offset-1 col-md-10">' + description + '</p>';
        var exampleDiv = ' <h4 class="col-xs-offset-3">Example</h4><i data-id=' + data[i]._id + ' class="example fa fa-external-link fa-2x"></i>';
        var tagsDiv = '<h6 class="tags col-md-3">' + tags + '</h6>';
        $('#cardContainer').append(cardDiv);
        $('.card').last().append('<div class="row">' + logoDiv + '</div><div class="row">' + categoryDiv + '</div><div class="row">' + videoDiv + '</div><div class="row">' + descriptionDiv + '</div><div class="row">' + exampleDiv + '</div><div class="row">' + tagsDiv + '</div>');
    }
}

function getResourceById(id) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "api/resources/" + id,
        success: function (data) {
            var embedLink = data.embedLink;
            $('#embedExample').append(embedLink);
            embedLink = embedLink.replace(/</g, "&lt");
            embedLink = embedLink.replace(/>/g, "&gt");
            $('#embedLink').html(embedLink);
        },
        error: function (err) {
            console.log(err);
        }

    })
}

function mainDisplayFunction (){
//append resources to DOM on page load
    getResources(function (response) {
        displayCards(response);
        makePages(response);

        //tag button
        $('body').on('click', '.tag', function () {
            value = $(this).text();
            pageNumber = 1;
            filterResources("tag", value, response);
            displayCards(filteredArray);
            makePages(filteredArray);
            return filteredArray;

        });

        //category selection
        $('body').on('click', '.category', function () {
            value = $(this).text();
            pageNumber = 1;
            filterResources("category", value, response);
            displayCards(filteredArray);
            makePages(filteredArray);
            return filteredArray;
        });

        //subject selection
        $('body').on('click', '.subject', function () {
            value = $(this).text();
            pageNumber = 1;
            filterResources("subject", value, response);
            displayCards(filteredArray);
            makePages(filteredArray);
            return filteredArray;
        });
    });


}
