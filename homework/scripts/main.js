let blockRegister = document.querySelectorAll('.form-login')[0];
let inputTextUpName = document.getElementsByName('formUptextName');
let inputTextUpEmail = document.getElementsByName('formUptextEmail');
let inputTextInEmail = document.getElementsByName('formIntextEmail');
let inputTextUpPassword = document.getElementsByName('formUptextPassword');
let inputTextInPassword = document.getElementsByName('formIntextPassword');
let signIn = document.querySelector('.sign-in');
let signUp = document.querySelector('.sign-up');
let userLoginWindow = document.querySelector('.user-login');
let userLoginButton = document.querySelector('.user-login-button');
let regName = /^[a-zA-Z]{4,16}$/;
let regEmail = /^[a-zA-Z0-9]{2,}[\w\.\-\*]{1,}@{1}[a-zA-Z]{2,}\.{1}[a-zA-Z]{1,6}\.{0,1}[a-zA-Z]{1,6}$/;
let regPass = /^[a-zA-Z0-9]{4,16}$/;



function checkValue(items, reg){
    let arr = [...items];
    if(arr.every(elem => reg.test(elem.value))){
        return true;
    }
    return false;
}

function borderAdd(check, element, reg){
    let arr = element;
    arr.forEach(elem => {
        if(check){
            elem.style.border = !reg.test(elem.value) ? '1px solid red' : '1px solid green';
        }
        else{
            elem.style.border = '1px solid green';
        }
    })
}

function addObj(email, password, name, lastName){
    let obj = {};
    obj.email = email;
    obj.password = password;
    obj.name = name;
    obj.lastName = lastName;
    return obj;
}

function localStorageCheck(item){
    let arr = [...item];
    let check;
    if(localStorage.getItem(`${arr[0].value}`) === null){
        arr[0].nextElementSibling.nextElementSibling.style.display = 'none';
        check = true;
    }
    else{
        arr[0].nextElementSibling.nextElementSibling.style.display = 'block';
        check =  false;
    }
    if(check){
        let obj = addObj(arr[0].value, arr[1].value, arr[2].value, arr[3].value)
        localStorage.setItem(`${obj.email}`, JSON.stringify(obj));
        return true;
    }
    else{
        return false;
    }
    
}

function returnValue(){
    return [...inputTextUpEmail, ...inputTextUpPassword, ...inputTextUpName];
}

function localStorageCheckIn(item){
    let arr = [...item];
    let email = arr[0];
    let pass = arr[1];
    let local = localStorage.getItem(email.value);
    if(local !== null){
        local = JSON.parse(local);
        if(local.email === `${email.value}` && local.password === `${pass.value}`){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

function registerUser(){
    if(checkValue(inputTextUpEmail, regEmail) && checkValue(inputTextUpName, regName) && checkValue(inputTextUpPassword, regPass)){
        let arrValue = returnValue();
        if(localStorageCheck(arrValue)){
            let arr = returnValue();
            arr.forEach(elem => {
                elem.value = '';
                elem.style.border = '1px solid gray';
            });
        }
    }
    else{
        borderAdd(!checkValue(inputTextUpName, regName), inputTextUpName, regName);
        borderAdd(!checkValue(inputTextUpEmail, regEmail), inputTextUpEmail, regEmail);
        borderAdd(!checkValue(inputTextUpPassword, regPass), inputTextUpPassword, regPass);
    }
}

function loginUser(){
    let arr = [...inputTextInEmail, ...inputTextInPassword];
    let errorText = document.querySelector('#errorLoginText');
    errorText.style.display = 'none';
    let userLoginName = document.querySelector('#userLoginName');
    let userLoginEmail = document.querySelector('#userLoginEmail');
    let checkLoc = localStorageCheckIn(arr);
    if(checkLoc){
        let localUser = JSON.parse(localStorage.getItem(arr[0].value));
        userLoginWindow.style.display = 'block';
        userLoginButton.style.display = 'block';
        signIn.style.display = 'none';
        userLoginName.textContent = `${localUser.name} ${localUser.lastName}`;
        userLoginEmail.textContent = `${localUser.email}`;
    }
    else{
        errorText.style.display = 'block';
    }
}


document.querySelector('#buttonUp').addEventListener('click', registerUser);
document.querySelector('#buttonIn').addEventListener('click', loginUser);
document.querySelector('#buttonSignInNow').addEventListener('click', function(){
    signIn.style.display = 'block';
    signUp.style.display = 'none';
});
document.querySelector('#buttonSignUpNow').addEventListener('click', function(){
    signIn.style.display = 'none';
    signUp.style.display = 'block';
});
document.querySelector('#exitLogin').addEventListener('click', function(){
    signIn.style.display = 'block';
    userLoginWindow.style.display = 'none';
    userLoginButton.style.display = 'none';
})


