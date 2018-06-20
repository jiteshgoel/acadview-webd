function loadCurrencies(){
    // get base currency
    let baseCurrency = document.querySelector('base_currency').value;

    if(!baseCurrency) {
        alert("Currency field is empty");
        return;
    }

    // query URL
    let queryURL = "https://exchangeratesapi.io/api/latest?base=" + baseCurrency;
    
    // make AJAX request using fetch API
    fetch(queryURL)
        .then(function (response) {
            //return response;
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            displayCurrencyResult(result);
        })
        .catch(function (error) {
            alert("Something went wrong. Check internet connectivity or Invalid currency");
            console.log(error.message);
        });
}

function displayCurrencyResult(result) {
    // get message div
    let msgDiv = document.querySelector("#message");
    // select current matches div
    let div = document.querySelector("#current-matches");

    // clear contents
    div.innerHTML = "";

    // loop through result
    result.forEach(function(currentMatch) {
        // check for live match
        var status = "";
        if(currentMatch.matchStarted){
            status = "Live"
        }
        //team1 = currentMatch["team-1"];
        // create a html div and append it to current matches div
        let matchDiv = `<div class="col-xs-12 col-sm-6 col-md-4" >
                            <div class="panel panel-primary">
                                <div class="panel-heading">
                                    ${currentMatch["team-1"]} vs ${currentMatch["team-2"]} <span>${status}</span>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div class="jumbotron">
                                                <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> ${currentMatch.dateTimeGMT}
                                            </div>
                                        </div>
                                        <div class="col-xs-12 text-center">
                                            <button class="btn btn-primary" onclick="getMatchData(${currentMatch.unique_id});">View</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-footer"><span class="glyphicon glyphicon-tags" aria-hidden="true"></span> ${currentMatch.type}</div>
                            </div>
                        </div>`;

        // append it
        // more info http://api.jquery.com/append/
        $('#current-matches').append(matchDiv);
    });

    console.log(result);
}

function getMatchData(match_id) {
    // query URL
    let queryURL = "https://cricapi.com/api/cricketScore?apikey=fdTh9MMmd3OPiTFM4LTCr22Xr4s1&unique_id=" + match_id;
    
    // make AJAX request using fetch API
    fetch(queryURL)
        .then(function (response) {
            //return response;
            return response.json();
        })
        .then(function (result) {
            // you can use bootstrap modals for better styling and layouts
            if(result.matchStarted && result.score){
                alert(`Live Score: ${result.score}`);
            }
            else{
                alert("Match not started!!!");
            }
        })
        .catch(function (error) {
            alert("Something went wrong. Check internet connectivity");
            console.log(error.message);
        });
}

// call the loadCurrencies() after window loads
window.onload = loadCurrencies;