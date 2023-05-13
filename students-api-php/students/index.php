<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require('db.php');


    $method = $_SERVER['REQUEST_METHOD'];

    if($method == "GET"){
        $sql = "SELECT * FROM tblstudents";
        if(isset($_GET['id'])){
            $sql = "SELECT * FROM tblstudents WHERE id =" . $_GET['id'];
        }

        $db = new DB();
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        $result = mysqli_query($connect, $sql);
    
        //Check number of row
        if (mysqli_num_rows($result) > 0) {
            // Fetch each data (mysqli_fetch_all get assosiative and value array)
            while($row = mysqli_fetch_all($result, MYSQLI_ASSOC)) {
                $data = $row;
            }
        } 
        else {
            $data = "0 results";
        }
        mysqli_free_result($result);
        $db->closeConnection($connect);
        echo json_encode($data);
    }

    if($method == "POST"){
        $data = urldecode(file_get_contents('php://input'));
        
        $value = json_decode($data, TRUE);

        $db = new DB();
        $sql = "INSERT INTO tblstudents (firstname, lastname, birthday, address, course, year, email, phoneno) VALUES (?,?,?,?,?,?,?,?)";
    
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        if($stmt = mysqli_prepare($connect, $sql)){
            mysqli_stmt_bind_param($stmt, "sssssiss", $first_name, $last_name, $birthday, $address, $course, $year, $email, $phone_no);
            
            $first_name = $value['firstname'];  
            $last_name = $value['lastname']; 
            $birthday =  $value['birthday'];    
            $address =  $value['address'];    
            $course =  $value['course'];    
            $year = $value['year']; 
            $email = $value['email'];   
            $phone_no =  $value['phoneno'];  
            mysqli_stmt_execute($stmt);
        }
        else{
            echo json_decode("No Record Found");
        }
        
        mysqli_stmt_close($stmt);
        $db->closeConnection($connect);
        $response =
        [
            "message" => "Student of " . $value['firstname'] . " ". $value['lastname'] . " was Added",
        ];
        echo json_encode($response);
    }

    if($method == "PUT"){
        $response = null;
        $sql = null;

        $data = urldecode(file_get_contents('php://input'));
        
        $value = json_decode($data, TRUE);

        if(isset($_GET['id'])){
            $first_name = $value['firstname'];  
            $last_name = $value['lastname']; 
            $birthday =  $value['birthday'];    
            $address =  $value['address'];    
            $course =  $value['course'];    
            $year = $value['year']; 
            $email = $value['email'];   
            $phone_no =  $value['phoneno'];  
            $sql = "UPDATE tblstudents SET firstname = '$first_name', lastname = '$last_name', birthday = '$birthday', address = '$address', course = '$course', year = '$year', email = '$email', phoneno = '$phone_no' WHERE id = " . $_GET['id'];
            $response =
            [
                "message" => "Student of " . $value['firstname'] . " ". $value['lastname'] . " was Updated",
            ];
            echo json_encode($response);
        }
        else{
            die("Error ID");
        }

        $db = new DB();
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        
        if (mysqli_query($connect, $sql)) {
            $message = "Record Update Successful";
        } 
        else {
            $message = "Error Updating record";
        }
        $db->closeConnection($connect);
        echo json_encode($message);      
    }

    if($method == "DELETE"){
        $response = null;
        $sql = null;

        $data = urldecode(file_get_contents('php://input'));
        
        $value = json_decode($data, TRUE);

        if(isset($_GET['id'])){
            $sql = "DELETE FROM tblstudents WHERE id = " . $_GET['id'];
        }
        else{
            die("Error ID");
        }

        $db = new DB();
        //Connect Database
        $connect = $db->connect();
        //Execute Query
        
        if (mysqli_query($connect, $sql)) {
            $response =
            [
                "message" => "Student of " . $value['firstname'] . " ". $value['lastname'] . " was Deleted",
            ];
        } 
        else {
            $message = "Error Updating record";
        }

        echo json_encode($response);
        $db->closeConnection($connect);
        echo json_encode($response);      
    }


?>