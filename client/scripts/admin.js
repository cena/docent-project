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

            $(".editForm").change(function () {
                title = $("#resourceName").val();
                logo = $(".logoLink").val();
                resourceLink = $(".resourceLink").val();
                howTo = $(".howToLink").val();
                description = $(".resDescrip").val();
                category = $(".resCategory").val();
                subject = $(".resSubject").val();
                tags = $(".resTags").val();
                console.log("is the .change thing working? ", title);
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
                    console.log("Item edited!");
                    $(".editModal").modal('hide');
                    //resetForm('#resourceForm');
                    getResources();
                }
            });
        });
    });

    getResources();

});

function  getResources() {
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


function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('select').removeAttr('checked').removeAttr('selected');
}