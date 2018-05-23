var coefA, coefB, coefC, result;

function init(){
    coefA = document.querySelector("#valueA");
    coefB = document.querySelector("#valueB");
    coefC = document.querySelector("#valueC");
    result = document.querySelector("#result");
}

function updateEquation(){
    document.getElementById("a").innerHTML = coefA.value==1?"":coefA.value;
    document.getElementById("b").innerHTML = coefB.value==1?"":coefB.value;
    document.getElementById("c").innerHTML = coefC.value;
}

function solve(){
    if(eval(coefA.value) !== undefined && eval(coefB.value) !== undefined && eval(coefC.value) !== undefined){
        let a = coefA.value, b = coefB.value, c = coefC.value;
        let discriminant = getDiscriminant(a, b, c);
        if (discriminant<0){
            result.innerHTML = "There is no real root.";
        }
        else if (discriminant===0){
            let root1 = (-b+Math.sqrt(discriminant))/(2*a);
            let root2 = (-b-Math.sqrt(discriminant))/(2*a);
            result.innerHTML = "There is real and equal root.<br>";
            result.innerHTML += "x<sub>1</sub>: " + root1 + "<br>";
            result.innerHTML += "x<sub>2</sub>: " + root2 + "<br>";
        }
        else{
            let root1 = (-b+Math.sqrt(discriminant))/(2*a);
            let root2 = (-b-Math.sqrt(discriminant))/(2*a);
            result.innerHTML = "There is real and distinct root.<br>";
            result.innerHTML += "x<sub>1</sub>: " + root1 + "<br>";
            result.innerHTML += "x<sub>2</sub>: " + root2 + "<br>";
        }
    }
    else{
        result.innerHTML = "Please fill in all 3 coefficient";
    }
}

function getDiscriminant(a, b, c){
    return Math.pow(b, 2)-4*a*c;
}