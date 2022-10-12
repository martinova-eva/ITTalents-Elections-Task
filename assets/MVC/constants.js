 
 let regForm = document.getElementById('registerForm');
 let name = document.getElementById('usernameReg');
 let password  = document.getElementById('password');
 let confirmPassword  = document.getElementById('confirmPassword');
 let errorEmailAlert = document.getElementById('userExistsError');
 let passMismatchError = document.getElementById('passMismatchError');
 let loginBtnInReg = document.getElementById('loginInReg');
 let regButton = document.getElementById('registerBtn')


 let register = document.getElementById('register');
 let login = document.getElementById('login');
 

 let loginForm = document.getElementById('loginForm');
 let loginUsername = document.getElementById('loginUsername');
 let loginPass = document.getElementById('loginPass');
 let loginBtn = document.getElementById('loginButton');
 let loginError = document.getElementById('loginError');
 let regInLogin = document.getElementById('registerInLogin');


let loggedUser;
let sessionId = JSON.parse(localStorage.getItem('sessionId'));

let homePage = document.getElementById('results'); 

let detailsPage = document.getElementById('details');

let resultPage = document.getElementById('result');
let tableWithElectionResult = document.getElementById('appendRes');

let welcomeExitMsg = document.getElementById('welcomeExit');
let exit = document.getElementById('exit');
let searchByPartyName = document.getElementById('searchByPartyName');

let loadingGif = document.getElementById('loadingGif');
let alertMessage = document.getElementById('alert');

let goToHomePage = document.getElementById('homepageLink');
let header = document.getElementById('header');
let footer = document.getElementById('footer');


