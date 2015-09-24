/**
 * Created by huck on 9/23/15.
 */


$(document).ready(function() {

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
        var tableHead = '<th>Embed Name</th><th>Logo Link</th><th>Embed Link</th><th>How To Video</th><th>Description</th><th>Category</th><th>Subjects</th><th>Tags</th><th>Edit and Delete</th>';
        var tableRow = '<tr></tr>';

        $("#admin").append('<tr><td>' + embedName + '</td><td>' + logo + '</td><td class="embedlink">' + embedLink + '</td><td class="howtolink">' + howto + '</td><td class="description">' + description + '</td><td>' + category + '</td><td>' + subject + '</td><td>' + tags + '</td></tr>')

        console.log("working?")
    }

}