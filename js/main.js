document.addEventListener('DOMContentLoaded', () => {
    const price = {
        kitchen: {conversion: 2, click: 60},
        corpus: {conversion: 3, click: 40},
        soft: {conversion: 2.5, click: 45},
        dining: {conversion: 3, click: 35},
        another: {conversion: 3, click: 35},
    }

    const productTypesCheckboxes = document.querySelectorAll('.product-types input')
    const selectConversionSells = document.getElementById('conversion_sells');
    const inputAmountPay = document.getElementById('amount_pay');
    const inputTargetSells = document.getElementById('target_sells');
    const outputBudgetSuggest = document.getElementById('advertisement');
    const outputBudgetPercent = document.getElementById('advertisement_to_revenue');
    const checkboxSellsAnother = document.getElementById('sells_another_checkbox');
    const inputSellsAnother = document.getElementById('sells_another_text');
    const sliderTargetSellsOutput = document.querySelector('.calc-furniture__target .output span');
    const errorContainer = document.querySelector('.errors');

    document.querySelector('button.btn_green').addEventListener('click', handlerControls)
    //* Тоглим чекбокс, при изменении поля ввода в первом вопросе
    inputSellsAnother.addEventListener('input', e => {
        e.target.value.trim().length > 0 ? checkboxSellsAnother.checked = true : checkboxSellsAnother.checked = false
    })

    rangesliderJs.create(inputTargetSells, {
        onSlide: (value) => handlerWidthRangeInput(value)
    });
    function handlerWidthRangeInput(value) {
        sliderTargetSellsOutput.textContent = (parseInt(value) / 1000000).toString();
    }


    function handlerControls(event) {
        try {
            errorContainer.textContent = '';
            calculateResult();
        } catch (err) {
            console.log(err);
            errorContainer.textContent = err;
        }
    }

    function calculateResult() {
        const inputsCollection = document.querySelectorAll('.product-types input[type="checkbox"]:checked');
        if (inputsCollection.length < 1) {
            throw Error('Выберите тип продукции')
        }
        const sells = parseInt(inputTargetSells.value) / parseInt(inputAmountPay.value);
        const conversionSells = parseInt(selectConversionSells.value) / 100;
        const lids = sells / conversionSells;
        const conversionToLids = Array.from(inputsCollection).reduce(
            (acc, cur) => {
                return cur.dataset.conversion > acc ? cur.dataset.conversion : acc
            }, 0) / 100;
        const clicks = Math.floor(lids / conversionToLids);
        const highestPrice = Math.max.apply(
            null,
            Array.from(document.querySelectorAll('.product-types input[type="checkbox"]'))
                .map(input => parseInt(input.dataset.click))
        );
        const clickPrice = Array.from(inputsCollection).reduce(
            (acc, cur) => {
                return cur.dataset.click < acc ? cur.dataset.click : acc
            }, highestPrice);
        const budget = clicks * clickPrice;
        const advertisementToRevenue = Math.round(budget / parseInt(inputTargetSells.value) * 10000) / 100;

        if (isNaN(budget) || isNaN(advertisementToRevenue)) {
            throw Error('Необходимо корректно заполнить поля')
        }

        showResult(budget, advertisementToRevenue)
    }

    function showResult(budget, percent) {
        outputBudgetSuggest.innerText = budget;
        outputBudgetPercent.innerText = percent;
    }

})
