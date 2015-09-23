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

$(document).ready(function(){

    //$(".example").on("click", function () {
    //    $("#myModal").modal('show');
    //});

//the drop downs

    $(".navDirectory").on("mouseenter", function () {
        $(this).find(".sub-nav").slideDown();
    });
    $(".navDirectory").on("mouseleave", function () {
        $(this).find(".sub-nav").slideUp();
    });

//the delete modal on admin page
    $(".delete").on("click", function () {
        $("#myModal").modal('show');
    });
    $(".newResourceButton").on("click", function () {
        $("#newModal").modal('show');
    });
    $(".editButton").on("click", function () {
        $("#newModal").modal('show');
    });

//append resources to DOM on page load
    getResources(logo, logo, function(response) {
        displayCards(response);
        makePages(response);

        //tag button
        $('body').on('click', '.tag', function(){
            value = $(this).text();
            filterResources("tag", value, response);
            displayCards(filteredArray);

        });

        //category selection
        $('body').on('click', '.category', function($event){
            value = $(this).text();
            filterResources("category", value, response);
            displayCards(filteredArray);
        });

        //subject selection
        $('body').on('click', '.subject', function($event){
            value = $(this).text();
            filterResources("subject", value, response);
            displayCards(filteredArray);
        });

        //page number navigation button
        $('body').on('click', '.pageNum', function(){
            pageNumber = $(this).data('page');
            getResources();
        });

        //Arrow navigation button
        $('body').on('click', '.arrow', function(){
            pageNumber += $(this).data('page-turn');
            getResources();
        });
    });


});


function  getResources(key, value, callback) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/resources",
        success: function(data) {
            data.resources.sort(compareAlphabetically);
            callback(data.resources);
        }
    })
}


function filterResources(key, value, data){
    filteredArray = [];
    switch (key){
        case "category":
            for (var i = 0; i < data.length; i++){
                if(data[i].category === value){
                    filteredArray.push(data[i]);
                }
            }
            break;

        case "subject":
            for (var i = 0; i < data.length; i++){
                if(data[i].subject === value){
                    filteredArray.push(data[i]);
                }
            }
            for (var i = 0; i < data.length; i++){
                if(data[i].subject == null){
                    filteredArray.push(data[i]);
                }
            }
            break;

        case "tag":
            for (var j = 0; j<data.length; j++){
                if(data[j].tags != null){
                    for (var k = 0; k<data[j].tags.length; k++){
                        if(data[j].tags[k] === value){
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


function compareAlphabetically(a,b) {
    if (a.embedName < b.embedName)
        return -1;
    if (a.embedName > b.embedName)
        return 1;
    return 0;
}

function makePages (data){
    $('.pageNav').empty();
    numOfPages = Math.ceil(data.length/30);
    if (pageNumber > 1){$('.pageNav').append('<img class ="arrow" data-page-turn="-1" src="/assets/images/nav_backArrow.svg">')}
    for(i = 1; i <= numOfPages; i++){
        $('.pageNav').append('<div data-page='+i+' class="pageNum">'+i+'</div>');
    }
    if (pageNumber < numOfPages){ $('.pageNav').append('<img class ="arrow" data-page-turn="1" src="/assets/images/nav_forwardArrow.svg">')}
}


function displayCards (data){
    $('#cardContainer').empty();

    for(var i = (pageNumber*30-30); i < data.length && i < (pageNumber * 30); i++){
            var descriptionPlaceholder = "Description Coming Soon";
            var videoPlaceholderText = "Video Coming Soon";

        //sets data
        tags="";
        embedName = data[i].embedName;
        logo = data[i].logo;
        embedLink = (data[i].embedLink) ? data[i].embedLink : data[i].embedName;
        howto = (data[i].howto) ? data[i].howto : "";
        description = (data[i].description) ? data[i].description : descriptionPlaceholder;
        category = (data[i].category) ? data[i].category : "";
        subject = (data[i].subject) ? "" : data[i].embedName;
        if(data[i].tags !== null && data[i].tags !== 0){
            for (var j = 0; j < data[i].tags.length; j++) {
                tags+='<p class="tag">'+data[i].tags[j]+'</p>';
            }
        }

        //appends cards
        var logoImgTag = '<img class="logo" src="'+ logo +'">';

        var cardDiv = '<main class="col-xs-offset-1 col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-1 col-md-4 col-lg-offset-0 card"></main>';
        var logoDiv = '<div class="col-xs-offset-1 col-xs-10">'+ logoImgTag +'</div>';
        var nameDiv = '<h4 class="title col-xs-6 col-md-8">'+ embedName +'</h4>';
        var categoryDiv = '<h3 class="category col-xs-offset-5 col-xs-10">'+ category +'</h3>';


        var videoDiv = '<div class="col-md-offset-1"><iframe width="290" height="150" src="'+ howto +'" frameborder="0" allowfullscreen></iframe></iframe></div>';
        var descriptionDiv = '<p class="paragraph col-md-offset-1 col-md-10">'+ description +'</p>';
        var exampleDiv = ' <i class="col-xs-offset-5 example fa fa-external-link fa-2x"></i>';
        var tagsDiv = '<h6 class="tags col-md-3">'+ tags +'</h6>';
        $('#cardContainer').append(cardDiv);
        $('.card').last().append('<div class="row">'+ logoDiv +'</div><div class="row">'+ categoryDiv +'</div><div class="row">'+ videoDiv +'</div><div class="row">'+ descriptionDiv +'</div><div class="row">'+ exampleDiv +'</div><div class="row">'+ tagsDiv +'</div>');

        $(".example").on("click", function(){
            $("#myModal").modal("show");
        });
    }
}
