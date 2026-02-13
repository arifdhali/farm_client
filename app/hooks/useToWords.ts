import { ToWords } from 'to-words';


export const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
        currency: true,
        ignoreDecimal: false,
    },
});


