function checkEmail(){
    // read email by querySelector API
    let email = document.querySelector("#id_email").value;
    
    // validate email
    if (!email || email === ""){
        alert("Blank Value supplied");
        return;
    }

    // query URL
    let queryURL = "https://us-central1-fir-testing-696e9.cloudfunctions.net/api/" + email;
    
    // make AJAX request using fetch API
    fetch(queryURL)
        .then(function (response) {
            //return response;
            return response.json();
        })
        .then(function (result) {
            displayEmailResult(result);
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

function displayEmailResult(result) {
    // hide email modal
    // more info check https://getbootstrap.com/docs/3.3/javascript/#modals
    $('#emailModal').modal('hide');

    // get message div
    let msgDiv = document.querySelector("#message");
    // select result div
    let div = document.querySelector("#result");

    if (result.message) {
        // clear contents
        div.innerHTML = "";

        // email not hacked
        // display success alert 
        msgDiv.innerHTML = '<div class="alert alert-success alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <strong>Good News!</strong> Your email address is never hacked. \
                            </div>';    
    }
    else {
        // email hacked
        // display error alert
        msgDiv.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert"> \
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
                                <strong>Hacked!!</strong> Better check yourself, you\'re not looking too good. \
                            </div>';
        
        // clear contents
        div.innerHTML = "";

        // counter
        var i = 0;
        // loop through all the objects in result
        result.forEach(function(currentResult) {
            let hackedHTMLDiv = `<div class="jumbotron" id="id_${i}"> \
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-4">
                                            <h5>${currentResult.Title}: <small><a target="_blank" href="${currentResult.Domain}">website</a></small></h5>
                                            <h5>Breach Date: <small>${currentResult.BreachDate}</small></h5>
                                            <h5>Added: <small>${currentResult.AddedDate}</small></h5>
                                            <h5>Modified: <small>${currentResult.ModifiedDate}</small></h5>
                                        </div>
                                        <div class="col-xs-12 col-sm-8">
                                            <h5>${currentResult.Name}</h5>
                                            <p>${currentResult.Description}</p>
                                        </div>
                                        <div class="col-xs-12" id="data_id_${i}">
                                            <h5>Compromised data</h5>
                                        </div>
                                    </div>
                                </div>`;

            // add/append to the result div
            // more info http://api.jquery.com/append/
            $('#result').append(hackedHTMLDiv);

            // loop through data classes
            currentResult.DataClasses.forEach(function(currentDataClass) {
                // get and append to compromised data div
                $(`#data_id_${i}`).append(`<span class="label label-danger danger-label">${currentDataClass}</span>`);
            });

            // increment counter
            i++;
        });

        console.log(result);
    }
}