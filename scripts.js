function calculateTip(event) {
  event.preventDefault();
  let bill = parseFloat(document.getElementById('bill').value);
  let serviceQual = parseFloat(document.getElementById('serviceQual').value);
  let customers = document.querySelectorAll('.customer');

  let totalTip = 0;
  let totalBill = 0;

  customers.forEach(customer => {
    let customerName = customer.querySelector('input[name="customerName"]').value;
    let products = customer.querySelectorAll('input[name="products"]');
    let prices = customer.querySelectorAll('input[name="prices"]');
    let productsTotal = 0;

    for (let i = 0; i < products.length; i++) {
      let productValue = parseFloat(prices[i].value);
      if (!isNaN(productValue)) {
        productsTotal += productValue;
      }
    }

    let customerTip = (productsTotal * serviceQual) + (productsTotal * serviceQual * 0.1);
    totalTip += customerTip;
    totalBill += productsTotal + customerTip;

    let customerTipFormatted = customerTip.toFixed(2);
    let customerBillFormatted = (productsTotal + customerTip).toFixed(2);

    let result = `Cliente: ${customerName}<br>Valor da conta (incluindo gorjeta): R$ ${customerBillFormatted}<br>Gorjeta: R$ ${customerTipFormatted}<br><br>`;

    document.getElementById('tip').innerHTML += result;
  });

  let totalTipFormatted = totalTip.toFixed(2);
  let totalBillFormatted = totalBill.toFixed(2);

  let totalResult = `Total da conta (incluindo gorjeta): R$ ${totalBillFormatted}<br>Total da gorjeta: R$ ${totalTipFormatted}<br>`;

  document.getElementById('tip').innerHTML += totalResult;
  document.getElementById('totalTip').style.display = "block";
}

function addCustomer() {
  let customers = document.getElementById('customers');
  let newCustomer = document.createElement('div');
  newCustomer.classList.add('customer');

  let customerHTML = `
    <label for="customerName">
      <p>Nome do cliente:</p>
    </label>
    <input type="text" placeholder="Nome" name="customerName" class="formInput" required>
    <label for="products">
      <p>Produtos consumidos:</p>
    </label>
    <div class="products">
      <input type="text" placeholder="Produto" name="products" class="formInput">
      <input type="number" step="0.01" placeholder="Preço" name="prices" class="formInput">
    </div>
  `;

  newCustomer.innerHTML = customerHTML;
  customers.appendChild(newCustomer);
}

document.getElementById('totalTip').style.display = "none";
document.getElementById('tipsForm').addEventListener('submit', calculateTip);
