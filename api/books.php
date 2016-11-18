<?php

require_once 'src/dbConnection.php';
require_once 'src/book.php';

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id']) && $_GET['id']>0){
        $book= Book::loadFromDb($conn, $_GET['id']);
        echo json_encode($book);
    }else{
        $books= Book::loadAllFromDB($conn);
        echo json_encode($books);
    }
    
}else if($_SERVER['REQUEST_METHOD']=='POST'){
    if(isset($_POST['title']) && isset($_POST['author']) && isset($_POST['description'])){
        $newbook= new Book;
        $newbook->setTitle($_POST['title']);
        $newbook->setAuthor($_POST['author']);
        $newbook->setDescription($_POST['description']);
        $newbook->createBook($conn);
        
        header('Location: ../index.php');
                
    }
}