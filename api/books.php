<?php

$dir = dirname(__FILE__);

include($dir . '/src/dbConnection.php');
include($dir . '/src/book.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id']) && intval($_GET['id']) > 0) {
        $books = Book::loadFromDb($conn, intval($_GET['id']));
        echo json_encode($books);
    } else {
        $books = Book::loadFromDb($conn);
        echo json_encode($books);
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['title']) && isset($_POST['author']) && isset($_POST['description'])) {
        $newbook = new Book;
        $newbook->setTitle($_POST['title']);
        $newbook->setAuthor($_POST['author']);
        $newbook->setDescription($_POST['description']);
        $newbook->createBook($conn);

        header('Location: ../index.php');
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"), $put_vars);
    $id = $put_vars['id'];
    $title = $put_vars['title'];
    $author = $put_vars['author'];
    $desc = $put_vars['description'];
    $editedBook = new Book();
    $editedBook->setTitle($title);
    $editedBook->setAuthor($author);
    $editedBook->setDescription($desc);

    $editedBook->updateBook($conn, $id);
    header('Location: ../index.php');
    
} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"), $del_vars);
    $id = $del_vars['id'];
    Book::deleteFromDB($conn, $id);
    header('Location: ../index.php');
}

