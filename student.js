function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const queryString = window.location.search; // Returns:'?id=1' in HTML URL
const params = new URLSearchParams(queryString); // Search URL paramerter
const id = params.get("id"); // is the number of id like 1 and so on

// GET one record
$(document).ready(function() {
    $.ajax({
        url: `http://localhost/students-api-php/students/index.php?id=${id}`,
        method: "GET", 
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            document.getElementById("studid").value = response[0].id;
            document.getElementById("firstname").value = response[0].firstname;
            document.getElementById("lastname").value = response[0].lastname;
            document.getElementById("birthday").value = response[0].birthday;
            document.getElementById("address").value = response[0].address;
            document.getElementById("course").value = response[0].course;
            document.getElementById("year").value = response[0].year;
            document.getElementById("email").value = response[0].email;
            document.getElementById("phoneno").value = response[0].phoneno;
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");                    
            alert(err.Message);
        }
    })
});

//PUT record
function updateRecord(){
    var data = {
        firstname : document.getElementById("firstname").value,
        lastname : document.getElementById("lastname").value,
        birthday : formatDate(document.getElementById("birthday").value),
        address : document.getElementById("address").value,
        course : document.getElementById("course").value,
        year : document.getElementById("year").value,
        email : document.getElementById("email").value,
        phoneno : document.getElementById("phoneno").value,
    }
    $.ajax({
        url: `http://localhost/students-api-php/students/index.php?id=${id}`,
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function(response) {
            window.location.assign("/");
            
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");                    
            console.log(err.Message);
        }
    });
}

// DELETE Record
function deleteRecord(){
    const id = document.getElementById("studid").value;
    $(document).ready(function() {
        $.ajax({
            url: `http://localhost/students-api-php/students/index.php?id=${id}`,
            method: "DELETE", 
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                window.location.assign("/");
                
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                alert(err.Message);
            }
        })
    });
}


