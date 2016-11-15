<?php


class Book implements JsonSerializable{
    
    private $id;
    private $title;
    private $author;
    private $description;
    
    
    public function __construct() {
        $this->id=-1;
        $this->title=null;
        $this->author=null;
        $this->description=null;
        
    }
    
    function getTitle() {
        return $this->title;
    }

    function getAuthor() {
        return $this->author;
    }

    function getDescription() {
        return $this->description;
    }

    function setTitle($title) {
        $this->title = $title;
    }

    function setAuthor($author) {
        $this->author = $author;
    }

    function setDescription($description) {
        $this->description = $description;
    }
    
    public static function loadFromDb(mysqli $conn, $id){
        
        $sql = "SELECT * FROM Books WHERE id=$id;";
        $result=$conn->query($sql);
        
        if($result==TRUE){
            $row=$result->fetch_assoc();
            
            $loadedBook= new Book;
            $loadedBook->id=$row['id'];
            $loadedBook->title=$row['title'];
            $loadedBook->author=$row['author'];
            $loadedBook->description=$row['description'];
            
            return $loadedBook;
        }
        
        return Null;
        
        
    }
    
    public static function loadAllFromDB(mysqli $conn){
        $sql="SELECT * FROM Books;";
        $result = $conn->query($sql);
        
        $books=[];
        
        if($result==TRUE){
           foreach($result as $row){
               $book= new Book();
               $book->id=$row['id'];
               $book->title=$row['title'];
               $book->author=$row['author'];
               $book->description=$row['description'];
               
               $books[]=$book;
               
             
           }
            
        }
        return $books;
    }
    
    public function createBook(mysqli $conn){
        
        $sql="INSERT INTO Books (title, author, description) VALUES('$this->title', '$this->author', '$this->description');";
        $result=$conn->query($sql);
        
        if($result==TRUE){
            $this->id=$conn->insert_id;
            return TRUE;
        }else{
            return FALSE;
        }
    }
    
    public function updateBook(mysqli $conn, $id){
        
        $sql = "UPDATE Books SET title='{$this->getTitle()}',"
                                 . "author='{$this->getAuthor()}',"
                                 . "description='{$this->getDescription()}'"
                 . "WHERE id=$id;";
            
        $result = $conn->query($sql);
            
        if($result){
            
            return TRUE;
        }
        

        return FALSE;
        
    }
    
    public function deleteFromDB(mysqli $conn, $id){
        
        if($id == -1){
            
            return False;
        }else{
        
        $sql="DELETE FROM Books WHERE id='$id';";
        
        $result=$conn->query($sql);
        
            if($result){
                return TRUE;
            }else{
                return FALSE;
            }
        
        }
    }
    
    public function jsonSerialize() {
        return[
            'id'=> $this->id,
            'title'=> $this->title,
            'author'=> $this->author,
            'description'=> $this->description               
        ];
    }
    
    
    
    


}