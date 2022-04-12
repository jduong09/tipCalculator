document.addEventListener('DOMContentLoaded', () => {
  const billInput = document.getElementById('billAmount');
  const tipInputArr = document.getElementsByClassName('tipInput');
  const numPeople = document.getElementById('numPeople');
  const tipContainer = document.getElementById('tipContainer');
  const totalContainer = document.getElementById('totalContainer');

  for (let i = 0; i < tipInputArr.length; i++) {
    tipInputArr[i].addEventListener('click', (e) => {
      const input = tipInputArr[i];

      if (input.classList.contains('selected')) {
        return input.classList.remove('selected');
      }

      input.classList.add('selected');
    });
  };

  numPeople.addEventListener('input', (e) => {
    const resultElements = document.getElementsByClassName('calculatedNumber');
    if (resultElements.length !== 0) {
      while (resultElements.length !== 0) {
        resultElements[0].remove();
      }
    }

    if (e.target.checkValidity()) {
      const billValue = billInput.value;
      let tipValue;

      for (let i = 0; i < tipInputArr.length; i++) {
        const input = tipInputArr[i];
        if (input.classList.contains('selected')) {
          tipValue = input.value;
        }
      }

      console.log(billValue, tipValue, e.target.value);
      const tipAmount = ((billValue * 100) * (tipValue/100)/100).toFixed(2);
      const tipAmountPerPerson = (tipAmount / e.target.value).toFixed(2);
      console.log(tipAmountPerPerson);

      const total = Number(billValue) + Number(tipAmount);

      const totalPerPerson = (total / e.target.value).toFixed(2);

      console.log(totalPerPerson);
      
      const tipDiv = document.createElement('div');
      tipDiv.classList.add('calculatedNumber');
      tipDiv.innerHTML = `$${tipAmountPerPerson}`;

      const totalDiv = document.createElement('div');
      totalDiv.classList.add('calculatedNumber');
      totalDiv.innerHTML = `$${totalPerPerson}`;

      tipContainer.append(tipDiv);
      totalContainer.append(totalDiv);
    };
  });
});