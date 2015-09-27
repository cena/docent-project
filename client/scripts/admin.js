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
                $(".resourceName").val(response.embedName);
                $(".resourceLink").val(response.embedLink);
                $(".howToLink").val(response.howto);
                $(".resDescrip").val(response.description);
                $(".resCategory").val(response.category);
                $(".resSubject").val(response.subject);
                $(".resTags").val(response.tags);
            }
        });

        $(".editModal").on("click", ".submitButton", function(){
            $.ajax({
                type: "PUT",
                url: "/resources/" + id,
                success: function(){
                    console.log("Resource edits sent");
                },
                error: function(xhr, status){
                    alert("Error: " + status);
                },
                complete: function(){
                    $("#newEmbedForm")[0].reset();
                    $(".editModal").modal('hide');
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

    getResources();

});

function  getResources() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/resources",
        success: function(data) {
            displayAdmin(data);

        }
    })
}

//to populate form data in modal for edit mode
function getResourceById (id){
    console.log('get call for resources by id is up');
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


function displayAdmin (data){
    $('.resourceRow').remove();
    for(var i = 0; i < data.resources.length; i++) {
        tags = "";
        embedName = data.resources[i].embedName;
        logo = data.resources[i].logo;
        embedLink = (data.resources[i].embedLink) ? data.resources[i].embedLink : "";
        howto = (data.resources[i].howto) ? data.resources[i].howto : "";
        description = (data.resources[i].description) ? data.resources[i].description : "";
        category = (data.resources[i].category) ? data.resources[i].category : "";
        subject = (data.resources[i].subject) ? data.resources[i].subject : "";
        if (data.resources[i].tags !== null && data.resources[i].tags !== 0) {
            for (var j = 0; j < data.resources[i].tags.length; j++) {
                tags += '<p class="tag">' + data.resources[i].tags[j] + '</p>';
            }
        }
        $("#admin").append('<tr class="resourceRow" data-id="'+data.resources[i]._id+'"><td>' + embedName + '</td><td>' + logo + '</td><td class="embedlink">' + embedLink + '</td><td class="howtolink">' + howto + '</td><td class="description">' + description + '</td><td>' + category + '</td><td>' + subject + '</td><td>' + tags + '</td><td><button type="submit" class="editButton">Edit</button><button type="submit" class="deleteButton">Delete</button></td></tr>')

        console.log("displayAdmin function working!")
    }

}

function postNewResource (){
    var embedObj= {
        embedName:$("input#embedName").val(),
        embedLink : $("input#embedLink").val(),
        logo: $("input#logo").val(),
        howto : $("input#howto").val(),
        description : $("textarea#description").val(),
        category : $("input#category").val(),
        tags : $("input#tags").val(),
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

