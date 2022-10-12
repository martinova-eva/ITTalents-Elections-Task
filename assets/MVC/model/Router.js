const PAGE_IDS = ['register', 'login', 'homePage', 'details', 'result',  'errorPage'];

let router = (function(){
    class Router {
        handleHashChange() {
            let hash;

            if(userManager.checkForActiveUser()){
                hash = window.location.hash.slice(1);
                if(!hash){
                    location.hash = PAGE_IDS[2];
                }
                
            }else{
                hash = window.location.hash.slice(1); 
                if(hash !== PAGE_IDS[1] && hash !== PAGE_IDS[0]){
                    hash = PAGE_IDS[0]
                }
            }
            if(!PAGE_IDS.includes(hash)){
                hash = PAGE_IDS[5];
            }
            
            PAGE_IDS.forEach(pageId => {
                let section = document.getElementById(pageId);
                section.style.display = pageId === hash ? 'flex' : 'none';
            });
            
        }
    
    }
    return new Router();
})();