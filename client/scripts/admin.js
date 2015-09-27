/**
 * Created by huck on 9/23/15.
 */


$(document).ready(function() {

    //the delete modal on admin page
    $("table").on("click", ".deleteButton", function () {
        $(".deleteModal").modal('show');
        var $el = $(this).parent().parent();
        var id = $el[0].dataset.id;
        console.log(id);
        $("#deleteModal").on("click", "#deleteButton", function(){
            $.ajax({
                type: "DELETE",
                url: "/resources/" + id,
                success: function(){
                    console.log("Deletion sent");
                },
                error: function(xhr, status){
                    alert("Error: " + status);
                },
                complete: function(){
                    console.log("Delete Complete!");
                    $(".deleteModal").modal('hide');
                    $el.remove();
                }
            });
        });
    });

    $(".newResourceButton").on("click", function () {
        $(".newModal").modal('show');
    });

    //the edit modal on admin page
    $("table").on("click", ".editButton", function () {
        var $el = $(this).parent().parent();
        var id = $el[0].dataset.id;
        console.log(id);
        $(".editModal").modal('show');
        //populating form with resource data
        $.ajax({
            type: "GET",
            url: "/resources/" + id,
            success: function(response){
                console.log("table edit btn ajax get call working");
                console.log(response);
                $(".modal-title").text(response.embedName);
                $("#resourceName").val(response.embedName);
                $(".resourceLink").val(response.embedLink);
                $(".howToLink").val(response.howto);
                $(".resDescrip").val(response.description);
                $(".resCategory").val(response.category);
                $(".resSubject").val(response.subject);
                $(".resTags").val(response.tags);
            }
        });

        $(".editModal").on("click", ".submitButton", function(){
            var title,
                logo,
                resourceLink,
                howTo,
                description,
                category,
                subject,
                tags;

            tagArray=$(".resTags").val().split(",");
            for(i=0; i<tagArray.length; i++){
                tagArray[i] = tagArray[i].trim();
            }

            $(".editForm").change(function () {
                title = $("#resourceName").val();
                logo = $(".logoLink").val();
                resourceLink = $(".resourceLink").val();
                howTo = $(".howToLink").val();
                description = $(".resDescrip").val();
                category = $(".resCategory").val();
                subject = $(".resSubject").val();
                tags = tagArray;
            }).change();

            var dataObj = {
                embedName: title,
                logo: logo,
                embedLink: resourceLink,
                howto: howTo,
                description: description,
                category: category,
                subject: subject,
                tags: tags
            };

            $.ajax({
                type: "PUT",
                url: "/resources/edits/" + id,
                data: dataObj,
                dataType: "json",
                success: function(){
                    console.log("data being put: ", dataObj);
                },
                error: function(xhr, status){
                    alert("Error: " + status);
                },
                complete: function(){
                    $("#newEmbedForm")[0].reset();
                    $(".editModal").modal('hide');
                    //resetForm('#resourceForm');
                    getResources();
                }
            });
        });
    });

    $("#newModal").on("click", "#submitNew", function(){
        postNewResource();
        $("#newModal").modal('show');
        $("#newEmbedForm")[0].reset();
        getResources();
    });

    getResources(function (response) {
        displayAdmin(response);

    })

});

function  getResources(callback) {
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

function displayAdmin (data){
    $('.resourceRow').remove();
    for(var i = 0; i < data.length; i++) {
        tags = "";
        embedName = data[i].embedName;
        logo = data[i].logo;
        embedLink = (data[i].embedLink) ? data[i].embedLink : "";
        howto = (data[i].howto) ? data[i].howto : "";
        description = (data[i].description) ? data[i].description : "";
        category = (data[i].category) ? data[i].category : "";
        subject = (data[i].subject) ? data[i].subject : "";
        if (data[i].tags !== null && data[i].tags !== 0) {
            for (var j = 0; j < data[i].tags.length; j++) {
                tags += '<p class="tag">' + data[i].tags[j] + '</p>';
            }
        }
        $("#admin").append('<tr class="resourceRow" data-id="'+data[i]._id+'"><td>' + embedName + '</td><td>' + logo + '</td><td class="embedlink">' + embedLink + '</td><td class="howtolink">' + howto + '</td><td class="description">' + description + '</td><td>' + category + '</td><td>' + subject + '</td><td>' + tags + '</td><td><button type="submit" class="editButton">Edit</button><button type="submit" class="deleteButton">Delete</button></td></tr>')

    }

}

function postNewResource (){
    tagArray=$("input#tags").val().split(",");
    for(i=0; i<tagArray.length; i++){
        tagArray[i] = tagArray[i].trim();
    }

    var embedObj= {
        embedName:$("input#embedName").val(),
        embedLink : $("input#embedLink").val(),
        logo: $("input#logo").val(),
        howto : $("input#howto").val(),
        description : $("textarea#description").val(),
        category : $("input#category").val(),
        tags : tagArray,
        subject : $("input#subject").val()
    };

    $.ajax({
        type: "POST",
        url: "/resources/new",
        data: embedObj,
        success: function(){
            console.log("POST sent");
        },
        error: function(xhr, status){
            console.log("Error: " + status,+xhr);
        },
        complete: function(){
            console.log("POST Complete!");
        }
    });
}

function compareAlphabetically(a, b) {
    if (a.embedName < b.embedName)
        return -1;
    if (a.embedName > b.embedName)
        return 1;
    return 0;
}