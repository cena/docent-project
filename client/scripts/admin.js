/**
 * Created by huck on 9/23/15.
 */


$(document).ready(function() {

    //the delete modal on admin page
    $("table").on("click", ".deleteButton", function () {
        $(".deleteModal").modal('show');
        var id = $(this).parent().parent()[0].dataset.id;
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
                }
            });
        });
    });
    $(".deleteModal").on("click", ".deleteResource", function(){
        console.log("testing delete resource button");
        var resourceID = $(this).parent().data("id");
        console.log("this is resourceID var:", resourceID);
        deleteResourceById(resourceID);
    });
    $(".newResourceButton").on("click", function () {
        $(".newModal").modal('show');
    });
    $("table").on("click", ".editButton", function () {
        $(".editModal").modal('show');
    });

    getResources();

});

function  getResources() {
    filteredArray=[];
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/resources",
        success: function(data) {
            //data.resources.sort(compareAlphabetically);
            //callback(data.resources);
            console.log(data);
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

//delete ajax call
function deleteResourceById (id){
    console.log('delete by id call for resources is up');
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: "api/resources/"+id,
        success: function(data) {
            console.log(this);
            console.log(data);
            console.log('resource deleted');
        },
        error: function(err){
            console.log(err);
        }

    })
}

// ADMIN PAGE CONTENT
function displayAdmin (data){
    console.log(data);
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
        $("#admin").append('<tr data-id="'+data.resources[i]._id+'"><td>' + embedName + '</td><td>' + logo + '</td><td class="embedlink">' + embedLink + '</td><td class="howtolink">' + howto + '</td><td class="description">' + description + '</td><td>' + category + '</td><td>' + subject + '</td><td>' + tags + '</td><td><button type="submit" class="editButton">Edit</button><button type="submit" class="deleteButton">Delete</button></td></tr>')

        console.log("displayAdmin function working!")
    }

}