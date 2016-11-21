$(function () {
       $.ajax({
        url: 'api/books.php',
        type: 'GET',
        dataType: 'json'
    }).done(function (result) {
        

        for (var i = 0; i < result.length; i++) {
            var book = JSON.parse(result[i]);
           
            var bookDiv = $('<div>');
            bookDiv.addClass('singleBook').addClass('panel').addClass('panel-info');
            var titleDiv = $('<div>');
            titleDiv.addClass('panel-heading').addClass('clearfix');
            var title = $('<h4>');
            title.addClass('panel-title');
            title.attr('data-id', book.id);
            title.attr('style', 'display: inline-block');
            title.html('<a class="bookTitle" data-toggle="collapse" data-parent="#bookList" href="#desc'
                    + book.id + '">' + book.title + '</a>');
            var deleteBtn = $('<button>').addClass('btn').addClass('btn-primary').addClass('pull-right');
            deleteBtn.addClass('deleteBook');
            deleteBtn.text('Delete');
            titleDiv.append(title);
            titleDiv.append(deleteBtn);
            bookDiv.append(titleDiv);


           
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

        if (target[0] == bookTitle[0]) {

            var desc = target.closest('.singleBook').find('.description');

            
            var bookId = target.closest('.singleBook').find('.panel-title').attr('data-id');

            $.ajax({
                url: 'api/books.php',
                type: 'GET',
                data: 'id=' + bookId,
                dataType: 'json'

            }).done(function (result) {
                var book = JSON.parse(result[0]);

                var form = '<form class="form-inline editingForm" action="api/books.php" method="PUT">\n\
                    <div class="form-group">\n\
                        <label for="title">Nowy tytuł:</label>\n\
                        <input type="text" class="form-control" name="title">\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="author">Nowy autor:</label>\n\
                        <input type="text" class="form-control" name="author">\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="desc">Nowy opis:</label>\n\
                        <input type="text" class="form-control" name="desc">\n\
                    </div>\n\
                    <button type="submit" class="btn btn-primary" id="editBook">Zmień</button>\n\
                </form>';

                desc.html('<p class="text-info">' + book.author + '</p><p>'
                        + book.description + '</p>' + form);

            }).fail(function (result) {
                console.log('Error');
            });

        }

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
                console.log('Book deleted');
                location.reload();
            }).fail(function (result) {
                console.log('Error');
            });

        }

    });

    


});