let investBtn = document.querySelector("#investBtn");
let tierName = document.querySelector('#tierName');
let tierBallance = document.getElementById("tierBallance");
let ammountInvested = document.getElementById("ammountInvested");
let profitAmmount = document.getElementById("profitAmmount");
let ammountWithdrawn = document.getElementById("ammountWithdrawn");
let profitRate = document.getElementById("profitRate");
let tPopulation = document.getElementById("tPopulation");
let tBallance = document.getElementById("tBallance");
let investor = document.getElementById("investor");
let ammount = document.getElementById("ammount");
let Silver = document.getElementById("Silver");
let proceed = document.querySelectorAll(".proceed")
let investmentSecion = document.getElementById("investmentSecion");
let investmentZone = document.getElementById("investmentZone");
let investmentForm = document.getElementById("investmentForm");
let addHere = document.getElementById("addHere");
let goBack = document.querySelectorAll(".goBack1");
let error = document.getElementById("error");

let gold = [];
let silver = [];
let bronze = [];
let goldBall = 0;
let silverBall = 0;
let bronzeBall = 0;
let investorList = '';

// function to detect the selected tier and also send the tier details to the display function
proceed.forEach((procee) => {
    procee.addEventListener("click", (e) => {
        if (e.target.id === "Gold") {
            displayData("Gold Tier", "30%", "#6000", "#30,000", "#36,000", goldBall, gold.length, gold)
        } else if (e.target.id === "Bronze") {
            displayData("Bronze Tier", "5%", "#500", "#10,000", "#10,500", bronzeBall, bronze.length, bronze)
        } else if (e.target.id === "Silver") {
            displayData("Silver Tier", "10%", "#2000", "#20,000", "#22,000", silverBall, silver.length, silver)
        }
        investmentSecion.classList.add('noDisplay');
        investmentZone.classList.remove('noDisplay');
    })
})

// function to update the displayed tier details (8 different details on investment page) based on the tier selected by the user
displayData = (tier, rate, profit, investment, withdraw, tierBall, tierPopulation, tierN) => {
    tierName.textContent = tier;
    ammountInvested.textContent = investment;
    profitAmmount.textContent = profit;
    profitRate.textContent = rate;
    ammountWithdrawn.textContent = withdraw;
    tBallance.textContent = `#${tierBall}`;
    tPopulation.textContent = tierPopulation;
    clearInvestors();
    displayInvestors(tierN);
    error.innerHTML = '';
}

//function to record a new investment it updates the tier Array and some other investment details setion
investBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (tierName.textContent === 'Gold Tier') {
        let result = confirm(ammount.value, 30000, investor.value)
        if (result) {
            updateArray(gold, 36000)
            goldBall = goldBall + 30000;
            tBallance.textContent = `#${goldBall}`;
            tPopulation.textContent = gold.length;
        }
    } else if (tierName.textContent === 'Silver Tier') {
        let result = confirm(ammount.value, 20000, investor.value)
        if (result) {
            updateArray(silver, 22000)
            silverBall = silverBall + 20000;
            tBallance.textContent = `#${silverBall}`;
            tPopulation.textContent = silver.length;
        }
    } else if (tierName.textContent === 'Bronze Tier') {
        let result = confirm(ammount.value, 10000, investor.value)
        if (result) {
            updateArray(bronze, 10500)
            bronzeBall = bronzeBall + 10000;
            tBallance.textContent = `#${bronzeBall}`;
            tPopulation.textContent = bronze.length;
        }
    }
})

// function to verify that the investment form input are correct and also display error message
confirm = (inpute, requiredAmmount, investor) => {
    if (Number(inpute) < requiredAmmount || Number(inpute) > requiredAmmount) {
        error.innerHTML = ` <p> Ammount must be equal to ${requiredAmmount}</p> `
        return (false);
    } else if (investor == "") {
        error.innerHTML = ` <p> Name cannot be Empty </p> `
        return (false);
    } else {
        error.innerHTML = '';
        return (true);
    }
}

// function to collect entries from the record creator and pass theminto the array 
updateArray = (tierN, ammount) => {
    let details = {
        id: tierN.length + 1,
        investorN: investor.value,
        ammount,
        tier: tierName.textContent
    }
    tierN.push(details);
    clearInvestors();
    displayInvestors(tierN);
    investmentForm.reset();
}

// function to design and compile the list of investors based on the tier array and append to the addHere div
displayInvestors = (tier) => {
    tier.forEach((gold) => {
        investorList += `<form class="taskEntries taskEntries2" id = "${gold.id}">
        <input class="noDesign investorName" placeholder="${gold.investorN}" id="investorName" readonly="readonly ">
        <input class="noDesign investedAmmount" placeholder="${gold.ammount}" id="investedAmmount " readonly="readonly ">
        <div class="actions" id="${gold.tier}">
            <button id="withdraw">Withdraw</button>
        </div>
    </form>`
    })
    addHere.innerHTML = investorList;
}

// function to clear displayed investors so it can be reloaded and displayed again
clearInvestors = () => {
    investorList = " ";
    addHere.innerHTML = investorList;
}

//function to handle user withdrawals 
addHere.addEventListener("click", function(e) {
    if (e.target.id === "withdraw") {
        e.preventDefault();
        let targetId = e.target.parentNode.parentNode.id;
        let mTarget = e.target.parentNode.id;
        if (mTarget == "Gold Tier") {
            withdraw(gold, goldBall, 30000, targetId);
            goldBall = goldBall - 30000;
            tBallance.textContent = `#${goldBall}`;
        } else if (mTarget == "Bronze Tier") {
            withdraw(bronze, bronzeBall, 10000, targetId);
            bronzeBall = bronzeBall - 10000;
            tBallance.textContent = `#${bronzeBall}`;
        } else if (mTarget == "Silver Tier") {
            withdraw(silver, silverBall, 20000, targetId);
            silverBall = silverBall - 20000;
            tBallance.textContent = `#${silverBall}`;
        }
    }
})

// function to splice off a particular investor from list of investors after withdrawal
withdraw = (tier, ball, ammount, targetId) => {
    let index;
    tier.forEach((goldN) => {
        if (goldN.id == targetId) {
            index = tier.indexOf(goldN);
        }
    })
    tier.splice(index, 1);
    tPopulation.textContent = tier.length;
    clearInvestors();
    displayInvestors(tier);
}

//function to collaps the investment form section and reveal the tier list
goBack.forEach((go) => {
    go.addEventListener("click", (e) => {
        investmentSecion.classList.remove('noDisplay');
        investmentZone.classList.add('noDisplay');
    })
});
