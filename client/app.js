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

function displayCards (data){
    for (var i = 0; i < data.length; i++){
        name = data[i].name;
        logo = data[i].logo;
        embedLink = data[i].embedLink;
        howToVideo = data[i].howToVideo;
        description = data[i].description;
        category = data[i].category;
        subject = data[i].subject;
        tags = data[i].tags;
        var logoImgTag = '<img src="'+ logo +'">';
        var cardDiv = '<main class="col-md-4 card"></main>';
        var logoDiv = '<div class="logo col-md-offset-1">'+ logoImgTag +'</div>';
        var nameDiv = '<h4 class="title col-md-8">'+ name +'</h4>';
        var videoDiv = '<iframe class="col-md-offset-1 video" src="'+ howToVideo +'" frameborder="0" allowfullscreen></iframe>';
        var descriptionDiv = '<p class="paragraph col-md-offset-1 col-md-10">'+ description +'</p>';
        var exampleDiv = '<img class="col-md-offset-4 col-md-4 example" src="../public/images/modalButton.png">';
        var tagsDiv = '<section class="tags col-md-offset-3 col-md-10">'+ tags +'</section>';
        //make variables for the various sections of html (i.e. logoImgDiv, titleDiv, videoDiv, paragraphDiv, tagsDiv)

        var $el =
        $('#cardContainer').append(cardDiv);
        //appending to the main card div
        $(cardDiv).append('<div class="row">'+ logoDiv + nameDiv +'</div><div class="row">'+ videoDiv +'</div><div class="row">'+ descriptionDiv +'</div><div class="row">'+ exampleDiv +'</div><div class="row">'+ tagsDiv +'</div>');

        //when you click on the example image the modal will pop up
        $(exampleDiv).on("click", function(){

        });
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

//ADMIN PAGE
function adminTable (data){
    for (var i = 0; i < data.length; i++){
        name = data[i].name;
        logo = data[i].logo;
        embedLink = data[i].embedLink;
        howToVideo = data[i].howToVideo;
        description = data[i].description;
        category = data[i].category;
        subject = data[i].subject;
        tags = data[i].tags;
        var tableRow = '<tr></tr>';

        var nameCell = '<td>'+ name +'</td>';
        var logoCell = '<td class="logo">'+ logo.text() +'</td>';
        var videoCell = '<td class="howToLink">'+ howToVideo.text() +'</td>';
        var embedLinkCell = '<td class="embedLink">'+ embedLink +'</td>';
        var descriptionCell = '<td class="description">'+ description +'</td>';
        var tagsCell = '<td><ul><li>'+ tags +'</li></ul></td>';
        var subjectCell = '<td>'+ subject +'</td>';
        var categoriesCell = '<td>'+ category +'</td>';
        var editableCells = logoCell + nameCell + embedLinkCell + videoCell + descriptionCell + tagsCell + subjectCell + categoriesCell;
        var buttonsCell = '<td><button type="button" class="edit">Edit</button><button type="submit" class="delete">Delete</button></td>';
        //make variables for the various sections of html (i.e. logoImgDiv, titleDiv, videoDiv, paragraphDiv, tagsDiv)

        var $el =
            $('#adminTable').append(tableRow);

        //appending to the table row
        $(tableRow).append(editableCells + buttonsCell);
    }
}

function adminTable (data){
    for (var i = 0; i < data.length; i++){
        name = data[i].name;
        logo = data[i].logo;
        embedLink = data[i].embedLink;
        howToVideo = data[i].howToVideo;
        description = data[i].description;
        category = data[i].category;
        subject = data[i].subject;
        tags = data[i].tags;
        var something='';
        //make variables for the various sections of html (i.e. logoImgDiv, titleDiv, videoDiv, paragraphDiv, tagsDiv)

        var $el = '';
    }
}





