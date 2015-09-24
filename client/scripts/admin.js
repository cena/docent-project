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


});

// ADMIN PAGE CONTENT

function displayAdmin (data) {
    //sets data
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
    var tableRow = '<tr></tr>';

    $("#admin").append(adminTable);
    $(adminTable).append(tableRow);
    $(tableRow).append('<th>Embed Name</th><th>Logo Link</th><th>Embed Link</th><th>How To Video</th><th>Description</th><th>Category</th><th>Subjects</th><th>Tags</th><th>Edit and Delete</th>');
    $(adminTable).append(tableRow);
    $(tableRow).last().append('<td>'+ embedName +'</td><td>'+ logo +'</td><td class="embedlink">'+ embedLink +'</td><td class="howtolink">'+ howto +'</td><td class="description">'+ description +'</td><td>'+ category +'</td><td>'+ subject +'</td><td>'+ tags +'</td>')
}