window.addEventListener('hashchange', router.handleHashChange);
window.addEventListener('load', router.handleHashChange);

window.addEventListener('load',handleViewChange);
window.addEventListener('hashchange',handleViewChange);


let active = JSON.parse(localStorage.getItem('activeUser'))


function handleViewChange() {
    let hash = location.hash.slice(1);

    if(hash === 'homePage' && active) {
        header.style.display = 'flex';
        footer.style.display = 'flex';
        loggedUser = new User(active.name, active.password, active.hasVoted, active.id);
        welcomeExitMsg.innerHTML = `Hi,  ${loggedUser.name}! Welcome to the E-lections!`;
        userManager.showAllParties(sessionId);
        
    }else if(hash === 'details'&& active) {
        header.style.display = 'flex';
        footer.style.display = 'flex';
    }else if(hash === 'result'&& active){
        header.style.display = 'flex';
        footer.style.display = 'flex';
    }else {
        header.style.display = 'none';
        footer.style.display = 'none';
    }
    
}
function debounce(func, debounceTime) {
    let timerId;
    return function(event) {
        clearTimeout(timerId);
        timerId = setTimeout(func, debounceTime, event);
    }
}

debouncedHandler = debounce(makeASearch,1000);

searchByPartyName.addEventListener('input', debouncedHandler);

function makeASearch(){
    if(searchByPartyName.value.trim()){
        userManager.searchPartyByName(sessionId, searchByPartyName.value);
    }else{
        userManager.showAllParties(sessionId);
    }
}

exit.addEventListener('click', function(){
    regForm.reset();
    loginForm.reset();
    userManager.logOut(loggedUser.id); 
    header.style.display = 'none';
    footer.style.display = 'none';
    location.hash = 'register';

})

goToHomePage.addEventListener('click', function (){
    location.hash = 'homePage';
})

    
