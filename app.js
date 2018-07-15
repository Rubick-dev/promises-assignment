// Most follower Application
document.querySelector(".loader").style.display = "none";
const btnpress = document.getElementById("btn");
const btnclear = document.getElementById("btn-clear");

btnpress.addEventListener('click', getWinner);
btnclear.addEventListener('click', clearResult);

function getMostFollowers(...usernames){
  let baseUrl = "https://api.github.com/users/";
  let urls = usernames.map(username => $.getJSON(baseUrl + username));
  return Promise.all(urls).then(function(data){
    let max = data.sort((a, b) => a.followers < b.followers) [0];
    return `${max.name} has the most followers with ${max.followers}`;
  });
}

function getWinner(){
  getMostFollowers('elie','tigarcia','colt').then(function(data){
     document.querySelector(".answer").innerHTML = data;
  });
}

function clearResult(){
  document.querySelector(".answer").innerHTML = '...';
}

// StarWars Application

const btnGetRandomFact = document.getElementById("ran-fact-btn");
var ranStarWarsPerson;

btnGetRandomFact.addEventListener('click', generateRandomFact);

function starWarsString(id){
  var str = '';
  return $.getJSON(`https://swapi.co/api/people/${id}`).then(function(data2){
    str += `${data2.name} is featured in `;
    let filmData = data2.films[0];
    return $.getJSON(filmData);
  }).then(function (res){
    str += `${res.title}, directed by ${res.director} `;
    let planetData = res.planets[0];
    return $.getJSON(planetData);
  }).then(function(res){
    str += `and it takes place on ${res.name}`;
    return str;
  }).then(function(finalString){
    return finalString;
  });
}

function generateRandomFact(){
  document.querySelector(".answer2").innerHTML = '';
  document.querySelector(".loader").style.display = "block";
  ranStarWarsPerson = Math.floor((Math.random() * (88 - 1)) + 1);
  console.log(ranStarWarsPerson);
  starWarsString(ranStarWarsPerson).then(function(data2){
    console.log(data2);
    document.querySelector(".answer2").innerHTML = data2;
  }).then(function(){
    document.querySelector(".loader").style.display = "none";
  });
}
