var embedName = "",
    logo = "",
    embedLink = "",
    howto = "",
    description = "",
    category = "",
    subject = "",
    tags = [];


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








//append resources to DOM on page load
    displayCards(getResources());

});





function  getResources() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/resources",
        success: function(data) {
            data.resources.sort(compareToSortAlphabetically);
            displayCards(data.resources);
        }
    });
}


function compareToSortAlphabetically(a,b) {
    if (a.embedName < b.embedName)
            return -1;
    if (a.embedName > b.embedName)
            return 1;
    return 0;
}


function makePages (data){
    numOfPages = data.length/30;
    //display numOfPages and clickable <- -> arrows
    //OR display all pages numbers as clickable numbers
    for(i = 0; i <= numOfPages; i++){

    }
}


var pageStart = 0;

function displayCards (data){

console.log(data);
    for (var i = pageStart; i < data.length && i < (pageStart + 30); i++){
        //sets data
        embedName = data[i].embedName;
        logo = data[i].logo;
        embedLink = data[i].embedLink;
        howto = data[i].howto;
        description = data[i].description;
        category = data[i].category;
        subject = data[i].subject;
        tags = data[i].tags;
        console.log(embedName);

        //appends cards
        var logoImgTag = '<img src="'+ logo +'">';
        var cardDiv = '<main id= "cardDiv" class="col-md-offset-1 col-md-3 card"></main>';
        var logoDiv = '<div class="logo col-md-offset-1">'+ logoImgTag +'</div>';
        var nameDiv = '<h4 class="title col-md-8">'+ embedName +'</h4>';
        var videoDiv = '<iframe class="col-md-offset-1 video" src="'+ howto +'" frameborder="0" allowfullscreen></iframe>';
        var descriptionDiv = '<p class="paragraph col-md-offset-1 col-md-10">'+ description +'</p>';
        var exampleDiv = '<img class="col-md-offset-4 col-md-4 example" src="../public/images/modalButton.png">';
        var tagsDiv = '<section class="tags col-md-offset-3 col-md-10">'+ tags +'</section>';
        $('#cardContainer').append(cardDiv);
        $('main').last().append('<div class="row">'+ logoDiv + nameDiv +'</div><div class="row">'+ videoDiv +'</div><div class="row">'+ descriptionDiv +'</div><div class="row">'+ exampleDiv +'</div><div class="row">'+ tagsDiv +'</div>');
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
