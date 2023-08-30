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
    const checkboxSellsAnother = document.getElementById('sells_another_checkbox');
    const inputSellsAnother = document.getElementById('sells_another_text');

    document.querySelector('button.btn_green').addEventListener('click', handlerControls)
    inputSellsAnother.addEventListener('input', e => {
        e.target.value.trim().length > 0 ? checkboxSellsAnother.checked = true : checkboxSellsAnother.checked = false
    })

    function handlerControls(event) {
        calculateResult();
    }

    function calculateResult() {
        const inputsCollection = document.querySelectorAll('.product-types input[type="checkbox"]:checked');
        const sells = parseInt(inputTargetSells.value) - parseInt(inputAmountPay.value);
        const conversionSells = selectConversionSells.value;
        const lids = sells / conversionSells;
        // const conversionToLids = () => {
        //     function collectionReducer(accumulator, currentV) {
        //         // if (currentV.type === 'text') {
        //         //     if (currentV.value.trim().length > 0 && currentV.dataset.conversion > accumulator) {
        //         //         return currentV.dataset.conversion
        //         //     }
        //         //     return accumulator
        //         // }
        //         if (currentV.dataset.conversion > accumulator) {
        //             return currentV.dataset.conversion
        //         }
        //         return accumulator
        //     }
        //
        //     console.log(inputsCollection)
        //
        //     return Array.from(inputsCollection).reduce(collectionReducer, 0)
        // }
        const conversionToLids = Array.from(inputsCollection).reduce(
            (acc, cur) => {
                return cur.dataset.conversion > acc ? cur.dataset.conversion : acc
            }, 0)

        const clicks = Math.floor(lids / conversionToLids);
        const clickPrice = () => {
            const highestPrice = Math.max.apply(
                null,
                Array.from(document.querySelectorAll('.product-types input'))
                    .map(input => parseInt(input.dataset.click))
            );
                // .sort((a, b) => b.dataset.conversion - a.dataset.conversion)[0]
                // .dataset.conversion
                // .reduce(function (a, b) {
                //     console.log(a, b)
                //     return (a.dataset.conversion > b.dataset.conversion)
                //         ? a.dataset.conversion
                //         : b.dataset.conversion;
                // })
            function collectionReducer(accumulator, currentV) {
                if (currentV.type === 'text') {
                    if (currentV.value.trim().length > 0 && currentV.dataset.click < accumulator) {
                        return currentV.dataset.click
                    }
                    return accumulator
                }
                if (currentV.dataset.click < accumulator) {
                    return currentV.dataset.click
                }
                return accumulator
            }

            return Array.from(inputsCollection).reduce(collectionReducer, highestPrice)
        }
        const budget = clicks * clickPrice();
        const advertisementToRevenue = budget / parseInt(inputTargetSells.value);

        // console.log(conversion)

        // console.log(budget, advertisementToRevenue)
    }


})
