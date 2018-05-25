function search() {    
    var queryURL = "https://jsonplaceholder.typicode.com/photos";
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryURL, true);

    // called when the response is arrived
    xhr.onload = function(e) {
      var jsonResponse = xhr.response;

      // turn the response into a JavaScript object
      var photos = JSON.parse(jsonResponse);
      displayPhotos(photos);
    }
    
    // in case of error
    xhr.onerror = function(err) {
      console.log("Error: " + err);
    }
    
    // sends the request
    xhr.send();
} 
  
function displayPhotos(photos) {
    // photos is a JavaScript object
  
    // empty the div that contains the results
    var Gallery = document.querySelector("#gallery");
    Gallery.innerHTML = "";

    // iterate on the array of users
    photos.forEach(function(currentPhoto) {
        // create a new Image object and append it to gallery element.
        var img = new Image;
        img.src = currentPhoto.thumbnailUrl;
        Gallery.appendChild(img);
    });
}