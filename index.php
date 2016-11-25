<?php ?>
<!DOCTYPE html>
<html lang="pl-PL">
    <head>
        <meta charset="UTF-8">
        <title>Books</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/readable/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header"></br>
                    <p class="head">Book Case - Compose your favourite list</p>
                    <div class="book"></div>
                </div>
            </div>
        </nav>
        <br>
        <p class="text">Add a new Book:</p><br>
        <form class="form-horizontal" action="api/books.php" method="POST">

            <div class="form-group has-success">
                <label class="col-sm-1 control-label" for="inputSuccess">Title:</label>
                <div class="col-sm-5 form-group">
                    <input type="text" class="form-control" id="inputSuccess" name="title">
                </div>
            </div>
            <div class="form-group  has-warning">
                <label class="col-sm-1 control-label" for="inputSuccess">Author:</label>
                <div class="col-sm-5 form-group">
                    <input type="text" class="form-control" id="inputSuccess" name="author">
                </div>
            </div>
            <div class="form-group has-error">
                <label class="col-sm-1 control-label" for="inputError">Description:</label>
                <div class="col-sm-5 form-group">
                    <input class="form-control description" type="text" id="inputError" name="description">
                </div>
            </div>
            <button type="submit" class="btn btn-default" id="addBook">Add new Book</button>
        </form>
        <br><br>
        <div id="bookList" class="panel-group"></div>
    </div>



</body>
</html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/JavaScript" src="js/app.js"></script>