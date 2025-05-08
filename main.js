function calculate401k() {
    let salary = parseFloat(document.getElementById('salary').value);
    const contribution = parseFloat(document.getElementById('contribution').value) / 100;
    const employerMatch = parseFloat(document.getElementById('employerMatch').value) / 100;
    const maxEmployerMatch = parseFloat(document.getElementById('maxEmployerMatch').value) / 100;
    
    const age = parseFloat(document.getElementById('age').value); 
    const currBalance = parseFloat(document.getElementById('currBal').value);
    const retirementAge = parseFloat(document.getElementById('retirementAge').value); 
    const salaryIncrease = parseFloat(document.getElementById('salaryIncrease').value) / 100;
    const annualReturn = parseFloat(document.getElementById('annualReturn').value) / 100;
    


    if (isNaN(salary) || isNaN(contribution) || isNaN(employerMatch) || isNaN(maxEmployerMatch) || isNaN(age) 
        || isNaN(retirementAge) || isNaN(salaryIncrease) || isNaN(currBalance) || isNaN(annualReturn)) {
        document.getElementById('result').innerText = 'Please fill out all fields with valid numbers.';
        return;
    }

    if(retirementAge - age < 0){
        document.getElementById('result').innerText = 'Retirement Age cannot be less than your current age';
        return;
    }

    if(salary < 0 || contribution < 0 || employerMatch < 0 || maxEmployerMatch < 0 || salaryIncrease < 0){
        document.getElementById('result').innerText = 'Value cannot be less than 0';
        return;
    }

    let total = currBalance;
    const years = retirementAge - age;

    let yearlyMoney = [];
    for (let i = 0; i < years; i++) {
        let currContribution = salary * contribution;

        let employerMatchMax = Math.min(contribution, maxEmployerMatch); // 3%
        let employeeContribution = employerMatchMax * salary * employerMatch;
        let yearlyContribution = currContribution + employeeContribution;

        total *= (1 + annualReturn);
        total += yearlyContribution;
        
        
        yearlyMoney[i] = total;

        salary *= (salaryIncrease + 1);
    }

    document.getElementById('result').innerText = `Estimated 401(k) balance after ${years} years: $${total.toFixed(2)}`;


    const ctx = document.getElementById('SmyChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}