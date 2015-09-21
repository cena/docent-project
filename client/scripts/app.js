var embedName = "",
    logo = "",
    embedLink = "",
    howto = "",
    description = "",
    category = "",
    subject = "",
    tags = [];
var pageNumber = 1;


$(document).ready(function(){


    $(".example").on("click", function () {
        $("#myModal").modal('show');
    });

//the drop downs

    $(".navDirectory").on("mouseenter", function () {
        $(this).find(".sub-nav").slideDown();
    });
    $(".navDirectory").on("mouseleave", function () {
        $(this).find(".sub-nav").slideUp();
    });

    //$(".navDirectory").mouseenter( function () {
    //    $(this).find(".sub-nav").slideDown(500);
    //});
    //
    //$(".navDirectory").mouseleave( function () {
    //    $(this).find(".sub-nav").slideUp(500);
    //});


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

//append resources to DOM on page load
    getResources();
});

function  getResources() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/resources",
        success: function(data) {
            data.resources.sort(compareToSortAlphabetically);
            console.log(pageNumber);
            displayCards(data.resources);
            makePages(data.resources);
        }
    })
}


function compareToSortAlphabetically(a,b) {
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
    for (var i = (pageNumber*30-30); i < data.length && i < (pageNumber * 30); i++){
        //sets data
        embedName = data[i].embedName;
        logo = data[i].logo;
        embedLink = (data[i].embedLink) ? "" : data[i].embedName;;
        howto = (data[i].howto) ? "" : data[i].embedName;;
        description = (data[i].description) ? "" : data[i].embedName;;
        category = (data[i].category) ? "" : data[i].embedName;;
        subject = (data[i].subject) ? "" : data[i].embedName;;
        tags = (data[i].tags) ? "" : data[i].embedName;;

        //appends cards
        var logoImgTag = '<img src="'+ logo +'">';
        var cardDiv = '<main class="col-md-4 card"></main>';
        var logoDiv = '<div class="logo col-md-offset-1">'+ logoImgTag +'</div>';
        var nameDiv = '<h4 class="title col-md-8">'+ embedName +'</h4>';
        var videoDiv = '<iframe class="col-md-offset-1 video" src="'+ howto +'" frameborder="0" allowfullscreen></iframe>';
        var descriptionDiv = '<p class="paragraph col-md-offset-1 col-md-10">'+ description +'</p>';
        var exampleDiv = '<img class="col-md-offset-4 col-md-4 example" src="../public/images/modalButton.png">';
        var tagsDiv = '<section class="tags col-md-offset-3 col-md-10">'+ tags +'</section>';
        $('#cardContainer').append(cardDiv);
        $('.card').last().append('<div class="row">'+ logoDiv + nameDiv +'</div><div class="row">'+ videoDiv +'</div><div class="row">'+ descriptionDiv +'</div><div class="row">'+ exampleDiv +'</div><div class="row">'+ tagsDiv +'</div>');
    }
}


function displayCategory (data, category){
    categoryArray = [];
    for (var i = 0; i < data.length; i++){
        if(data[i].category === category){
            categoryArray.push(data[i]);
        }
    }
    return categoryArray;
}

function displaySubject (data, category){
    subjectArray = [];
    for (var i = 0; i < data.length; i++){
        if(data[i].subject === subject){
            subjectArray.push(data[i]);
        }
    }
    for (var i = 0; i < data.length; i++){
        if(data[i].subject == null){
            subjectArray.push(data[i]);
        }
    }
    return subjectArray;
}

function displayTag (data, tag){
    tagArray = [];
    for (var j = 0; j<data.length; j++){
        for (var k = 0; k<data[j].tags.length; k++){
            if(data[j].tags[k] === tag){
                tagArray.push(data[j].tags[k]);
            }
        }
    }
    return tagArray;
}
