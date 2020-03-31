/**********************************************************************************************
# MIT License
#
# Copyright (c) 2011 Praveen Lobo (praveenlobo.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
**********************************************************************************************/


function Counter(initDate, id){
    this.counterDate = new Date(initDate);
    this.countainer = document.getElementById(id);
    this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
    this.hours = 0, this.minutes = 0, this.seconds = 0;
    this.updateNumOfDays();
    this.updateCounter();
}

Counter.prototype.updateNumOfDays=function(){
    var dateNow = new Date();
    var currYear = dateNow.getFullYear();
    if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
        this.numOfDays[1] = 29;
    }
    var self = this;
    setTimeout(function(){self.updateNumOfDays();}, (new Date((currYear+1), 1, 2) - dateNow));
}

Counter.prototype.datePartDiff=function(then, now, MAX){
    var diff = now - then - this.borrowed;
    this.borrowed = 0;
    if ( diff > -1 ) return diff;
    this.borrowed = 1;
    return (MAX + diff);
}

Counter.prototype.calculate=function(){
    var futureDate = this.counterDate > new Date()? this.counterDate : new Date();
    var pastDate = this.counterDate == futureDate? new Date() : this.counterDate;
    this.seconds = this.datePartDiff(pastDate.getSeconds(), futureDate.getSeconds(), 60);
    this.minutes = this.datePartDiff(pastDate.getMinutes(), futureDate.getMinutes(), 60);
    this.hours = this.datePartDiff(pastDate.getHours(), futureDate.getHours(), 24);
    this.days = this.datePartDiff(pastDate.getDate(), futureDate.getDate(), this.numOfDays[futureDate.getMonth()]);
    this.months = this.datePartDiff(pastDate.getMonth(), futureDate.getMonth(), 12);
    this.years = this.datePartDiff(pastDate.getFullYear(), futureDate.getFullYear(), 0);
}

Counter.prototype.addLeadingZero=function(value){
    return value < 10 ? ("0" + value) : value;
}

Counter.prototype.formatTime=function(){
    this.seconds = this.addLeadingZero(this.seconds);
    this.minutes = this.addLeadingZero(this.minutes);
    this.hours = this.addLeadingZero(this.hours);
}

Counter.prototype.updateCounter=function(){
    this.calculate();
    this.formatTime();
    this.countainer.innerHTML ="<strong>" + this.years + " " + (this.years == 1? "year" : "years") + "</strong>, " +
        " <strong>" + this.months + " " + (this.months == 1? "month" : "months") + "</strong>, " +
        " <strong>" + this.days + " " + (this.days == 1? "day" : "days") + "</strong>, " +
        " <strong>" + this.hours + " " + (this.hours == 1? "hour" : "hours") + "</strong>, " +
        " <strong>" + this.minutes + " " + (this.minutes == 1? "minute" : "minutes") + "</strong> and" +
        " <strong>" + this.seconds + " " + (this.seconds == 1? "seconds" : "seconds");
    var self = this;
    setTimeout(function(){self.updateCounter();}, 1000);
}


//Start/landing page transition
function startFunction() {
    document.getElementById("landingPage").style.display = "none";
    document.getElementById("question1").style.display = "inline-block";
    document.getElementById("introHeader").style.display = "none";
};

// First question transition
function nextFunction() {

    if (document.getElementById("questionDate").value === "") {
        document.getElementById("dateError").style.display = "inline-block"
    } else if (document.getElementById("dateError").style.display = "inline-block") {
    document.getElementById("question1").style.display = "none"
    document.getElementById("question2").style.display = "inline-block"
    document.getElementById("questionTime").focus();
    document.getElementById("dateError").style.display = "none";
    document.getElementById("timeMessage").style.display = "inline-block";
    }
};

// Create and display timer function using user date/time inputs
    function generateFunction() {
    const dateValue = document.getElementById("questionDate").value; //retrieve value of questionDate
    const timeValue = document.getElementById("questionTime").value; //retrieve value of questionTime
            
    new Counter(dateValue + ' ' + timeValue, 'counter2'); //generate a timer based on user inputs
    
    document.getElementById("question2").style.display = "none"
    document.getElementById("question3").style.display = "inline-block"
    document.getElementById("questionOccasion").focus();
    document.getElementById("timeMessage").style.display = "none";
    };

// Save occasionQuestion input value after the save button is pressed and generate final timer page
    function finalizeFunction() {

        if (document.getElementById("questionOccasion").value === "") {
            document.getElementById("occasionError").style.display = "inline-block"
        } else if (document.getElementById("occasionError").style.display = "inline-block") {
            document.getElementById("occasionError").style.display = "none";
            const occasionValue = document.getElementById("questionOccasion").value; //retreive value of questionOccasion
            const addPeriod = "."; // constant for string value of a period (".")
            document.getElementById("occasionText").innerText = occasionValue.concat(addPeriod); //use questionOccasion input to update the text following timer data
            
            document.getElementById("dotdotdot").remove(); //hide the "..." following "since", after the finish button is pressed

            document.getElementById("finalizeButton").remove(); //deletes the finish button from DOM
            document.getElementById("questionOccasion").style.display = "none"; //deletes questionOccasion input from DOM
            document.getElementById("heartIcon").remove();

            document.getElementById("saveButton").style.display = "inline-block";
            }
        };
            

//enter clicks next button on each question
    //first question
    const questionDate = document.getElementById("questionDate");
    questionDate.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("nextButton").click();
        }
    });

    //second questionclear
    const questionTime = document.getElementById("questionTime");
    questionTime.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("generateButton").click();
        }
    });

    //third question
    const questionOccasion = document.getElementById("questionOccasion");
    questionOccasion.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("finalizeButton").click();
        }
    });

    //Save custom timer page to randomly generated page
    function saveFunction(){
        const dateData = document.getElementById("questionDate").value;
        const timeData = document.getElementById("questionTime").value;
        const occasionData = document.getElementById("occasionText").innerText;
        
        location.href = "http://oohahoo.com/?date=" + dateData + "&time=" + timeData + "&occasion=" + occasionData;
    };

    //parse URL for date, time, and occasion parameters, and load the timer if there are values present for all
    
    window.onload = parseURL();

    function parseURL() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const dateData = document.getElementById("questionDate").value;
        const timeData = document.getElementById("questionTime").value;
        const occasionData = document.getElementById("occasionText").innerText;

        const date = urlParams.get(dateData);
            console.log(date);

        const time = urlParams.get(timeData);
            console.log(time);

        const occasion = urlParams.get(occasionData);
            console.log(occasion);

        if (dateData != "") {
            let dateValue = dateData;
            let timeValue = timeData;
            let occasionValue = occasionData;

            new Counter(dateValue + ' ' + timeValue, 'counter2'); //generate a timer based on user inputs
            
            const addPeriod = "."; // constant for string value of a period (".")
            document.getElementById("occasionText").innerText = occasionValue.concat(addPeriod);

            document.getElementById("question1").style.display = "none";
            document.getElementById("question2").style.display = "none";
            document.getElementById("question3").style.display = "inline-block";
        };

    };