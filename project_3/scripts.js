function getdata(){
    var key = document.getElementById("search").value;
    let url = `https://images-api.nasa.gov/search?q=${key}`;
    document.querySelector("body").background = "";

fetch(url)
.then(res => res.json())
.then((out) => {
    for(let i=0; i<5; i++) {
        var jsonurl = out.collection.items[i].href;
        fetch(jsonurl)
            .then(res => res.json())
            .then((image) => {
                var pic = image[0];
                console.log(pic);

                $(".container4").hide();
                $("#result").append(`<div class="jumbotron" id="id_${i}"> \
                <div class="row">
                    <div class="col-xs-12 col-sm-12" style="text-align:center; margin:0;">
                       <img src=${pic} width=50% height=100%>
                    </div>
                </div>
            </div>`);
            })
            .catch(err => {throw err});
    }
})
.catch(err => { throw err });
}

window.onload = function(){
    let url = "https://api.nasa.gov/planetary/apod?api_key=wIbFNvwjLvxNtDJFwnn7KjoqlOvdBYubIzUh5hJI";
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            image = out.hdurl;
            document.querySelector("body").background = `${image}`;
            console.log(image);
        })
        .catch(err => { throw err });
        }