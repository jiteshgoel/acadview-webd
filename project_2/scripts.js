var locationSearch = "";
function checkweather(){
    // read email by querySelector API
    let location = document.querySelector("#location").value;
    locationSearch = location;

    // query URL
    let queryURL = "https://us-central1-fir-testing-696e9.cloudfunctions.net/weather/" + location;
    
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
    // hide locaion modal
    // more info check https://getbootstrap.com/docs/3.3/javascript/#modals
    $('#locationModal').modal('hide');

    // get message div
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
                                <strong>Weather of </strong><h3 style="text-transform: uppercase">${locationSearch}.<h3> \
                            </div>`;
        
        // clear contents
        div.innerHTML = "";

        // counter
        // var i = 0;
        // loop through all the objects in result
        // result.consolidated_weather.forEach(function(currentResult) {
        //     let hackedHTMLDiv = `<div class="jumbotron" id="id_${i}"> \
        //                             <div class="row">
        //                                 <div class="col-xs-12 col-sm-4">
        //                                     <h5>${currentResult.weather_state_name}: <small><a target="_blank" href="${currentResult.Domain}">website</a></small></h5>
        //                                     <h5>Breach Date: <small>${currentResult.BreachDate}</small></h5>
        //                                     <h5>Added: <small>${currentResult.AddedDate}</small></h5>
        //                                     <h5>Modified: <small>${currentResult.ModifiedDate}</small></h5>
        //                                 </div>
        //                                 <div class="col-xs-12 col-sm-8">
        //                                     <h5>${currentResult.Name}</h5>
        //                                     <p>${currentResult.Description}</p>
        //                                 </div>
        //                                 <div class="col-xs-12" id="data_id_${i}">
        //                                     <h5>Compromised data</h5>
        //                                 </div>
        //                             </div>
        //                         </div>`;

        //     // add/append to the result div
        //     // more info http://api.jquery.com/append/
        //     $('#result').append(hackedHTMLDiv);

        //     // loop through data classes
        //     currentResult.DataClasses.forEach(function(currentDataClass) {
        //         // get and append to compromised data div
        //         $(`#data_id_${i}`).append(`<span class="label label-danger danger-label">${currentDataClass}</span>`);
        //     });

        //     // increment counter
        //     i++;
        // });
        const weather = result.consolidated_weather;
        console.log(weather);

        for(let i=0; i<weather.length; i++) {
            console.log(weather[i].weather_state_name);
            var elemts = `<div>${weather[i]}`;
            let hackedHTMLDiv = `<div class="jumbotron" id="id_${i}"> \
                                    <div class="row">
                                    <h3>Date: <h5  style="color:green">${weather[i].applicable_date}</h5></h3>
                                        <div class="col-xs-12 col-sm-12" style="text-align:center">
                                            <h3>Minimum Temprature : <h5 style="color:blue">${weather[i].min_temp} &deg;C</a></h5></h3>
                                            <h3>Maximum Temprature : <h5 style="color:blue">${weather[i].max_temp} &deg;C</h5></hh3>
                                            <h3>Current Temprature : <h5 style="color:blue">${weather[i].the_temp} &deg;C</h5></h3>
                                            <h3>Wind Speed: <h5 style="color:blue">${weather[i].wind_speed}</h5></h3>
                                        </div>
                                    </div>
                                </div>`;
            $("#result").append(hackedHTMLDiv);
        }

        console.log(result);
    }
}