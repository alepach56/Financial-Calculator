function calculate401k() {
    const salary = parseFloat(document.getElementById('salary').value);
    const contribution = parseFloat(document.getElementById('contribution').value) / 100;
    const employerMatch = parseFloat(document.getElementById('employerMatch').value) / 100;
    const years = parseInt(document.getElementById('years').value);
    const growthRate = parseFloat(document.getElementById('growthRate').value) / 100;

    if (isNaN(salary) || isNaN(contribution) || isNaN(employerMatch) || isNaN(years) || isNaN(growthRate)) {
        document.getElementById('result').innerText = 'Please fill out all fields with valid numbers.';
        return;
    }

    let total = 0;
    for (let i = 0; i < years; i++) {
        total += salary * (contribution + employerMatch);
        total *= (1 + growthRate);
    }

    document.getElementById('result').innerText = `Estimated 401(k) balance after ${years} years: $${total.toFixed(2)}`;
}