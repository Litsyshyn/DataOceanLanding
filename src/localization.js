import $ from 'jquery';

export const allowedLanguages = ['uk', 'en'];

let langs = {
    messageSuccess: {
        uk: 'Дякуємо за звернення! Постараємося відповісти якнайшвидше.',
        en: 'Thank you for contacting us! We will get back to you soon.',
    },
    messageError: {
        uk: 'Помилка. Дані не відправлені',
        en: 'Error. Data isn\'t sent',
    },
    messageErrorUnknown: {
        uk: 'Невідома помилка: ',
        en: 'Unknown error: ',
    },
    minSymbols: {
        uk: 'Замала кількість символів',
        en: 'Too few symbols',
    },
    maxSymbols: {
        uk: 'Завелика кількість символів',
        en: 'Too many symbols',
    },
    usernameRequired: {
        uk: 'Будь ласка, введіть Ваше ім\'я',
        en: 'Enter your First Name, please',
    },
    surnameRequired: {
        uk: 'Будь ласка, введіть Ваше прізвище',
        en: 'Enter your Last Name, please',
    },
    emailRequired: {
        uk: 'Будь ласка, введіть адресу',
        en: 'Enter your email, please',
    },
    emailCorrect: {
        uk: 'Будь ласка, введіть коректно адресу',
        en: 'Enter your correct email, please',
    },
    phoneNumber: {
        uk: 'Будь ласка, введіть коректний номер телефону',
        en: 'Enter your correct number, please',
    },
    questionAsk: {
        uk: 'Будь ласка, поставте своє запитання',
        en: 'Ask us your question, please',
    },
    placeholderName: {
        uk: 'Петро',
        en: 'John',
    },
    placeholderLastName: {
        uk: 'Іваненко',
        en: 'Galt',
    },
    placeholderQuestion: {
        uk: 'Привіт, Data Ocean! Я хотів запитати...',
        en: 'Hello, Data Ocean! I would like to ask about...'
    },
    placeholderPayNote: {
        uk: 'Ваші пропозиції щодо умов співпраці',
        en: 'Your suggestions on the terms of cooperation',
    },
    note: {
        uk: 'Примітка',
        en: 'Note'
    },
    nomark: {
        uk: 'Примітка відстуня',
        en: 'No mark'
    }
};

export const t = (key) => {
    let currentLang = localStorage.getItem('lang');
    return langs[key][currentLang];
};

$(document).ready(() => {
    const langFromLocalStorage = localStorage.getItem('lang');
    const langFromUrl = new URLSearchParams(location.search).get('lang');

    if (allowedLanguages.includes(langFromUrl)) {
        changeLang(langFromUrl);
    } else if (allowedLanguages.includes(langFromLocalStorage)) {
        changeLang(langFromLocalStorage);
    } else {
        changeLang('uk');
    }
});

let handleChangeLang = (langCode) => {};

export const onChangeLang = (handler) => {
    handleChangeLang = handler;
}

export function changeLang (languageCode) {
    if (allowedLanguages.includes(languageCode)) {
        window.localStorage.setItem('lang', languageCode);
        handleChangeLang(languageCode);

        $("[lang]").each(function () {
            if ($(this).attr("lang") === languageCode) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    } else {
        changeLang('uk');
        throw new Error("LangCode " + languageCode + " not supported");
    }
}

export function refreshLang() {
    changeLang(localStorage.getItem('lang'));
}

export const generateHtml = (uk, en) => {
    return `<span lang="uk">${uk}</span><span lang="en">${en}</span>`
}

