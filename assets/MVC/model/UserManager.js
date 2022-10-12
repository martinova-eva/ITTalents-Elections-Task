class User{
    constructor(name, password, hasVoted = 'false', id = ""){ 
        this.name = name; 
        this.password = password;
        this.hasVoted = hasVoted;
        this.id = id;
    }
}
class Part{
    constructor(name, slogan, picture, id){ 
        this.name = name;
        this.slogan = slogan; 
        this.picture = picture;
        this.id = id;
    }
}

let userManager = (function(){
    class UserManager {
        constructor() {
            this.activeUser;
            this.allParties = [];
            
        }
        //possible responses: 400 - когато има такъв потребител, 200 успех, 500 проблем със сървъра
        addUser(name, password) {
            let user = {username : `${name}`, password: `${password}`}
           
            fetch('https://itt-voting-api.herokuapp.com/users', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
            }) 
            .then((response) => {
                if(response.status === 200){
                    return  true;
                }else if(response.status === 400){
                    errorEmailAlert.style.display = 'block';
                    location.hash = 'register';
                   throw new Error('exist user with same username');
                }else {
                    throw new Error('Server error');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                return false;
            });
            return true;
        }
        //possible responses: 400 - грешни входни данни, 200 успех
        validateCredentials(name, password) { 
            let user = {username : `${name}`, password: `${password}`}
            let sessionID;
            fetch('https://itt-voting-api.herokuapp.com/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
            })
            .then((response) =>{
                if(response.status === 200){
                    return response.json()
                }else{
                    throw new Error('...oops')
                }
            })
            .then((data) => {
               sessionID = data.sessionId;
               localStorage.setItem('sessionId', JSON.stringify(sessionID));
               this.activeUser = new User(name, password,'false', data.sessionId);
               localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
               setTimeout("location.reload(true);", 500);
            })
            .catch((error) => {
                console.log(error);
                location.hash = 'login';
                loginError.style.display = 'block';
                return false;
               
            });
            return true;
        }
        // possible responses: 401, 200
        logOut(sessionId){ 
            let data = {'id': sessionId}
           
            fetch('https://itt-voting-api.herokuapp.com/logout', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
            })
            .then((data) => {
                if(data.status === 200){
                    localStorage.removeItem('activeUser'); 
                    localStorage.removeItem('sessionId');
                    localStorage.removeItem('alreadyVotedUser'); 
                    this.activeUser = null; 
                }else{
                    throw new Error('you can not log out')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });  
        }
        //possible responses: 401, 400, 406 user tries to vote twice, 200, 500
        voteForParty(partId, sessionId){
            fetch(`https://itt-voting-api.herokuapp.com/vote/${partId}`, { 
            method: 'POST', 
            headers: {
                'identity': sessionId, 
                'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                if(response.status === 200){
                    alert('Congrats, you voted!');
                    let infoForUser = JSON.parse(localStorage.getItem('activeUser'));
                    let user = new User(infoForUser.name, infoForUser.password,'true', infoForUser.id);
                    localStorage.setItem('activeUser', JSON.stringify(user));
                    localStorage.setItem('alreadyVotedUser', JSON.stringify('voted'));
                    return true;
                }else if(response.status === 406){
                    localStorage.setItem('alreadyVotedUser', JSON.stringify('voted'));
                    setTimeout("location.reload(true);", 400);
                    alert('Sorry, you have already voted! We will restrict your access!');
                    location.hash = 'homePage';
                    throw new Error('you already vote');
                }else{
                    throw new Error('.ooopsssss. Something went wrong!')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        //possible responses: 401, 200, 404 - no such party
        showDetailsOfThePart(partId){
            fetch(`https://itt-voting-api.herokuapp.com/party/${partId}`, {
            method: 'GET', 
            headers: {
                'identity': sessionId, 
            }
            })
            .then((response) => response.json())
            .then((data) => {
                showDetailsOfThePart(data, detailsPage);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        checkForActiveUser(){
            if(localStorage.getItem('activeUser')){
                let currentUser = JSON.parse(localStorage.getItem('activeUser'))
                return new User(currentUser.name, currentUser.password, currentUser.hasVoted, currentUser.id);
            }
            return false;
        }        
        //possible responses: 401, 400 when the keyword is not provided, 200
        searchPartyByName(sessionId, inputValue){
            fetch(`https://itt-voting-api.herokuapp.com/parties-search`, {
                method: 'GET', 
                headers: {
                    'identity': sessionId,
                    'partyName': inputValue, 
                }
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json();
                }else if(response.status === 401){
                    throw new Error(' the keyword is not provided!');
                }else{
                    throw new Error('...ooopsssss. Something went wrong!')
                }
            })
            .then((data) => {
                if(data.length >= 1){
                    print(data, homePage)
                    return data;
                }else{
                    alert('Not faund! Try again!');
                }
                
             })
            .catch((error) => {
                console.error('Error:', error);
                return false;
            });

        }
        //possible responses: 401, 200
        showAllParties(sessionId){  
            this.allParties = [];          
            fetch('https://itt-voting-api.herokuapp.com/parties', {
            method: 'GET', 
            headers: {
                'identity': sessionId,
            }
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }
            })
            .then(data => {
                data.map(el => {
                    let oneEl =  new Part(
                        el.name,
                        el.slogan,
                        el.picture, 
                        el.id);
                    this.allParties.push(oneEl);
                })                
                print(this.allParties, homePage);
                return this.allParties; 
            })
            .catch((error) => {
                console.error('Error:', error);
                return false;
            });           
        }       
        checkUserStatus(){
            let user = JSON.parse(localStorage.getItem('activeUser'));
            if(user.hasVoted === 'true'){
                console.log('You already voted!');
                return true;
            }
            return false;
        }
        showElectionResults(sessionId){
            fetch(`https://itt-voting-api.herokuapp.com/results`, {
            method: 'GET', 
            headers: {
                'identity': sessionId, 
            }
            })
            .then((response) => response.json())
            .then((data) => {
                showResultsFromElections(this.allParties, data, tableWithElectionResult)
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        
    }
    return  new UserManager();
})();



