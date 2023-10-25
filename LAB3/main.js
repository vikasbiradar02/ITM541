function calculateTip() {
    const billAmountInput = document.getElementById("billAmount");
    const tipPercentageInput = document.getElementById("tipPercentage");
    const customTipInput = document.getElementById("customTip");
    const resultDiv = document.getElementById("result");

    // Input validation
    if (isNaN(billAmountInput.value) || billAmountInput.value === "") {
        resultDiv.innerHTML = "Please enter a valid bill amount.";
        return;
    }

    const billAmount = parseFloat(billAmountInput.value);
    const tipPercentage = parseFloat(tipPercentageInput.value);

    // Calculate tip and total bill
    const tipAmount = (billAmount * (tipPercentage / 100)).toFixed(2);
    const totalBill = (billAmount + parseFloat(tipAmount)).toFixed(2);

    // Update disabled text inputs
    customTipInput.value = tipPercentage;
    resultDiv.innerHTML = `Tip Amount: $${tipAmount}<br>Total Bill with Tip: $${totalBill}`;
}

function setTipPercentage(value) {
    document.getElementById("tipPercentage").value = value;
    calculateTip();
}
