document.addEventListener('DOMContentLoaded', function () {
    const amount = document.getElementById('amount')
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency')
    const convert = document.getElementById('convert')
    const result = document.getElementById('result')

    const apiKEY = "JYxu+A/wO8PVp3r8JeihOg==flzK67NaWoFbf2EF"
    const apiURL = "https://api.api-ninjas.com/v1/exchangerate?pair="
    const currencySymbols = {
        EUR: '€',
        JPY: '¥', 
        GBP: '£',
        AUD: '$',
        CAD: '$',
        CHF: '₣',
        CNY: '¥',
        SEK: 'kr',
        MXN: '$',
        NZD: '$',
        SGD: '$',
        HKD: '$',
        NOK: 'kr',
        KRW: '₩',
        TRY: '₺',
        INR: '₹',
        RUB: '₽',
        BRL: 'R$',
        ZAR: 'R',
        DKK: 'kr',
        PLN: 'zł',
        TWD: 'NT$',
        THB: '฿',
        MYR: 'RM',
        NGN: '₦',
    }

    convert.addEventListener('click', () => {
        const amountTotal = parseFloat(amount.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const url = apiURL + from + "_" + to;

        fetch(url, {
            headers: {
                'X-API-KEY': apiKEY
            }
        })
        .then(response => response.json())
        .then(data => {
            const rate = data.exchange_rate;
            const resultPrice = amountTotal * rate;
            const formattedAmountTotal = formatNumberWithCommas(amountTotal);
            const formattedResultPrice = formatNumberWithCommas(resultPrice);
            const fromSymbol = currencySymbols[from] || '';
            const toSymbol = currencySymbols[to] || '';
            result.innerHTML = `${fromSymbol}${formattedAmountTotal} ${from} = ${toSymbol}${formattedResultPrice} ${to}`
        })
        .catch(error => {
            console.error('Request failed:', error)
            result.innerHTML = 'An error occured, please try again.'
        })

    })
    function formatNumberWithCommas(number) {
        return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

})