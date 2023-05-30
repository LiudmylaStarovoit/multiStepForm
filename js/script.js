const myInputs = document.querySelectorAll('.personal-info_input'),
      goToStep2 = document.querySelector('#goToStep2'),
      itemSpan = document.querySelectorAll('.requir'),
      steps = document.querySelectorAll('.steps_btn'),
      personalInfo = document.querySelector('.personal-info'),
      selectPlan = document.querySelector('.select-plan'),
      uncorrect = document.querySelectorAll('.uncorrect'),
      addOns = document.querySelectorAll('.add-ons_item'),
      checkboxes = document.querySelectorAll('.checkboxplan'),
      cBackStep2 = document.querySelector('#comeBackStep2'),
      goToStep4 = document.querySelector('#goToStep4'),
      pickAddOns = document.querySelector('.add-ons'),
      addOnsPrice = document.querySelectorAll('.add-ons_price'),
      chosenAddOns = document.querySelectorAll('.add-ons_label'),
      cBackStep3 = document.querySelector('#comeBackStep3'),
      spanAddOns = document.querySelectorAll('.add-ons_span'),
      summary = document.querySelector('.summary'),
      summaryPlan = document.querySelector('.summary_plan-title'),
      summaryPlanPrice = document.querySelector('.summary_plan-price'),
      summaryAddOnseTitle = document.querySelectorAll('.summary_add-onse-title'),
      summaryAddOnsePrice = document.querySelectorAll('.summary_add-onse-price'),
      summuryItems = document.querySelector('.summary_items'),
      plans = document.querySelectorAll('.select-plan_item'),
      wrap = document.querySelector('.select-plan_items'),
      toggle = document.querySelector('.select-plan_switch'),
      cicle = document.querySelector('.select-plan_cicle'),
      price = document.querySelectorAll('.select-plan_price'),
      freeMonths = document.querySelectorAll('.select-plan_free'),
      cBackStep1 = document.querySelector('#comeBackStep1'),
      goToStep3 = document.querySelector('#goToStep3'),
      selectPlanTitle = document.querySelectorAll('.select-plan_title'),
      selectPlanPrice = document.querySelectorAll('.select-plan_price'),
      selectPlanPeriod = document.querySelectorAll('.select-plan_period'),
      summChange = document.querySelector('.summary_change'),
      summTotalPer = document.querySelector('.summary_total-period'),
      summTotalPrice = document.querySelector('.summary_total-price'),
      goToStepThanks = document.querySelector('#goToStepThanks'),
      thanks = document.querySelector('.thanks');


let nameInput = '';
let emailInput = '';
let phoneInput = '';
let selectedPlan = '';
let namePlan = '';
let pricePlan = '';
let periodPlan = '';
let nameAddOns = [];
let priceAddOns = [];
let sumPriceAddOns = 0;

// GO STEP 2
goToStep2.addEventListener('click', () => {
    let count = 0;
    myInputs.forEach((item, i)=> {
        if (item.validity.valid){
            item.style.outline = 'unset';
            itemSpan[i].classList.add('hide');
            count++;
        } else {
            item.style.outline = '1px solid var(--strawberry-red)';
            itemSpan[i].classList.remove('hide');
        }
        if (count === 3) {
            nameInput = myInputs[0].value;
            emailInput = myInputs[1].value;
            phoneInput = myInputs[2].value;
            personalInfo.classList.add('hidden');
            selectPlan.classList.remove('hidden');
            steps.forEach(item => {
                item.classList.remove('active-step');
            });
            steps[1].classList.add('active-step');  
        }
    }); 
});

// GO STEP 3
goToStep3.addEventListener('click', () => {
    steps.forEach(item => {
        item.classList.remove('active-step');
    });
    steps[2].classList.add('active-step');
    selectPlan.classList.add('hidden');
    pickAddOns.classList.remove('hidden');
    plans.forEach((item, i)=> {
        if (item.classList.contains('active-plan')) {
            namePlan = selectPlanTitle[i].innerHTML;
            pricePlan = selectPlanPrice[i].innerHTML;
        }
    });
    selectPlanPeriod.forEach(item => {
        if(item.classList.contains('active-period')) {
            periodPlan = item.innerHTML;
        }
    });
    addOnsPrice.forEach(item => {
        if (periodPlan === 'Yearly') {
            item.textContent = `+$${item.textContent.replace(/\D/gmi, '') * 10}/yr`;
        }
    });
});

// GO STEP 4
goToStep4.addEventListener('click', () => {
    steps.forEach(item => {
        item.classList.remove('active-step');
    });
    steps[3].classList.add('active-step');
    pickAddOns.classList.add('hidden');
    summary.classList.remove('hidden');
    summaryPlanPrice.textContent = `${pricePlan}`;
    summaryPlan.textContent = `${namePlan}(${periodPlan})`;
    addOns.forEach((item, i)=> {
        if (item.classList.contains('active-plan')) {
            nameAddOns.push(chosenAddOns[i].innerHTML);
            priceAddOns.push(addOnsPrice[i].innerHTML);
        } 
    });
    for(let i = 0; i < nameAddOns.length; i++){
        let newSummItem = document.createElement('div');
        newSummItem.classList.add('summary_item');
        newSummItem.innerHTML = `
        <div class="summary_add-onse-title">${nameAddOns[i]}</div>
        <div class="summary_add-onse-price">${priceAddOns[i]}</div>
        `;
        summuryItems.append(newSummItem);
    }

    if (periodPlan === 'Yearly') {
        summTotalPer.textContent = 'Total (per year)';
    } else {
        summTotalPer.textContent = 'Total (per month)';
    }
    
    priceAddOns.forEach(item => {
        sumPriceAddOns += +item.replace(/\D/gmi, '');
    });

    if (periodPlan === 'Yearly') {
        summTotalPrice.textContent = `+$${sumPriceAddOns + (+pricePlan.replace(/\D/gmi, ''))}/yr`;
    } else {
        summTotalPrice.textContent = `+$${sumPriceAddOns + (+pricePlan.replace(/\D/gmi, ''))}/mo`;
    }
});

// PAGE 2
plans.forEach(item => {
    item.addEventListener('click', () => {
        plans.forEach(item => {
            item.classList.remove('active-plan');
        });
        item.classList.add('active-plan');
    });
});

toggle.addEventListener('click', () => {
    cicle.classList.toggle('monthly');
    cicle.classList.toggle('yearly');
    selectPlanPeriod.forEach(item  => {
        item.classList.toggle('active-period');
    });
    
    price.forEach(item => {
        if (cicle.classList.contains('yearly')) {
            item.textContent = `$${item.textContent.replace(/\D/gmi, '')*10}/yr`;
            freeMonths.forEach(item => {
                item.classList.remove('hidden');
            });
            wrap.style.gridTemplate = '220px/repeat(3, 1fr)';
        } else {
            item.textContent = `$${item.textContent.replace(/\D/gmi, '')/10}/mo`;
            freeMonths.forEach(item => {
                item.classList.add('hidden');
            });
            wrap.style.gridTemplate = '200px/repeat(3, 1fr)';
        }
    }); 
});

// PAGE 3
addOns.forEach((item, i) => {
    item.addEventListener('click', () => {
        item.classList.toggle('active-plan');
        checkboxes[i].checked = !checkboxes[i].checked;
    });
    checkboxes[i].addEventListener('click', () => {
        checkboxes[i].checked = !checkboxes[i].checked;
    });  
});

//PAGE 4 
summChange.addEventListener('click', () => {
    let childElements = document.querySelectorAll('.summary_item');
    childElements.forEach(item => {
        item.remove();
    });
    nameAddOns = [];
    priceAddOns = [];
    steps.forEach(item => {
        item.classList.remove('active-step');
    });
    steps[1].classList.add('active-step');
    addOnsPrice.forEach(item => {    //reset
        if (periodPlan === 'Yearly') {
            item.textContent = `+$${item.textContent.replace(/\D/gmi, '') / 10}/mo`;
        }
    });
    selectPlan.classList.remove('hidden');
    summary.classList.add('hidden');
    sumPriceAddOns = 0;   //reset
});
goToStepThanks.addEventListener('click', () => {
    thanks.classList.remove('hidden');
    summary.classList.add('hidden');
}); 

// COME BACK 1
cBackStep1.addEventListener('click', () => {
    personalInfo.classList.remove('hidden');
    selectPlan.classList.add('hidden');
    steps.forEach(item => {
        item.classList.remove('active-step');
    });
    steps[0].classList.add('active-step');
});

// COME BACK 2
cBackStep2.addEventListener('click', () => {
    steps.forEach(item => {
        item.classList.remove('active-step');
    });
    steps[1].classList.add('active-step');
    selectPlan.classList.remove('hidden');
    pickAddOns.classList.add('hidden');   
    addOnsPrice.forEach(item => {   //reset
        if (periodPlan === 'Yearly') {
            item.textContent = `+$${item.textContent.replace(/\D/gmi, '') / 10}/mo`;
        }
    });
});

// COME BACK 3
cBackStep3.addEventListener('click', () => {
    nameAddOns = [];
    priceAddOns = [];
    steps.forEach(item => {
        item.classList.remove('active-step');
    });
    steps[2].classList.add('active-step');
    pickAddOns.classList.remove('hidden');
    summary.classList.add('hidden');
    let childElements = document.querySelectorAll('.summary_item');
    childElements.forEach(item => {
        item.remove();
    });
    sumPriceAddOns = 0; //reset
});