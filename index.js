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
$(document).ready(function() {
    $.ajax({
        url: "http://localhost/students-api-php/students/",
        method: "GET", 
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            txt = "";
            for(var item of response){
                txt += 
                `
                <tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.firstname}</td>
                    <td>${item.lastname}</td>
                    <td>${item.birthday}</td>
                    <td>${item.address}</td>
                    <td>${item.course}</td>
                    <td>${item.year}</td>
                    <td>${item.email}</td>
                    <td>${item.phoneno}</td>
                    <td>
                        <a href="student.html?id=${item.id}" class="btn btn-outline-dark btn-sm">More Details</a>
                    </td>
                </tr>
                
                `;
                document.getElementById("api").innerHTML = txt;
            }
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");                    
            alert(err.Message);
        }
    })
});

function addRecord(){
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
    $(document).ready(function() {
        $.ajax({
            url: "http://localhost/students-api-php/students/",
            method: "POST", 
            
            data: JSON.stringify(data),
            success: function(response) {
                if (alert(`Student of ${document.getElementById("lastname").value} was Added`))
                {
                    window.location.assign("/");
                }
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                alert(err.Message);
            }
        })
    });
}

