//Check If There is Locale Storage Option
let mainColors = localStorage.getItem("main_color");

let secondaryColors = localStorage.getItem("secondry_color");

if(mainColors !== null){
    document.documentElement.style.setProperty("--main--color" ,mainColors)

        // Remove  Active Class form All The li (Colors item)
        document.querySelectorAll(".colors-list li").forEach(el =>{
            el.classList.remove("active");

            //Add Active Class With Data-Color === Locale Storage Color 
            if(mainColors === el.dataset.color){
                el.classList.add("active");
            }
        })
}

if(secondaryColors !== null){
    document.documentElement.style.setProperty("--secondary-color" ,secondaryColors)
}

//Variable To Control The Background Interval
let backgroundInterval;
//Random Background Option
let backgroundOption = true;

//Check If There is Locale Storage Random Item
let backgroundLocaleItem = localStorage.getItem("background_option");

//Check If Random Background Locale Storage Is Empty Or Not 
if(backgroundLocaleItem !== null){
    
    if(backgroundLocaleItem === "true"){
        backgroundOption =true;
    }else{
        backgroundOption=false;
    }

    //Remove Active Class From All Span
    document.querySelectorAll(".random-background span").forEach(el =>{
        el.classList.remove("active");
    })

    if(backgroundLocaleItem === "true"){
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        document.querySelector(".random-background .no").classList.add("active");
    }
    
}

//Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    //Toggle on spin class for rotation on it self
    this.classList.toggle("fa-spin");
    //Toggle Class Open on Main Settings Box

    let SettingsBox =  document.querySelector(".settings-box");
    SettingsBox.classList.toggle("open");
    if(SettingsBox.classList.contains("open")){
        SettingsBox.style.cssText = `left: 0px;`
    }else{
        SettingsBox.style.cssText = `left: -200px;`
    }
    
}


//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop on All List items
colorsLi.forEach(li => {
    
    //click on every list item
    li.addEventListener("click",(e)=>{

        //Set Color On Root
        document.documentElement.style.setProperty("--main--color" ,e.currentTarget.dataset.color)
        document.documentElement.style.setProperty("--secondary-color" ,e.currentTarget.dataset.secondrycolor)
        //Add The Color To The Locale Storage
        localStorage.setItem("main_color",e.currentTarget.dataset.color)
        localStorage.setItem("secondry_color",e.currentTarget.dataset.secondrycolor)

        //Remove  Active Class form All The li
        e.target.parentElement.querySelectorAll(".active").forEach(el =>{
            el.classList.remove("active");
        })
        
        //Add Active Class On Self
        e.target.classList.add("active");
    })
    
});

//Switch Random background Option
const randomBackEl = document.querySelectorAll(".random-background span");

//Loop on All spans
randomBackEl.forEach(span => {
    
    //click on every list Span
    span.addEventListener("click",(e)=>{

        //Remove  Active Class form All The li
        e.target.parentElement.querySelectorAll(".active").forEach(el =>{
            el.classList.remove("active");
        })
        
        //Add Active Class On Self
        e.target.classList.add("active");

        if( e.target.dataset.background === "yes"){
            backgroundOption =true;
            randomizeImgs();
            localStorage.setItem("background_option",true);
        }else{
            backgroundOption=false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false);
        }
        
    })
    
});



//Select Landing Page 
let landingPage = document.querySelector(".landing-page");

//Get Array of Images
let imgArray = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png"];



//Function To Randomize Images

function randomizeImgs(){
        
        if(backgroundOption === true){
            backgroundInterval = setInterval(()=>{
            let randomNumber = Math.floor(Math.random() *imgArray.length) ;
            
            landingPage.style.backgroundImage = `url('../images/${imgArray[randomNumber]}')`;
            
            
            },10000)
        }
        
}

//hello deep seek this part does not work help with it
// Skills Animation on Scroll
window.addEventListener('scroll', function() {
    let skillsSection = document.querySelector('.skills');
    let skillProgress = document.querySelectorAll('.skill-progress span');
    
    // Check if skills section is in viewport
    let skillsPosition = skillsSection.getBoundingClientRect().top; //get the postion form top to skills position
    let screenPosition = window.innerHeight / 1.3; //visible part of the browser  //1.3 means 75% from skills
    
    if(skillsPosition < screenPosition) {
        skillProgress.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
});

//Create Pop Up With The Image
let ourGallery = document.querySelectorAll(".gallery img");


ourGallery.forEach(img =>{
    img.addEventListener("click",(e) =>{
        //Create Overlay Element
        let overlay = document.createElement("div");
        
        //Add Class To Overlay
        overlay.className = "popup-overlay";

        //Append overlay to the body
        document.body.appendChild(overlay)

        //Create The Popup Box
        let popupBox = document.createElement("div");

        //Add class to The PopUp Box
        popupBox.className ="popup-box";

        if(img.alt !== null){

            //Create Heading
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);

            //append the text to the heading
            imgHeading.appendChild(imgText);
            
            //append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //Create The Image
        let popupImage = document.createElement("img");
        

        //Set Image Source
        popupImage.src = img.src;

        //Add the image to the popup box
        popupBox.appendChild(popupImage);
        
        //Add the popupBox to the body
        document.body.appendChild(popupBox);



        //Create the Close Span
        let closeButton = document.createElement("span");
        
        //Create close button text
        let closeButtonText = document.createTextNode("X");

        //Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        //Add Class name to close Button
        closeButton.className = "close-button";

        //Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    })
})

//Close Pop Up
document.addEventListener("click",function(e){
        
        if(e.target.className ==="close-button"){
            //Remove The current Popup
            e.target.parentElement.remove();
            //remove Overlay
            document.querySelector(".popup-overlay").remove()
        }
})


