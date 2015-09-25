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



//the drop downs
//    $(".navDirectory").on("mouseover", function () {
//            $(".sub-nav").slideUp().stop();
//            $(this).find(".sub-nav").slideToggle();
//
//    });

    $( ".navDirectory" ).on( "mouseenter", function() {
        $('.sub-nav').stop().slideUp( 500 );
        $(this).find('.sub-nav').stop().slideToggle( 500 );
    });


//modal example

    $("body").on("click", '.example', function(){
        getResourceById($(this).data('id'));
        $('#embedExample').empty();
        $('#embedLink').empty();
        $("#myModal").modal("show");
        var embedLink = '<iframe src="https://www.haikudeck.com/e/SnptnKTSEr/?isUrlHashEnabled=false&isPreviewEnabled=false&isHeaderVisible=false" width="520" height="341" frameborder="0" marginheight="0" marginwidth="0"></iframe><br/><span style="font-family: arial, sans-serif; font-size: 8pt;"><a title="Heat Presentation" href="https://www.haikudeck.com/p/SnptnKTSEr/heat?utm_campaign=embed&utm_source=webapp&utm_medium=text-link">Heat</a> - Created with Haiku Deck, presentation software that inspires</span>';
        $('#embedExample').append(embedLink);
        embedLink=embedLink.replace(/</g, "&lt");
        embedLink=embedLink.replace(/>/g, "&gt");
        $('#embedLink').html(embedLink);


    });



    //page number navigation button
    $('body').on('click', '.pageNum', function(){
        pageNumber = $(this).data('page');
        getNewPage();
    });

    //Arrow navigation button
    $('body').on('click', '.arrow', function(){
        pageNumber += $(this).data('page-turn');
        console.log(pageNumber);

        getResources(function(response){
          getNewPage();
        })
    });
adminPage();

//append resources to DOM on page load



    getResources(function(response) {
        displayCards(response);
        makePages(response);
        console.log(response);

        //tag button
        $('body').on('click', '.tag', function(){
            value = $(this).text();
            pageNumber = 1;
            filterResources("tag", value, response);
            displayCards(filteredArray);
            makePages(filteredArray);
            return filteredArray;

        });

        //category selection
        $('body').on('click', '.category', function(){
            value = $(this).text();
            pageNumber = 1;
            filterResources("category", value, response);
            displayCards(filteredArray);
            makePages(filteredArray);
            return filteredArray;
        });

        //subject selection
        $('body').on('click', '.subject', function(){
            value = $(this).text();
            pageNumber = 1;
            filterResources("subject", value, response);
            displayCards(filteredArray);
            makePages(filteredArray);
            return filteredArray;
        });
    });



    //runs search for input when search button clicked
    $('body').on('click', '#submit', function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: {search: $('#search').val()},
            url: '/resources',
            success: function (data) {
                displayCards(data);
                //callback(data.resources);
            }
        });
    });

});

function getNewPage (){
    if(filteredArray.length > 0){
        displayCards(filteredArray);
        makePages(filteredArray);
    }else {
        getResources(function (response) {
            displayCards(response);
            makePages(response);
        })
    }
}

function  getResources(callback) {
    filteredArray=[];
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
            for  (i = 0; i < data.length; i++){
                if(data[i].category === value){
                    filteredArray.push(data[i]);
                }
            }
            break;

        case "subject":
            for (i = 0; i < data.length; i++){
                if(data[i].subject === value){
                    filteredArray.push(data[i]);
                }
            }
            for ( i = 0; i < data.length; i++){
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
    $(".pageNum").removeClass("currentPage");
    $('.pageNum[data-page='+pageNumber+']').addClass('currentPage');
}


function displayCards (data){
    $('#cardContainer').empty();
    for(var i = (pageNumber*30-30); i < data.length && i < (pageNumber * 30); i++){
            var descriptionPlaceholder = "Description Coming Soon";

        //sets data
        tags="";
        embedName = data[i].embedName;
        logo = (data[i].logo) ? data[i].logo : data[i].embedName;
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
        var exampleDiv = ' <i data-id='+ data[i]._id +' class="example col-xs-offset-5 fa fa-external-link fa-2x"></i>';
        var tagsDiv = '<h6 class="tags col-md-3">'+ tags +'</h6>';
        $('#cardContainer').append(cardDiv);
        $('.card').last().append('<div class="row">'+ logoDiv +'</div><div class="row">'+ categoryDiv +'</div><div class="row">'+ videoDiv +'</div><div class="row">'+ descriptionDiv +'</div><div class="row">'+ exampleDiv +'</div><div class="row">'+ tagsDiv +'</div>');
    }
}

function getResourceById (id){
    console.log('hello');
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "api/resources/"+id,
        success: function(data) {
            var embedLink = data.embedLink;
            $('#embedExample').append(embedLink);
            embedLink=embedLink.replace(/</g, "&lt");
            embedLink=embedLink.replace(/>/g, "&gt");
            $('#embedLink').html(embedLink);
        },
        error: function(err){
            console.log(err);
        }

    })
}


// ADMIN PAGE CONTENT
function adminPage (data){
    for(var i = 0; i<data; i++) {
        console.log(data);
        tags = "";
        embedName = data[i].embedName;
        logo = data[i].logo;
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
        var adminTable = '<table id="adminTable"></table>';
        var tableHead = '<th>Embed Name</th><th>Logo Link</th><th>Embed Link</th><th>How To Video</th><th>Description</th><th>Category</th><th>Subjects</th><th>Tags</th><th>Edit and Delete</th>';
        var tableRow = '<tr></tr>';

        $("#admin").append(adminTable);
        $(adminTable).append(tableHead + tableRow);
        $(tableRow).append('<td>' + embedName + '</td><td>' + logo + '</td><td class="embedlink">' + embedLink + '</td><td class="howtolink">' + howto + '</td><td class="description">' + description + '</td><td>' + category + '</td><td>' + subject + '</td><td>' + tags + '</td>')

    }

}

//function searchDatabase (query) {
//    $.ajax({
//        type: 'POST',
//        dataType: 'json',
//        data: JSON.stringify(query),
//        url: "/resources/search",
//        success: function(data) {
//            data.resources.sort(compareAlphabetically);
//            callback(data.resources);
//        }
//    })
//}

//$('#searchForm').submit(function(event){
//    event.preventDefault();
//    var formData = $("#searchForm").val();
//    console.log(formData);
//    $.ajax({
//        type: "POST",
//        url: "/resources/search",
//        data: formData,
//        success: function(data){
//            //displayCards(data);
//            console.log('success?');
//        }
//    })
//});
