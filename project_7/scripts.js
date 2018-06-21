function loadCurrencies(){
    // get base currency
    let baseCurrency = document.getElementById("baseCurrency").value;

    // query URL
    let queryURL = `https://exchangeratesapi.io/api/latest?base=${baseCurrency}`;
    
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
    let div = document.querySelector("#rates");

    // clear contents
    div.innerHTML = "";

    msgDiv.innerHTML = `<div class="">
                            <div class="jumbotron">
                                <h1>Base Currency : ${result.base}</h1>  
                                <h3>${result.date}</h3>    
                            </div>      
                        </div>`;

    // loop through result

    for(var key in result.rates){
        if(result.rates.hasOwnProperty(key)){
            let rateDiv = `<div class="jumbotron" style="text-align:center">
                            <h1>${key}</h1>  
                            <h3 style="color:blue">${result.rates[key]}</h3>    
                        </div>`;

        // append it
        // more info http://api.jquery.com/append/
        $('#rates').append(rateDiv);
        }
    }
    

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
