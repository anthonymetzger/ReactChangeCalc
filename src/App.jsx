import './App.css';
import { useState } from 'react';

function App() {
  let [amountDue, setAmountDue] = useState('');
  let [amountReceived, setAmountReceived] = useState('');
  let [changeDue, setChangeDue] = useState('');
  let [showChange, setShowChange] = useState('');
  let [twenties, setTwenties] = useState('');
  let [tens, setTens] = useState('');
  let [fives, setFives] = useState('');
  let [ones, setOnes] = useState('');
  let [quarters, setQuarters] = useState('');
  let [dimes, setDimes] = useState('');
  let [nickels, setNickels] = useState('');
  let [pennies, setPennies] = useState('');

  let[twentiesLabel, setTwentiesLabel] = useState('');
  let[tensLabel, setTensLabel] = useState('');
  let[fivesLabel, setFivesLabel] = useState('');
  let[onesLabel, setOnesLabel] = useState('');
  let[quartersLabel, setQuartersLabel] = useState('');
  let[dimesLabel, setDimesLabel] = useState('');
  let[nickelsLabel, setNickelsLabel] = useState('');
  let[penniesLabel, setPenniesLabel] = useState('');

  let [currencyLabel, setCurrencyLabel] = useState('');

  let sound;

  //declaring an object to hold the denominations of currency
  let cashierGiveBack = new Object();
  /*cashierGiveBack.hundred = 100.00;                                                                       DELETE COMMENT INDICATOR FROM THIS LINE
  cashierGiveBack.fifty = 50.00; */
  cashierGiveBack.twenty = 20.00;
  cashierGiveBack.ten = 10.00;
  cashierGiveBack.five = 5.00;                                                                            
  cashierGiveBack.one = 1.00;
  cashierGiveBack.quarters = 0.25;
  cashierGiveBack.dime = 0.10;
  cashierGiveBack.nickel = 0.05;
  cashierGiveBack.penny = 0.01;
  //declaring an array to hold the count of each denomination to be given back as change
  let cashArray = [/*0, 0,*/ 0, 0, 0, 0, 0, 0, 0, 0];  

  function didCustomerPayEnough(customer, price) {
    console.log("Calculating if customer paid enough...");
    let c = customer;
    let p = price;
    let due = 0;
    
    switchCurrency(0);

    if (c < p) {
      due = p - c;
      setShowChange(`Additional money owed is ${currencyLabel}${due.toFixed(2)}`);
      return true;
    }

    else if (c <= 0 || p <= 0) {
      changeDue = "invalid input";
      return false;
    }
      
    else if (c >= p) {
      due = c - p;
      setShowChange(`The total change due is ${currencyLabel}${due.toFixed(2)}`);
      playSound();
      return true;
    }
    else {
      console.log("Error in didCustomerPayEnough() function."); 
      return false;
    }
    
}

function switchCurrency(curr){
  //0 = usd, 1 = euro

  if(curr == 0){
    setCurrencyLabel('$');
    setTwentiesLabel('Twenties:');
    setTensLabel('Tens:');
    setFivesLabel('Fives:');
    setOnesLabel('Ones:');
    setQuartersLabel('Quarters:');
    setDimesLabel('Dimes:');
    setNickelsLabel('Nickels:');
    setPenniesLabel('Pennies:');
  }
  else if(curr == 1){
    setCurrencyLabel('€')
    setTwentiesLabel('Twenties:');
    setTensLabel('Tens:');
    setFivesLabel('Fives:');
    setOnesLabel('Ones:');
    setQuartersLabel('Quarters:');
    setDimesLabel('Dimes:');
    setNickelsLabel('Nickels:');
    setPenniesLabel('Pennies:');
  }
  return 0;
  }

function switchCurrencyLabel(curr){
  //0 = $, 1 = €
  if(curr == 0){
    return(setCurrencyLabel('$'));
  }
  else if(curr == 1){
    return(setCurrencyLabel('€'));
  }
}


function resetState() {
  setTwenties(0);
  setTens(0);
  setFives(0);
  setOnes(0);
  setQuarters(0);
  setDimes(0);
  setNickels(0);
  setPennies(0);
  return false;
}

  function calculate(amountDue, amountReceived){
    let currency = 0;
    switchCurrency(0);


    //similar to the previous function, assigning parameters to local variables
    //and parsing them to floats for calculation purposes. I had problems with
    //JavaScript being 0.01 off in some calculations due to floating point precision.
    var c = parseFloat(amountReceived);
    var p = parseFloat(amountDue);
    //calculating change due by subtracting price from customer payment
    let due = parseFloat(c - p);
    
    console.log("Customer paid: " + c);
    console.log("Price of item: " + p);
    console.log("Change due: " + due);
    //parsing float due to problem stated above
    parseFloat(due);
    //updating HTML to show change due
    amountDue = ("$" + due.toFixed(2) + " due");
    //checking if customer paid enough, if not, return 0 to end function
    if (didCustomerPayEnough(c, p) == false) {
      return 0;
    }
      //else if customer did pay enough, proceed to calculate change
    else if(didCustomerPayEnough(c, p) == true) {
      console.log("Calculating change...");
      //This is where I got creative with the for...in loop to iterate through the
      //cashierGiveBack object. I also created a variable 'i' to keep track of
      //which index of the cashArray to increment for each denomination.
      let i = 0;
      for (let bill in cashierGiveBack) {
        if (due >= cashierGiveBack[bill]) {
          while (due >= cashierGiveBack[bill]) {
            due -= cashierGiveBack[bill];
            cashArray[i] += 1;
            console.log(cashArray);
            due = due.toFixed(2);
            

          }
          i++;
        }
        else {
          i++;
        }
      }
    }
    //calling displayChange() function to update HTML with change breakdown
    displayChange();
    //resetting cashArray for next transaction

    
    resetArray(cashArray);
    return showChange;
  }

  function setSound(num){
    
    if(num == 1){
      sound = new Audio('/assets/cha-ching.mp3');
    }
    else if(num == 2){
      sound = new Audio('/assets/mario-coin.mp3');
    }
    else if(num == 3){
      sound = new Audio('/assets/Unk.wav');
    }
    else if(num == 4){
      sound = new Audio('/assets/Scream.m4a');
    }
    
    
    return 0;
  }

  function playSound(){
    sound.play();
    return 0;
  }

  function displayChange() {
    console.log(showChange);
    //logging cashArray to console for testing and debugging purposes
    for (let i in cashArray) {
      console.log(cashArray[i]);
    }
    setTwenties(cashArray[0]);
    setTens(cashArray[1]);
    setFives(cashArray[2]);
    setOnes(cashArray[3]);
    setQuarters(cashArray[4]);
    setDimes(cashArray[5]);
    setNickels(cashArray[6]);
    setPennies(cashArray[7]);




  //logging cashierGiveBack key and value pairs to console for testing and debugging purposes
  for (let key in cashierGiveBack) {
    console.log(key + ": " + cashierGiveBack[key]);
  }
  return 0;
}
function resetArray(arr) {
  for (let i in arr) { 
    arr[i] = 0;
  } 
}


  return (
    <>
    <div class="main">
    <h1>Change Calculator App</h1>
    <div class="sub-main">
      <div class="input-side">
      <h2>Amount Requested:</h2>
      <input class="amount-due" placeholder="Amount Due" id="amountDue" data-testid="amountDue" onChange={(ad) => setAmountDue(ad.target.value)} value={amountDue}></input>
      <h2>Amount Received</h2>
      <input class="amount-received" placeholder="Amount Received" id="amountReceived" data-testid="amountReceived" onChange={(ar) => setAmountReceived(ar.target.value)} value={amountReceived}></input>
      <button id="calculate" data-testid="calculate" onClick={(c) => setChangeDue(calculate(amountDue, amountReceived))}>Calculate Change</button>
      <div class="sound-board">
        <h2>Sound Selector and Sound Board</h2>
        <div class="sound-board-buttons-container">
        <div class="sound-board-buttons">
        <h3 onClick={() => setSound(1)}>Cha-Ching</h3>
        <h3 onClick={() => setSound(2)}>Mario-Coin</h3>
        <h3 onClick={() => setSound(3)}>Dubstep</h3>
        <h3 onClick={() => setSound(4)}>Man Yelling</h3>
        </div>
        </div>
      </div>
      </div>
      
      <div class="organize">
        
        
        <div class="organize-denom">
           
        <div class = "denominations output-side h3-output">
          <div>
          <h2 id="twenties-label">{twentiesLabel}</h2>
          <h3  id="twenties" data-testid="twenties">{twenties}</h3>
          </div>
          <div>
          <h2 id="tens-label">{tensLabel}</h2>
          <h3  id="tens" data-testid="tens">{tens}</h3>
          </div>
          <div>
            <h2 id="fives-label">{fivesLabel}</h2>
            <h3  id="fives" data-testid="fives">{fives}</h3>
          </div>
          <div>
            <h2 id="ones-label">{onesLabel}</h2> 
            <h3  id="ones" data-testid="ones">{ones}</h3>
          </div>
          <div>
            <h2 id="quarters-label">{quartersLabel}</h2>
            <h3  id="quarters" data-testid="quarters">{quarters}</h3>
          </div>  
          <div>
            <h2 id="dimes-label">{dimesLabel}</h2>
            <h3  id="nickels" data-testid="dimes">{dimes}</h3>
          </div>
          <div>
          <h2 id="nickels-label">{nickelsLabel}</h2>
          <h3  id="dimes" data-testid="nickels">{nickels}</h3>
          </div>
          <div>
          <h2 id="pennies-label">{penniesLabel}</h2>
          <h3  id="pennies" data-testid="pennies">{pennies}</h3>

          </div>
          
          </div>
          
          </div>
        

        </div>
        
      </div>
        <div class="currency-selector-container">
        
        <div class="currency-selector-buttons">
        
        <h3 onClick={() => switchCurrency(0)}>$USD</h3>
        <h3 onClick={() => switchCurrency(1)}>€EUR</h3>
        <h2 class="change" id="changeDue" data-testid="changeDue">{showChange}</h2>
        
        </div>
        
        </div>
      </div>
      
    </>
  )
}

export default App
