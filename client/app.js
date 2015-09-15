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
        data[j].

    }




}