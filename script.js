const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function caculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/bc6da98648b331ca03b198f0/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const rate = data.conversion_rates[currency_two];
        
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value*rate).toFixed(2);
    })

}

// Event listeners
currencyEl_one.addEventListener('change', caculate);
amountEl_one.addEventListener('input', caculate);
currencyEl_two.addEventListener('change', caculate);
amountEl_two.addEventListener('input', caculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    caculate();
})

caculate();

// http://api.coinlayer.com/api/live?access_key=1d5cfa298d814c2ea9f25b4984d79eb3