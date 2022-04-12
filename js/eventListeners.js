const removePreviousTotals = () => {
  const resultElements = document.getElementsByClassName('calculatedNumber');
  if (resultElements.length !== 0) {
    for (let i = 0; i < resultElements.length; i++) {
      resultElements[i].innerHTML = '$0.00';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const billInput = document.getElementById('billAmount');
  const tipInputArr = document.getElementsByClassName('tipInput');
  const customInput = document.getElementById('customTip');
  const numPeople = document.getElementById('numPeople');
  const numPeopleError = document.getElementById('numPeopleError');
  const tipContainer = document.getElementById('tipContainer');
  const tipDiv = document.getElementById('tipDiv');
  const totalContainer = document.getElementById('totalContainer');
  const totalDiv = document.getElementById('totalDiv');
  const resetBtn = document.getElementById('resetBtn');

  const formSubmit = () => {
    let tipValue;
  
    for (let i = 0; i < tipInputArr.length; i++) {
      const input = tipInputArr[i];
      if (input.classList.contains('selected')) {
        tipValue = input.id === 'customTip' ? Number(input.value) : Number(input.value.substring(0, input.value.length - 1));

      }
    }

    if (billInput.value === '' || !tipValue || numPeople.value === '' || numPeople.value === '0') {
      removePreviousTotals()
      return;
    }

    removePreviousTotals();

    const billValue = billInput.value;

    const tipAmount = ((billValue * 100) * (tipValue/100)/100).toFixed(2);
    const tipAmountPerPerson = (tipAmount / numPeople.value).toFixed(2);

    const total = Number(billValue) + Number(tipAmount);

    const totalPerPerson = (total / numPeople.value).toFixed(2);
    
    
    tipDiv.innerHTML = `$${tipAmountPerPerson}`;

    totalDiv.innerHTML = `$${totalPerPerson}`;

    tipContainer.append(tipDiv);
    totalContainer.append(totalDiv);
  }

  billInput.addEventListener('input', () => {
    formSubmit();
  })
  
  for (let i = 0; i < tipInputArr.length; i++) {
    tipInputArr[i].addEventListener('click', () => {
      const input = tipInputArr[i];

      if (input.classList.contains('selected')) {
        removePreviousTotals();
        return input.classList.remove('selected');
      }

      input.classList.add('selected');

      for (let s = 0; s < tipInputArr.length; s++) {
        if (tipInputArr[s].value !== tipInputArr[i].value) {
          tipInputArr[s].classList.remove('selected');
        }
      }
      formSubmit();
    });
  };

  customInput.addEventListener('input', (e) => {
    if (e.target.checkValidity()) {
      customInput.classList.add('selected');
      formSubmit();
    }
  })

  // numPeople Listener
  numPeople.addEventListener('input', (e) => {
    if (Number(e.target.value) !== 0) {
      numPeople.classList.remove('inputError');
      numPeopleError.classList.remove('error');
      numPeopleError.classList.add('hide');
    } else {
      numPeople.classList.add('inputError');
      numPeopleError.classList.add('error');
      numPeopleError.classList.remove('hide');
      removePreviousTotals();
      return;
    }

    formSubmit();
  });

  resetBtn.addEventListener('click', () => {
    billInput.value = '';

    for (let i = 0; i < tipInputArr.length; i++) {
      const input = tipInputArr[i];
      if (input.classList.contains('selected')) {
        input.classList.remove('selected');
      }
    }

    numPeople.value = '';

    removePreviousTotals();
  });
});