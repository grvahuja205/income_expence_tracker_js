const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
// const addTransaction = document.getElementById("add-trans");

// let transactions = [];

// const dummyTransactions = [
//   { id: 1, text: "Income", amount: 300 },
//   { id: 2, text: "Rent", amount: -50 },
//   { id: 3, text: "Freelancing", amount: 200 },
//   { id: 4, text: "grocerries", amount: -30 }
// ];

let transactions =
  localStorage.getItem("transactions") !== null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

//Add transaction object to transactions array
function addTransaction(event) {
  event.preventDefault();

  if (text.value === "" || amount.value === "") {
    alert("Please add correct text and amount");
  } else {
    const transaction = {
      id: getRandomID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionsToDOM(transaction);
    updateTransactionalFields();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

function getRandomID() {
  return Math.floor(Math.random() * 10000000);
}

function addTransactionsToDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const transactionListElement = document.createElement("li");

  const classToBeAdded = transaction.amount < 0 ? "minus" : "plus";

  transactionListElement.classList.add(classToBeAdded);
  transactionListElement.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(transactionListElement);
}

//Update the balance, income and expnse fields
function updateTransactionalFields() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts
    .reduce((prevAmt, currAmt) => (prevAmt += currAmt), 0)
    .toFixed(2);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((prevAmt, currAmt) => (prevAmt += currAmt), 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(amount => amount < 0)
      .reduce((prevAmt, currAmt) => (prevAmt += currAmt), 0)
      .toFixed(2) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(trans => trans.id !== id);
  updateLocalStorage();
  init();
}

//Updates the transaction array to local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Event Listener
form.addEventListener("submit", addTransaction);

//Initialise the app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionsToDOM);
  updateTransactionalFields();
}

init();
