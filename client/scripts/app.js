$(document).ready(function(){




    //append resources to DOM on page load
    displayCards(getResources());
});


var name = "",
    logo = "",
    embedLink = "",
    howToVideo = "",
    description = "",
    category = "",
    subject = "",
    tags = [];

function getResources () {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: TBD,
        success: data.sort(function(a, b) {
            return a.name - b.name;
            //(need to test) returns array of data sorted alphabetically by name
        })
    })
}


function makePages (data){
    numOfPages = data.length/30;
    //display numOfPages and clickable <- -> arrows
    //OR display all pages numbers as clickable numbers
    for(i = 0; i <= numOfPages; i++){

    }
}


var pageStart = 0;

function diplayCards (data){
    var logoImgTag = '<img src="'+ logo +'">';
    var cardDiv = '<main class="col-md-4 card"></main>';
    var logoDiv = '<div class="logo col-md-offset-1">'+ logoImgTag +'</div>';
    var nameDiv = '<h4 class="title col-md-8">'+ name +'</h4>';
    var videoDiv = '<iframe class="col-md-offset-1 video" src="'+ howToVideo +'" frameborder="0" allowfullscreen></iframe>';
    var descriptionDiv = '<p class="paragraph col-md-offset-1 col-md-10">'+ description +'</p>';
    var exampleDiv = '<img class="col-md-offset-4 col-md-4 example" src="../public/images/modalButton.png">';
    var tagsDiv = '<section class="tags col-md-offset-3 col-md-10">'+ tags +'</section>';

    for (var i = pageStart; i < data.length && (pageStart + 30); i++){
        //sets data
        name = data[i].name;
        logo = data[i].logo;
        embedLink = data[i].embedLink;
        howToVideo = data[i].howToVideo;
        description = data[i].description;
        category = data[i].category;
        subject = data[i].subject;
        tags = data[i].tags;

        //appends cards
        $('#cardContainer').append(cardDiv);
        $(cardDiv).append('<div class="row">'+ logoDiv + nameDiv +'</div><div class="row">'+ videoDiv +'</div><div class="row">'+ descriptionDiv +'</div><div class="row">'+ exampleDiv +'</div><div class="row">'+ tagsDiv +'</div>');
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
