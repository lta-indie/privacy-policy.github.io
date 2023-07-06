var menuButton = document.getElementById('mobile-menu-btn');
var mobileMenuNavItems = document.getElementsByClassName('mobile-menu-nav-item');

var navButton = document.querySelectorAll('#nav a');
for (let index = 0; index < navButton.length; index++) {
    let element = navButton[index];
    
    element.addEventListener('click', hideMobileMenu);
}

// Games slider
const gamesSliders = document.querySelectorAll("#games-slider .slider-img");
var gamesSliderIndex = 0;
changeGamesSlider(gamesSliderIndex);

var movieSliderInterval = setInterval(changeGamesSlider, 5000);

function changeGamesSlider() {
    gamesSliderIndex++;

    if (gamesSliderIndex >= gamesSliders.length) {
        gamesSliderIndex = 0;
    }

    for (let i = 0; i < gamesSliders.length; i++) {
        gamesSliders[i].style.display = "none";
    }

    gamesSliders[gamesSliderIndex].style.display = "block";            
}

var gamesSliderLeftArror = document.querySelector('#games-slider .slider-arrow-left');
var gamesSliderRightArror = document.querySelector('#games-slider .slider-arrow-right');

gamesSliderLeftArror.addEventListener('click', () => {
    gamesSliderIndex -= 2;

    if (gamesSliderIndex < -1) gamesSliderIndex = gamesSliders.length - 2;

    clearInterval(movieSliderInterval);
    movieSliderInterval = setInterval(changeGamesSlider, 5000);

    changeGamesSlider(gamesSliderIndex);
});

gamesSliderRightArror.addEventListener('click', () => {
    changeGamesSlider();

    clearInterval(movieSliderInterval);
    movieSliderInterval = setInterval(changeGamesSlider, 5000);
});


// Apps slider
const appsSlider = document.querySelectorAll("#apps-slider .slider-img");
var appsSliderIndex = 0;
changeAppsSlider(appsSliderIndex);

var appSliderInterval = setInterval(changeAppsSlider, 5000);

function changeAppsSlider() {
    appsSliderIndex++;

    if (appsSliderIndex >= appsSlider.length) {
        appsSliderIndex = 0;
    }

    for (let i = 0; i < appsSlider.length; i++) {
        appsSlider[i].style.display = "none";
    }

    appsSlider[appsSliderIndex].style.display = "block";            
}

var appsSliderLeftArror = document.querySelector('#apps-slider .slider-arrow-left');
var appsSliderRightArror = document.querySelector('#apps-slider .slider-arrow-right');

appsSliderLeftArror.addEventListener('click', () => {
    appsSliderIndex -= 2;

    if (appsSliderIndex < -1) appsSliderIndex = appsSlider.length - 2;

    clearInterval(appSliderInterval);
    appSliderInterval = setInterval(changeAppsSlider, 5000);

    changeAppsSlider(appsSliderIndex);
});

appsSliderRightArror.addEventListener('click', () => {
    changeAppsSlider();

    clearInterval(appSliderInterval);
    appSliderInterval = setInterval(changeAppsSlider, 5000);
});


function hideMobileMenu()
{
    for(let mobileMenuNavItem of mobileMenuNavItems)
    {   
        if(mobileMenuNavItem.className.indexOf('open') != -1){
            mobileMenuNavItem.classList.remove('open');
        }
    }
}

function hideAndShowMobileMenu()
{
    for(let mobileMenuNavItem of mobileMenuNavItems)
    {   
        if(mobileMenuNavItem.className.indexOf('open') == -1){
            mobileMenuNavItem.classList.add('open');
        }else {
            mobileMenuNavItem.classList.remove('open');
        }
    }
}

menuButton.addEventListener('click', hideAndShowMobileMenu);


// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function openModal() {
    modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.querySelector('#contact-form').addEventListener('submit', sendEmail);        

function sendEmail(e) {
    e.preventDefault();

    if (!isAuth) {
        handleAuth();
        return;
    }

    const name = document.querySelector('#contact-form [name=name]').value;
    const email = document.querySelector('#contact-form [name=email]').value;
    const message = document.querySelector('#contact-form [name=message]').value;

    const sendBtn = document.querySelector('.contact-send-button');
    sendBtn.setAttribute('disabled', '');

    var emailContent = 
`From: ${email}
To: lta@lta-indie.com
Subject: ${name} contact
Date: Fri, 21 Nov 1997 09:55:06 -0600 
Message-ID: <1234@local.machine.example>

${message}.`

    var base64EncodedEmail = base64urlEncode(emailContent);

    var request = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': base64EncodedEmail
      }
    });

    request
        .then(() => {
            sendBtn.removeAttribute('disabled');
            openModal();
        })
        .catch((error) => {
            console.log(error);
            sendBtn.removeAttribute('disabled');
            openModal();
        });
}

var b64u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
var b64pad = '='

function base64EncodeData(data, len, b64x) {
    var dst = ""
    var i

    for (i = 0; i <= len - 3; i += 3)
    {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2)
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i+1) >>> 4))
        dst += b64x.charAt(((data.charCodeAt(i+1) & 15) << 2) | (data.charCodeAt(i+2) >>> 6))
        dst += b64x.charAt(data.charCodeAt(i+2) & 63)
    }

    if (len % 3 == 2)
    {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2)
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i+1) >>> 4))
        dst += b64x.charAt(((data.charCodeAt(i+1) & 15) << 2))
        dst += b64pad
    }
    else if (len % 3 == 1)
    {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2)
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4))
        dst += b64pad
        dst += b64pad
    }

    return dst
}

function base64urlEncode(str) {
    var utf8str = unescape(encodeURIComponent(str))
    return base64EncodeData(utf8str, utf8str.length, b64u)
}