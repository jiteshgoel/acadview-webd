function generateRandomNumber(){
  // read minimum and maximum values from input fields
  var minValue = document.querySelector("#min").value;
  var maxValue = document.querySelector("#max").value;

  // generate random no
  var randomNumber = Math.random() * (maxValue - minValue) + minValue;

  // update the output
  var outputField = document.querySelector("#random_no");
  outputField.innerHTML = randomNumber;
}