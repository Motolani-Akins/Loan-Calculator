//Listen for submit
document.getElementById('loan-form').addEventListener('submit',  calculateResults);

//Calculate results function
function calculateResults(e) {
    //UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); //parseFloat would return the value as decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2); //toFixed takes in the parameter of amount of decimal places needed
        totalInterest.value  = ((monthly * calculatedPayments)- principal).toFixed(2);
    } else {
       showError('Please check your numbers');
    }

    e.preventDefault();
} 

//Show Error
function showError(error){
    //create a div
    const errorDiv = document.createElement('div');

    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add Class
    errorDiv.className = 'alert alert-danger';

    //Create Text Node and Append to Div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error Above Heading
    card.insertBefore(errorDiv, heading);

    //Clear Error after 3 seconds
    setTimeout(clearError, 3000);
}

//create clearError function
function clearError() {
    document.querySelector('.alert').remove();
}