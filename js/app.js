$(function () {
    //loading all books from DB
    $.ajax({
        url: 'api/books.php',
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
    

        for (var i = 0; i < result.length; i++) {
            var book = JSON.parse(result[i]);
           

            //div for single book
            var bookDiv = $('<div>').addClass('singleBook').addClass('col-sm-8 panel').addClass('panel panel-default');
            var titleDiv = $('<div>').addClass('panel-heading').addClass('clearfix');
            var title = $('<h4>');
            title.addClass('text');
            title.attr('data-id', book.id);
            title.attr('style', 'display: inline-block');
            title.html('<a class="bookTitle" data-toggle="collapse" data-parent="#bookList" href="#desc'
                    + book.id + '">' + book.title +" &nbsp/" + book.author + '</a>');
            var deleteBtn = $('<button>').addClass('btn').addClass('btn btn-default').addClass('pull-right');
            deleteBtn.addClass('deleteBook');
            deleteBtn.text('Delete');
            titleDiv.append(title);
            titleDiv.append(deleteBtn);
            bookDiv.append(titleDiv);


            //div for description
            var descDiv = $('<div>');
            descDiv.attr('id', 'desc' + book.id);
            descDiv.addClass('panel-collapse').addClass('collapse');
            var desc = $('<div>').addClass('panel-body fixed-panel').addClass('description');

            descDiv.append(desc);
            bookDiv.append(descDiv);

          
            $('#bookList').append(bookDiv);
        }

    }).fail(function (result) {
        console.log('Error');
    });



    $('#bookList').on('click', $('.bookTitle'), function (e) {


        var target = $(e.target);
        var bookTitle = $(e.target).closest('.singleBook').find('.bookTitle');
        var desc = target.closest('.singleBook').find('.description');

            //loading sigle book
        var bookId = target.closest('.singleBook').find('.text').attr('data-id');
        

            
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                data: 'id=' + bookId,
                dataType: 'json'

            }).done(function (result) {
                var book = JSON.parse(result[0]);
                
        var editLink = '<a href="#edit" id="editBook">Edit</a>';
        
                

                desc.html('<p class="text-info">Author: ' + book.author + '</p> '+ '<div> Description:<br> '
                        + book.description + '</div>' + editLink);

            }).fail(function (result) {
                console.log('Error');
            });

    });


// deletion of a single book

    $('#bookList').on('click', $('.deleteBook'), function (e) {

        var target = $(e.target);
        var deleteBtn = $(e.target).closest('.singleBook').find('.deleteBook');

        if (target[0] == deleteBtn[0]) {

            var bookId = $(e.target).prev().attr('data-id');

            $.ajax({
                url: 'api/books.php',
                type: 'DELETE',
                data: 'id=' + bookId
                
            }).done(function (result) {
                console.log('The book has been deleted');
                location.reload();
            }).fail(function (result) {
                console.log('Error');
            });

        }

    });
    
    $('#bookList').on('click', $('#editBtn'), function (e) {
     
        var target = $(e.target);

        var desc = target.closest('.singleBook').find('.description');
        console.log(desc);

          
        var bookId = target.closest('.singleBook').find('.text').attr('data-id');
       
        
        var form ='<form class="form-inline editingForm" action="api/books.php" method="PUT">\n\
                    <div class="form-group">\n\
                        <label for="title">New Title:</label>\n\
                        <input type="text" class="form-control" name="title">\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="author">New Author:</label>\n\
                        <input type="text" class="form-control" name="author">\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="desc">New Description:</label>\n\
                        <input type="text" class="form-control" name="description">\n\
                    </div>\n\
                    <button type="submit" class="btn btn-primary" id="editBook">Edit</button>\n\
                </form>';
        
        desc.html(form);
        
        
    });
    
    
    $('#bookList').on('click', $('#editBook'), function (e) {

//        e.preventDefault();

        var target = $(e.target);
        var editBtn = $(e.target).closest('.singleBook').find('#editBook');

        if (target[0] == editBtn[0]) {
            var bookId = $(e.target).closest('div.panel-collapse').prev().find('h4').attr('data-id');
            var newTitle = $(e.target).parent().find('input[name="title"]').val();
            var newAuthor = $(e.target).parent().find('input[name="author"]').val();
            var newDesc = $(e.target).parent().find('input[name="description"]').val();

            $.ajax({
                url: 'api/books.php',
                type: 'PUT',
                data: 'id=' + bookId + '&title=' + newTitle + '&author=' + newAuthor + '&description=' + newDesc,
            }).done(function (result) {
                console.log('Edytowano książkę');
                location.reload();
            }).fail(function (result) {
                console.log('Error - nie mogę edytować książki');
            });
        }

    });



});
