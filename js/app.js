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
            var desc = $('<div>').addClass("panel-body").addClass('description');

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

            //loding sigle book
        var bookId = target.closest('.singleBook').find('.text').attr('data-id');
        console.log(bookId);

            
            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                data: 'id=' + bookId,
                dataType: 'json'

            }).done(function (result) {
                var book = JSON.parse(result[0]);
                

                desc.html('<p class="text-info">Author: ' + book.author + '</p> '+ '<p> Description:<br> '
                        + book.description + '</p>');

            }).fail(function (result) {
                console.log('Error');
            });

    });


    $('#bookList').on('click', $('.deleteBook'), function (e) {

        var target = $(e.target);
        var deleteBtn = $(e.target).closest('.singleBook').find('.deleteBook');

        if (target[0] == deleteBtn[0]) {

            var bookId = $(e.target).prev().attr('data-id');

            $.ajax({
                url: 'api/books.php',
                type: 'DELETE',
                data: 'id=' + bookId,
                
            }).done(function (result) {
                console.log('The book has been deleted');
                location.reload();
            }).fail(function (result) {
                console.log('Error');
            });

        }

    });



});
