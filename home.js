const data = {
    titles : {
        1 : ["Personal info"  , "Please provide your name, email address, and phone number."],
        2 : ["Select your plan"  , "You have the option of monthly or yearly billing."],
        3 : ["Pick add-ons"  , "Add-ons help enhance your gaming experience."],
        4 : ["Finishing up"  , "Double-check everything looks OK before confirming."],
    },
    step1 : {
        labels : {
            lbesl1 : "Name",
            lbesl2 : "Email Address",
            lbesl3 : "Phone Number",
        },
        inputts : {
            "e.g. Stephen King" : ["text"  , "title" , "Name" , "erorr" , "userName"],
            "e.g. stephenking@lorem.com" : ["email"  , "title" , "Email Address" , "erorr" , "userEmail"],
            "e.g. +1 234 567 890" : ["text"  , "title" , "Phone Number" , "erorr" , "userNumber"],
        },
    },
    step2 : {
        cardsData : {
            "Arcade" : [9 , 90 ,"mo" , "yr", "./assets/images/icon-arcade.svg" , "$9/mo" , "$90/yr"],
            "Advanced" : [12 , 120 , "mo" , "yr" , "./assets/images/icon-advanced.svg" , "$12/mo" , "$120/yr"],
            "Pro" : [15 , 150 , "mo" ,"yr" , "./assets/images/icon-pro.svg" , "$15/mo" , "$150/yr"],
        },
    },
    step3 : {
        titles : {
            "Online service" : ["Access to multiplayer games" , 1 , 34745],
            "Larger storage" : ["Extra 1TB of cloud save" , 2 , 20947],
            "Customizable Profile" : ["Custom theme on your profile" , 2 , 57546],
        },
    },
    finally : {
        thank : ["Thank you!" , "Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com." , "./assets/images/icon-thank-you.svg"]
    }
}


let body = document.querySelector("body");

let userData = {
    userName : "",
    userEmail : "",
    userPhone : "",

    userPlaneName : "",
    userPlaneType : "",
    userPlanPrice : "",
    userOption  : [],
    userTotal : "",
}

let Subscription = "mo";


let NameBoolen = "";
let EmailBoolen = "";
let PhoneBoolen = "";
let nextStepNum = 1;


let elementCont = document.querySelector(".elements-stpe");
let buttons = document.querySelectorAll(".buttons button");
let buttonsnon = document.querySelector(".buttons");

let allNewCards = "";
let price = "";
let free = "";

let steps = document.querySelectorAll(".steps ul li");
let stepsTitleConth2 = document.querySelector(".step-Title h1")
let stepsTitleContp = document.querySelector(".step-Title p");


function showhiddenButton(nextStepNum) {
    nextStepNum > 1 ? buttons[0].style.display = "block" : buttons[0].style.display = "none";
}


// to add active class to next step on click on next button start 
buttons[1].onclick = function () {
    if (nextStepNum == 1 && NameBoolen == true 
        && EmailBoolen == true && PhoneBoolen == true) {
            nextStepNum != 5 ? nextStepNum++ : nextStepNum = 1;
        f();
    } else if ( nextStepNum == 2 && userData.userPlaneName != "" 
    && userData.userPlaneType != "" && userData.userPlanPrice != "") {
        nextStepNum != 5 ? nextStepNum++ : nextStepNum = 1;
        f()
    } else if (nextStepNum == 3 && userData.userOption != "") {
        nextStepNum != 5 ? nextStepNum++ : nextStepNum = 1;
        f()
    } else if (nextStepNum == 4) {
        nextStepNum != 5 ? nextStepNum++ : nextStepNum = 1;
        f()
    } 
    updateErorr();

    steps.forEach(function (ele) {
        ele.dataset.number == nextStepNum || ele.dataset.finaly == nextStepNum ? ele.classList.add("active") : ele.classList.remove("active");
        changeTitles()
        showhiddenButton(nextStepNum);
    });
}
// to add active class to next step on click on next button end 

// to go one step to back start 
buttons[0].onclick = function () {
    nextStepNum--;
    steps.forEach(function (ele) {
        ele.dataset.number == nextStepNum ? ele.classList.add("active") : ele.classList.remove("active");
        changeTitles();
        f();
        showhiddenButton(nextStepNum);
    });
    userData.userTotal = userData.userPlanPrice;
}
// to go one step to back end  

// to change steps titles on click start 
function changeTitles() {
    for(let info in data.titles) {
        steps.forEach(function (ele) {
            if (ele.dataset.number == info && ele.className.includes("active")) {
                stepsTitleConth2.innerHTML = data.titles[info][0];
                stepsTitleContp.innerHTML = data.titles[info][1];
            }
        })
    }
}
// to change steps titles on click end

window.onload = function () {
    InputsLabels();
}


function f() {
    if (nextStepNum == 1) {
        InputsLabels();
    } else if (nextStepNum == 2 ) {
        Cards();
        cardsClickE();
    } else if (nextStepNum == 3 ) {
        creatoption();
    } else if (nextStepNum == 4 ) {
        finish();
    } else if (nextStepNum == 5) {
        thank();
    }
}

// to update Erorr text Node if input value is not valid start 
function updateErorr() {
    let erorrs = document.querySelectorAll(".elements-stpe .erorr");
    if (NameBoolen == false) {
        erorrs[0].innerHTML = "This field is required"
    }
    if (EmailBoolen == false) {
        erorrs[1].innerHTML = "This field is required"
    }
    if (PhoneBoolen == false) {
        erorrs[2].innerHTML = "This field is required"
    }
}
// to update Erorr text Node if input value is not valid end

// ################# ################# stpe one elements creat start 
// creat inputs && labels start 
function InputsLabels() {
    elementCont.innerHTML = "";
    for(let info in data.step1.inputts) {
        let input = document.createElement("input");
        let label1 = document.createElement("label");
        let label2 = document.createElement("label");

        input.setAttribute("type" , data.step1.inputts[info][0]);
        input.setAttribute("placeholder" , data.step1.inputts[info][2]);
        input.classList.add(data.step1.inputts[info][4])

        label1.classList = (data.step1.inputts[info][2]);
        label1.innerHTML = label1.className;

        label2.classList = (data.step1.inputts[info][3]);

        elementCont.append(label1 , label2 , input);
    }
    check()
}
// creat inputs && labels end

// check user inputs data start 
    function check() {
        let inName = document.querySelector(".elements-stpe .userName");
        let inEmail = document.querySelector(".elements-stpe .userEmail");
        let inNumber = document.querySelector(".elements-stpe .userNumber");

        let NameRe = /\w+/;
        inName.addEventListener("input" , (e) => {
            let value = e.target.value;
            NameBoolen = NameRe.test(value);
            userData.userName = value;
        })

        let EmailRe = /(\w+|\d+)@gmail.(com|org|net)/;
        // let EmailBoolen = EmailRe.test(inEmail.value);
        inEmail.addEventListener("input" , (e) => {
            let value = e.target.value;
            EmailBoolen = EmailRe.test(value);
            userData.userEmail = value;
        })

        let NumberRe = /\+\s\d\s\d{3}\s\d{3}\s\d{3}/;
        // let PhoneBoolen = NumberRe.test(inNumber.value);
        inNumber.addEventListener("input" , (e) => {
            let value = e.target.value;
            PhoneBoolen = NumberRe.test(value);
            userData.userPhone = value;
        });
    }
// check user inputs data end
// ################# ################# stpe one elements craet end

// ################# ################# step tow elements creat start 
// creat cards and all card elements start
function Cards() {
    // for fixed the plan price start 
    userData.userTotal = userData.userPlanPrice;
    // for fixed the plan price end
    elementCont.innerHTML = "";
    for(let info in data.step2.cardsData) {
        // creat card elemnts start 
        let card = document.createElement("div");
        let infocont = document.createElement("div");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        // creat card elemnts end

        // set Attributes to card start 
        card.classList.add("card");
        infocont.classList.add("info");

        card.setAttribute("data-type" , "mo");
        card.setAttribute("data-plane-Name" , info);
        card.setAttribute("data-pricemo" ,data.step2.cardsData[info][0] );
        card.setAttribute("data-priceyr" ,data.step2.cardsData[info][1] );
        // set Attributes to card end

        // set Attribute to img start 
        img.setAttribute("src" , data.step2.cardsData[info][4]);
        // set Attribute to img end

        // change card title start 
        h3.innerHTML = info;
        // change card title end 

        // cahnge title && add classList to p start
        p.classList.add("price");
        p.innerHTML = `$${card.dataset.pricemo}/${card.dataset.type}`;
        // cahnge title && add classList to p end

        // add to all elements to card start 
        infocont.append(h3 , p);
        card.append(img , infocont);
        // add to all elements to card end

        // add  all cards to elementCont start
        elementCont.append(card);
        // add  all cards to elementCont end

    }
    MONTHYEARL()
};
// creat cards and all card elements end 

// craet cards types Arm && MONTH or YEARL start 
function MONTHYEARL() {
    // creat arm cont start 
    let MONTHorYEARLCONt = document.createElement("div");
    let armCont = document.createElement("div");
    let arm = document.createElement("div");
    let month = document.createElement("p");
    let yearl = document.createElement("p");
    // creat arm cont end

    MONTHorYEARLCONt.classList.add("mod-cont");

    // armCont start 
    armCont.classList.add("mod-arm-cont");
    // armCont end

    // arm start 
    arm.classList.add("mod-arm");

    // arm end 

    // p start 
    month.classList.add("monthly");
    month.classList.add("active");
    month.innerHTML = "Monthly"

    yearl.classList.add("Yerly");
    yearl.innerHTML = "Yearly";
    // p end

    armCont.append(arm);
    MONTHorYEARLCONt.append(month , armCont , yearl);

    elementCont.append(MONTHorYEARLCONt);
    armmm(arm , month , yearl );
}
// craet cards types Arm && MONTH or YEARL end

// arm event click start 
function armmm(arm , month , yearl ) {
    arm.onclick = function () {
        arm.classList.toggle("style")
        arm.className.includes("style") ? this.style.marginLeft = "47%" : this.style.marginLeft = "0%";
        month.classList.toggle("active");
        yearl.classList.toggle("active");
        toggleActive(month , yearl);
        yearPlane();
    }
}
// arm event click end

// add active class to card on click && add card data to userData start 
function cardsClickE() {
    let cards = document.querySelectorAll(".elements-stpe .card");

    // to remov activecard class from all cards start 
    function remov() {
        cards.forEach(ele => {
            ele.classList.remove("activecard");
        })
    }
    // to remov activecard class from all cards end 

    // adds active class to card on click start  
    cards.forEach(function (ele) {
        ele.onclick = function () {
            remov();
            ele.classList.add("activecard");
            yearPlane();
        }
    })
    // adds active class to card on click end 

    // to see which card was selected start 
    cards.forEach(ele => {
        if (ele.dataset.planeName == userData.userPlaneName) {
            ele.classList.add("activecard");
        }
    })
    // to see which card was selected end
}

// to update user plane information start 
function yearPlane() {
    let cards = document.querySelectorAll(".elements-stpe .card");
    cards.forEach(ele => {
        if (ele.className.includes("activecard")) {
            if (ele.dataset.type == "mo") {
                userData.userPlaneName = ele.dataset.planeName;
                userData.userPlaneType = ele.dataset.type;
                userData.userPlanPrice = JSON.parse(ele.dataset.pricemo);
                userData.userTotal = userData.userPlanPrice;
            } else {
                userData.userPlaneName = ele.dataset.planeName;
                userData.userPlaneType = ele.dataset.type;
                userData.userPlanPrice = JSON.parse(ele.dataset.priceyr);
                userData.userTotal = userData.userPlanPrice;
            }
        } 
    })
}
// to update user plane information end

// add active class to card on click && add card data to userData end


// to add && remove active class from options start 
function toggleActive( month , yearl ) {
    price = document.querySelectorAll(".elements-stpe .card .price");
    allNewCards = document.querySelectorAll(".elements-stpe .card");
    allInfoCards = document.querySelectorAll(".elements-stpe .card .info");
    free = document.querySelectorAll(".elements-stpe .card .year");

    if (yearl.className.includes("active")) {
        allInfoCards.forEach(card => {
            let cardsFree = document.createElement("p");
            cardsFree.classList.add("year")
            cardsFree.innerHTML = "2 monthes free";

            card.append(cardsFree);
        });
        allNewCards.forEach(ele => {
            body.clientWidth > "375" ? ele.style.height = "200px" : ele.style.height = "100px";
            ele.dataset.type = "yr"
        })
        price[0].innerHTML = `$${allNewCards[0].dataset.priceyr}/${allNewCards[0].dataset.type}`;
        price[1].innerHTML = `$${allNewCards[1].dataset.priceyr}/${allNewCards[1].dataset.type}`;
        price[2].innerHTML = `$${allNewCards[2].dataset.priceyr}/${allNewCards[2].dataset.type}`;
    } else if(month.className.includes("active")) {
        allNewCards.forEach(card => {
            body.clientWidth > "375" ? card.style.height = "161px" : card.style.height = "80px";

            card.dataset.type = "mo";
        })
        price[0].innerHTML = `$${allNewCards[0].dataset.pricemo}/${allNewCards[0].dataset.type}`;
        price[1].innerHTML = `$${allNewCards[1].dataset.pricemo}/${allNewCards[1].dataset.type}`;
        price[2].innerHTML = `$${allNewCards[2].dataset.pricemo}/${allNewCards[2].dataset.type}`;
        free.forEach(ele => {
            ele.style.display = "none";
        })
    }
}
// to add && remove active class from options end 

// ################# ################# step tow elements creat end 

// ################# ################# step three elements creat start 
// craet and add step3 elemnts to elementCont start 
function creatoption() {
    elementCont.innerHTML = "";
    // create optios start 
    for(let info in data.step3.titles) {
        let option = document.createElement("div");
        let checkbox = document.createElement("div");
        let div2 = document.createElement("div");

        let input  = document.createElement("input");
        let h2  = document.createElement("h2");
        let p1  = document.createElement("p");
        let p2  = document.createElement("p");
        // create optios end 

        // options setAttribute and classes start 
        option.classList.add("option")
        option.setAttribute("data-title" , info);
        option.setAttribute("data-description" , data.step3.titles[info][0]);
        option.setAttribute("data-price" , data.step3.titles[info][1]);
        option.setAttribute("data-id" , data.step3.titles[info][2]);

        checkbox.classList.add("checkbox");
        div2.classList.add("info");

        input.setAttribute("type" , "checkbox");
        input.setAttribute("data-id" , data.step3.titles[info][2]);
        p2.classList.add("price");

        h2.innerHTML = info;
        p1.innerHTML = data.step3.titles[info][0];
        p2.innerHTML = `+$${data.step3.titles[info][1]}/mo`
        // options setAttribute and classes end

        // In order to add elements inside each other start  
        checkbox.append(input);
        div2.append(h2 , p1);
        option.append(checkbox , div2 , p2);
        elementCont.append(option);
        // In order to add elements inside each other end 
    }
    optionClick();
}
// craet and add step3 elemnts to elementCont end 

// add options to userOption in userData object on click a option start   
function optionClick() {
    let options = document.querySelectorAll(".elements-stpe .option");
    let ch = document.querySelectorAll(".elements-stpe .option input");
    options.forEach(function (ele) {
        ele.onclick = function () {
            ele.classList.toggle("active")
            if (!userData.userOption.includes(JSON.parse(ele.dataset.id))) {
                userData.userOption.push(JSON.parse(ele.dataset.id));
                // to add checkbox attributes start 
                ch.forEach(el => {
                    if (JSON.parse(el.dataset.id) == JSON.parse(ele.dataset.id)) {
                        el.setAttribute("checked" , true)
                    }
                })
                // to add checkbox attributes end 

            } else {
                let filt = userData.userOption.filter(iid => {
                    return iid != JSON.parse(ele.dataset.id);
                });
                // to remove checkbox Attribute from options inputs start 
                userData.userOption = filt;
                ch.forEach(el => {
                    if (!userData.userOption.includes(JSON.parse(el.dataset.id))) {
                        el.removeAttribute("checked")
                    }
                })
                // to remove checkbox Attribute from options inputs end
            }
        }
        userData.userOption.includes(JSON.parse(ele.dataset.id)) ? ele.classList.add("active") : ele.classList.remove("active");

        ch.forEach(el => {
            if (userData.userOption.includes(JSON.parse(el.dataset.id))) {
                    el.setAttribute("checked" , true)
                } else {
                el.removeAttribute("checked")
            }
        })
    });
}
// add options to userOption in userData object on click a option end 

// ################# ################# step three elements creat end  

// ################# ################# step for elements creat start

function finish() {
    elementCont.innerHTML = "";

    // create step4 elements start 
    let container1 = document.createElement("div");
    let first = document.createElement("div");
    let box1 = document.createElement("div");
    let title1 = document.createElement("h2");
    let change = document.createElement("p");
    let changeu = document.createElement("u");
    let price = document.createElement("p");

    let container2 = document.createElement("div");
    let title4 = document.createElement("h2");
    let tottalPrice = document.createElement("p");
    // create step4 elements end 

    // to setAttribute and classes for ctreated elements start 
    price.classList.add("price");
    container1.classList.add("cont-1");
    first.classList.add("first");
    box1.classList.add("box-1");
    change.classList.add("change");
    // to setAttribute and classes for ctreated elements end

    change.append(changeu);

    container2.classList.add("cont-2");
    title4.classList.add("title");
    userData.userPlaneType == "mo" ? title4.innerHTML = "Total (Pre month)" : title4.innerHTML = "Total (Pre year)";

    userData.userPlaneType == "mo" ? title1.innerHTML = `${userData.userPlaneName} (Monthly)` : title1.innerHTML = `${userData.userPlaneName} (Yearly)`;
    changeu.innerHTML = "Change"

    price.innerHTML = `$${JSON.parse(userData.userPlanPrice)}/${userData.userPlaneType}`;

    box1.append(title1 , change);
    first.append(box1 , price);
    container1.append(first)
    elementCont.append(container1);

    userData.userPlaneType == "mo" ? title4.innerHTML = `Total (per month)` : title4.innerHTML = `Total (per year)`;

    userData.userOption.forEach(ele => {
        for (let info in data.step3.titles) {
            if (ele == data.step3.titles[info][2]) {

                let line = document.createElement("div");
                let title = document.createElement("p");
                let price = document.createElement("p");

                line.classList.add("line");
                title.classList.add("title");
                price.classList.add("pric-e");

                title.innerHTML = [info];

                userData.userTotal += JSON.parse(data.step3.titles[info][1]) ;

                userData.userPlaneType == "mo" ? 
                tottalPrice.innerHTML = `+$${tottalPrice.innerHTML = userData.userTotal}/mo` :
                tottalPrice.innerHTML = `$${tottalPrice.innerHTML = userData.userTotal}/yr`;
                price.innerHTML = `+$${data.step3.titles[info][1]}/${userData.userPlaneType}`;
                line.append(title , price);

                container1.append(line);
                container2.append(title4 , tottalPrice);
                elementCont.append(container2);
            } 
        }
    })

    // In order to change the step to step number 2 start 
    change.onclick = function () {
        nextStepNum = 2;
        f();
    }
    // In order to change the step to step number 2 end 


}

// ################# ################# step for elements creat end  

// ################# ################# thank you step start   

function thank() {
    elementCont.innerHTML = "";
    stepsTitleConth2.style.display = "none";
    stepsTitleContp.style.display = "none";
    buttonsnon.style.display = "none"
    // create elements start 
    let cont = document.createElement("div");
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    // create elements end

    // to add classes && Attribute for elements start 
    cont.classList.add("thank-you");
    img.setAttribute("src" , data.finally.thank[2]);
    // to add classes && Attribute for elements end

    // to change elements Text Node start 
    h2.innerHTML = data.finally.thank[0];
    p.innerHTML = data.finally.thank[1];
    // to change elements Text Node end
    cont.append(img , h2 , p);
    elementCont.append(cont);
}
// ################# ################# thank you step end   