function calculateTip() {
    const billAmountInput = document.getElementById("billAmount");
    const tipPercentageInput = document.getElementById("tipPercentage");
    const customTipInput = document.getElementById("customTip");
    const tipAmountInput = document.getElementById("tipAmount");
    const totalBillInput = document.getElementById("totalBill");

    // Input validation
    if (isNaN(billAmountInput.value) || billAmountInput.value === "") {
        tipAmountInput.value = "";
        totalBillInput.value = "";
        return;
    }

    const billAmount = parseFloat(billAmountInput.value);
    const tipPercentage = parseFloat(tipPercentageInput.value);

    // Calculate tip and total bill
    const tipAmount = (billAmount * (tipPercentage / 100)).toFixed(2);
    const totalBill = (billAmount + parseFloat(tipAmount)).toFixed(2);

    // Update disabled text inputs
    tipAmountInput.value = tipAmount;
    totalBillInput.value = totalBill;
}

function setTipPercentage(value) {
    document.getElementById("tipPercentage").value = value;
    calculateTip();
}

function resetForm() {
    // Reset all form fields
    document.getElementById("billAmount").value = "";
    document.getElementById("tipPercentage").value = 15; // You can set it to the default value
    document.getElementById("customTip").value = "";
    document.getElementById("tipAmount").value = "";
    document.getElementById("totalBill").value = "";
}
