$(document).ready(function(){

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
        success: displayCards(data)
    })
}

function diplayCards (data){
    for (var i = 0; i < data.length; i++){
        name = data[i].name;
        logo = data[i].logo;
        embedLink = data[i].embedLink;
        howToVideo = data[i].howToVideo;
        description = data[i].description;
        category = data[i].category;
        subject = data[i].subject;
        tags = data[i].tags;
        var $el =
        $('#cardContainer').append()
    }
}

function displayCategory (data, category){
    categoryArray = [];
    for (var i = 0; i < data.length; i++){
        if(data.[i].category === category){
            categoryArray.push(data[i]);
        }
    }
    return categoryArray;
}

