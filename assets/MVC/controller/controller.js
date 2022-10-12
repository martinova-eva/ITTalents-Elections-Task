    loginForm.addEventListener('input', function(e){
        e.preventDefault();
       
    })
    loginBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(loginUsername.value && loginPass.value){
                let log = userManager.validateCredentials(loginUsername.value, loginPass.value);
                console.log(log)
                if(log === true){
                    loggedUser = userManager.checkForActiveUser();
                    location.hash = 'homePage';
                    loginError.style.display = 'none';
                    
                }else{
                    location.hash = 'login';
                    loginError.style.display = 'block';
                }
        }else{
            location.hash = 'login';
            loginError.style.display = 'block';
        }
        if(!loginPass.value){
            loginError.style.display = 'none';
        }
        })

    
     regInLogin.addEventListener('click', function(){
         location.hash = 'register';           
     });
     
 
     regForm.addEventListener('input', function(e){
         e.preventDefault();
         
         const nameValue = name.value;
         const passwordValue = password.value.trim();
         const confirmPassValue = confirmPassword.value.trim();
        
         if(nameValue && passwordValue && confirmPassValue){
             
             if(passwordValue === confirmPassValue && passwordValue && confirmPassValue){
                 regButton.removeAttribute('disabled');
                 passMismatchError.style.display = 'none';
                         const { name: { value: name }, password: { value: password } } = this.elements;
                         regButton.addEventListener('click', function(e){ 
                            e.preventDefault();  
                            let flag =  userManager.addUser(nameValue, passwordValue);
                                 if ((passwordValue === confirmPassValue) && flag) {
                                    errorEmailAlert.style.display = 'none';
                                    location.hash = 'login';
                                 }else{
                                    errorEmailAlert.style.display = 'block';
                                 }
                                 
                         });
             }else{
                 passMismatchError.style.display = 'block';
                 regButton.setAttribute('disabled', true);
             }
         }
         
     });
     
     loginBtnInReg.addEventListener('click', function(){
         location.hash = 'login';
     });
 