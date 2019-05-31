'use strict';

function Person(name, date, amount) {
  this.name = name;
  this.birthday = date;
  this.amount = amount;
  this.dateOfBirth = date.split('.').reverse();
  const [Year, Month, Day] = this.dateOfBirth;
  this.age = getAge(new Date(Year, Month, Day));
  this.accountHistory = [];
  this.accountHistory.push({
    name: 'Initial',
    amountOfMoney: amount
  });

  function getAge(dateString){
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
      age--;
    }
    return age;
  }
}

Person.prototype.getInfo = function() {
  return `Name: ${this.name}, Age: ${this.age}, Amount: ${this.amount}$`;
}

Person.prototype.addMoney = function(amountOfMoney, source) {
  this.accountHistory.push({
    name: source,
    amountOfMoney: amountOfMoney
  });
  this.amount += amountOfMoney;
}
Person.prototype.withdrawMoney = function(amountOfMoney, aim) {
  this.accountHistory.push({
    name: aim,
    amountOfMoney: -amountOfMoney
  });
  this.amount -= amountOfMoney;
}

Person.prototype.getAccountHistory = function() {
  const arrForInput = [];
  for (let item of this.accountHistory) {
    arrForInput.push(`${item.name}: ${item.amountOfMoney}$`);
  }
  return this.accountHistory;
}

const dmytro = new Person('Dmytro', '26.11.1994', 1000);
const pavel = new Person('Pavel', '06.06.1990', 400);

dmytro.getInfo(); // print `Name: Dmytro, Age: 24, Amount: 1000$`
dmytro.addMoney(2000, 'salary');
dmytro.withdrawMoney(500, 'new phone');
dmytro.getInfo(); // Name: Dmytro, Age: 24, Amount: 2500$
dmytro.withdrawMoney(500, 'apartment rent');
dmytro.getAccountHistory(); // [ 'Initial: 1000', 'salary: 2000', 'new phone: -500', 'apartment rent: -500']

pavel.getInfo();  // Name: Pavel, Age: 28, Amount: 400$
