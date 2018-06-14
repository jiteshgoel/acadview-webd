var emailSearch = "";
function validateEmail(){
    // read email by querySelector API
    let email = document.querySelector("#email").value;
    emailSearch = email;
    
    
    var queryURL = `https://us-central1-fir-testing-696e9.cloudfunctions.net/emailValidator/${email}`;
    
    // make AJAX request using fetch API
    fetch(queryURL)
        .then(function (response) {
            //return response;
            return response.json();
        })
        .then(function (result) {
            displayLocationResult(result);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

function displayLocationResult(result) {
    // get message div
    console.log(result);
    let msgDiv = document.querySelector("#message");
    // select result div
    let div = document.querySelector("#result");

    if (result.message) {
        // clear contents
        div.innerHTML = "";

        
        msgDiv.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <strong>oops!</strong> ${result.message} \
                            </div>`;    
    }
    
    else {
        // display success
        msgDiv.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <h4>${emailSearch}<h4> \
                            </div>`;
        
        // clear contents
        div.innerHTML = "";


        
    let smtp = `<div class="jumbotron alert-success" id="id_1"> \
                                <div class="row">
                                    <div class=col-sm-12 col-xs-12>
                                        <h2 style="color:green">Email is valid &#10004<h2>
                                    </div>
                                </div>
                            </div>`;
    let notsmtp = `<div class="jumbotron alert-danger" id="id_1"> \
                    <div class="row">
                        <div class=col-sm-12 col-xs-12>
                            <h2 style="color:red">Email is not valid &#10007<h2>
                        </div>
                    </div>
                </div>`;

    if(result.smtp_check){
        $("#result").append(smtp);
    }
    else {
        $("#result").append(notsmtp);
    }
    

    console.log(result);
    }
}
