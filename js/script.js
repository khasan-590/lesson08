"use strict";

function isNumbers(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function isString(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

let  money,

	start = function() {
		do{
			money = prompt('Ваш месячный доход?' , 5000);
		}
		while(!isNumbers(money)  || money === " "  || money === null);
	};

	start();

	let probels = '';

	let appData = {
		income: {},
		addIncome: [],
		expenses: {},
		deposit: false,
		precentDeposit: 0,
		moneyDeposit: 0,
		mission: 50000,
		period: 5,
		budgetDay: 0,
		budgetMonth: 0,
		expensesMonth: 0,
		budget: money,
		
		asking: function() {

			let cashIncome;

			if(confirm ('есть ли у вас дополнительный источник дохода?')){

				let itemIncome = prompt('Какой у вас заработок?' , "Таксую");
				do{
					itemIncome = prompt('Введите обязательную статью расходов?');
				} while (isString(itemIncome));//пока пользователь не введёт число

				do{
				 cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
					} while (!isNumbers(cashIncome));//пока пользователь не введёт число
				appData.income[itemIncome] = cashIncome;
			}

			
			
			let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
			appData.addExpenses = addExpenses.toLowerCase().split(', ');
			appData.addExpenses  =   appData.addExpenses.map( function (word) {
				word = word.charAt(0).toUpperCase() + word.substring(1);
				return word;
			});

			console.log(appData.addExpenses);


			appData.deposit = confirm("Есть ли у вас депозит в банке?"); //любое булево значение,

			let sum;//сумма
			
			for(let i = 0; i < 2; i++){
				let tempExpenses;
				
				do{
					tempExpenses = prompt('Введите обязательную статью расходов?');
				} while (isString(tempExpenses));//пока пользователь не введёт число

					do{
						sum = prompt('Во сколько это обойдётся?');
					} while (!isNumbers(sum));//пока пользователь не введёт число
					appData.expenses[tempExpenses] = +sum;
			}
			
		},
		getExpensesMonth: function (){
			for ( let key in appData.expenses) {
				appData.expensesMonth += appData.expenses[key];
			}
		},
		getBudget: function () {
			appData.budgetMonth = appData.budget - appData.expensesMonth;
			appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		},

		getTargetMonth: function (){
			let targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
			if (targetMonth > 0) {
				return "Цель будет достигнута через " + targetMonth + " месяцев";
		} else {
				return 'Цель не будет достигнута';
		}
		},
	
		 getStatusIncome: function () {
			if (appData.budgetDay >= 1200) {
				return("У вас высокий уровень дохода");
			} else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
				return('У вас средний уровень дохода');
			} else if (appData.budgetDay <=600 && appData.budgetDay  > 0) {
				return('К сожалению у вас уровень дохода ниже среднего');
			} else if (appData.budgetDay < 0) {
				return('Что то пошло не так');
			}
		},
		
		getInfoDeposit: function () {
			if(appData.deposit){
				do{
					appData.precentDeposit = +prompt('Какой годовой процент?' , "10");
					 } while (!isNumbers(appData.precentDeposit));//пока пользователь не введёт число
					 do{
						appData.moneyDeposit = +prompt('Какая сумма заложена?' , 10000);
						 } while (!isNumbers(appData.moneyDeposit));//пока пользователь не введёт число
			}
		},
		calcSaveMoney: function () {
			return  appData.budgetMonth * appData.period;
		}

	};

	
	appData.asking();
	appData.getExpensesMonth();
	appData.getBudget();
	appData.getInfoDeposit();
	appData.calcSaveMoney();
	console.log(appData.getTargetMonth());
	console.log( 'Расходы за месяц ' + appData.expensesMonth);
	console.log(appData.getStatusIncome());
	console.log(appData.addExpenses);
	
	for (let keys in appData) {
		console.log("Наша программа    включает в себя данные." + keys + " = " + appData[keys] + []);
	}
	





