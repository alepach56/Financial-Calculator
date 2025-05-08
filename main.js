let chart;

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

    const ageLabels = Array.from({ length: years }, (_, i) => age + i);
    if (chart) {
        chart.data.labels = ageLabels;
        chart.data.datasets[0].data = yearlyMoney;
        chart.update();
    }
    
    else{
        const ctx = document.getElementById('myChart');

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ageLabels,
                datasets: [{
                    label: 'Portfolio Value ($)',
                    data: yearlyMoney,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Portfolio Value ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Age'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Portfolio Value Over Time'
                    }
                }
            }
        });
    }
    
}



function addClass() {
    const table = document.getElementById("classTable");
    const row = document.createElement("tr");

    const classCell = document.createElement("td");
    const classInput = document.createElement("input");
    classInput.type = "text";
    classInput.name = "class[]";
    classCell.appendChild(classInput);

    const unitsCell = document.createElement("td");
    const unitsInput = document.createElement("input");
    unitsInput.type = "text";
    unitsInput.name = "units[]";
    unitsCell.appendChild(unitsInput);

    const gradeCell = document.createElement("td");
    const gradesInput = document.createElement("input");
    gradesInput.type = "text";
    gradesInput.name = "GPA[]";
    gradeCell.appendChild(gradesInput);

    row.appendChild(classCell);
    row.appendChild(unitsCell);
    row.appendChild(gradeCell);

    table.appendChild(row);
}

function calculateGPA() {
    const units = document.getElementsByName("units[]");
    const grades = document.getElementsByName("GPA[]");

    let totalUnits = 0;
    let totalPoints = 0;

    for (let i = 0; i < units.length; i++) {
        const u = parseFloat(units[i].value);
        const g = parseFloat(grades[i].value);

        if (!isNaN(u) && !isNaN(g)) {
            totalUnits += u;
            totalPoints += g * u;
        }
    }

    const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "N/A";
    document.getElementById("gpaResult").textContent = "GPA: " + gpa;
}



function calculateGasCost(){
    const tripLength = parseFloat(document.getElementById('tripLength').value); 
    const mpg = parseFloat(document.getElementById('mpg').value);
    const gallons = parseFloat(document.getElementById('gallons').value);
    const avgGasPrice = parseFloat(document.getElementById('avgGasPrice').value); 
    const passengers = parseFloat(document.getElementById('passengers').value); 


    const gallonsNeeded = tripLength / mpg;
    const totalCost = gallonsNeeded * avgGasPrice;

    // Cost per person (if passengers is valid and more than 1)
    let costPerPerson = totalCost;
    if (!isNaN(passengers) && passengers > 1) {
        costPerPerson = totalCost / passengers;
    }

    // Display results
    const output = `
        Total Gallons Needed: ${gallonsNeeded.toFixed(2)} gal<br>
        Total Cost: $${totalCost.toFixed(2)}<br>
        ${passengers > 1 ? `Cost Per Person (${passengers}): $${costPerPerson.toFixed(2)}` : ''}
    `;
    document.getElementById('resultGas').innerHTML = output;
    
}