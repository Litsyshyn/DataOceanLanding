// import * as THREE from 'three';
// import DOTS from 'vanta/dist/vanta.dots.min';
import './scss/main.scss';
import $ from 'jquery';
import 'jquery-validation';
// import 'jquery-modal';

$(document).ready(() => {
    setInterval(() => {
        setTimeout(() => {
            $('#explore').addClass('transparency')
            setTimeout(() => {
                $('#explore').removeClass('transparency')
            }, 1500)
        }, 1000);

        setTimeout(() => {
            $('#build').addClass('transparency')
            setTimeout(() => {
                $('#build').removeClass('transparency')
            }, 1500)
        }, 2500);

        setTimeout(() => {
            $('#develop').addClass('transparency')
            setTimeout(() => {
                $('#develop').removeClass('transparency')
            }, 1500)
        }, 4000);
    }, 5500);
});


$(document).ready(() => {
  // const _sendMailBtn = document.querySelector(".sendmail-btn");
  // _sendMailBtn.onclick = (e) => {
  //   e.preventDefault();
  //   const _form = document.forms.sendmail;
  //   console.log("Do sendmail");
  //   return false;
  // };
});


$(document).ready(() => {
  // const _subscribeForms = document.querySelectorAll(".do-subscribe");
  // _subscribeForms.forEach((form) => {
  //   const _subscribeBtn = form.querySelector(".subscribe-btn");
  //   _subscribeBtn.onclick = (e) => {
  //     e.preventDefault();
  //     console.log("Do Subscribe");
  //   };
  // });
});

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

const t = (key) => {
    let currentLang = localStorage.getItem('lang');
    return langs[key][currentLang];
};

const getSchema = () => {
    return {
        errorClass: "input_error",
        rules: {
            username: {
                required: true,
                minlength: 2,
            },
            surname: {
                required: true,
                minlength: 2,
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                number: true,
                minlength: 10,
                maxlength: 15
            },
            question: {
                required: true,
            },
        },
        messages: {
            username: {
                required: t('usernameRequired'),
                minlength: t('minSymbols'),
            },
            surname: {
                required: t('surnameRequired'),
                minlength: t('minSymbols'),
            },
            email: {
                required: t('emailRequired'),
                email: t('emailCorrect'),
            },
            phone: {
                number: t('phoneNumber'),
                minlength: t('minSymbols'),
                maxlength: t('maxSymbols'),
            },
            question: {
                required: t('questionAsk'),
            }
        }
    }
};

$('#contact-form').submit(function(event){
    event.preventDefault();
    let form = $(this);
    form.validate(getSchema())
    if (!form.valid()) {
        return
    }

    let phoneNumber = '';
    if (this.phone.value) {
        phoneNumber = ' Мій контактний номер: '  + this.phone.value;
    }

    let data = {
        name: this.username.value + ' ' + this.surname.value,
        email: this.email.value,
        subject: this.username.value + ' ' + this.surname.value,
        message: this.question.value + phoneNumber,
    }

    $.ajax({
        url: process.env.DO_BACKEND_HOST + '/api/landing_mail/',
        type: "POST",
        dataType: "json",
        data: data,
        success: function(data, status, xhr) {
            if (xhr.status !== 200) {
                return
            }
            alert(t('messageSuccess'));
            form[0].reset();
        },
        error: function (jqXhr, textStatus, errorMessage) {
            if (jqXhr.status === 400 || jqXhr.status === 503) {
                alert(t('messageError'));
            }
            else {
                alert(t('messageErrorUnknown') + errorMessage);
            }
        }
    })
});

const allowedLanguages = ['uk', 'en'];

function changeLang (languageCode) {
    if (allowedLanguages.includes(languageCode)) {
        window.localStorage.setItem('lang', languageCode);
        $('#name')[0].placeholder = t('placeholderName');
        $('#surname')[0].placeholder = t('placeholderLastName');
        $('#question')[0].placeholder = t('placeholderQuestion');
        $('#username_pay')[0].placeholder = t('placeholderName');
        $('#surname_pay')[0].placeholder = t('placeholderLastName');
        $('#question_pay')[0].placeholder = t('placeholderPayNote');
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

$('#change-lang').click(function(event) {
    event.preventDefault();
    let langUser = 'uk';
    if (localStorage.getItem('lang') === 'uk') {
        langUser = 'en';
    }
    changeLang(langUser);
});

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

$('.js-link-platform').on('click', function () {
    window.open(process.env.DO_FRONTEND_HOST + '/system/home/?lang=' + localStorage.getItem('lang'));
});

$('.link-cpk').on('click', function () {
    window.open('https://pep.org.ua/'+ localStorage.getItem('lang'));
});

$('#api-docs').on('click', function () {
    window.open(process.env.DO_BACKEND_HOST + '/schema/redoc/');
});

$('#api-button').on('click', function () {
    window.open(process.env.DO_FRONTEND_HOST + '/system/home/?lang=' + localStorage.getItem('lang'));
});

$('#menu-btn').on('click', function (event) {
    event.preventDefault();
    $('#navigation').fadeToggle();
});

$.ajax({
    url: process.env.DO_BACKEND_HOST + '/api/payment/subscriptions/',
    type : 'get',
    dataType: "json",
    // error: function() {
    //     alert('ERROR.');
    // },
    success : function(data) {
        let elements = [];
        const imgPay = [
            'img/freemium_label.svg',
            'img/basic_label.svg',
        ];
        data.forEach (function(subscription, i) {
            const requestsLimitEn = subscription.requests_limit.toLocaleString("en");
            const subscriptionPriceEn = subscription.price.toLocaleString("en");
            
            let html = `
            <div class="payments_tariff">

            <img src="${imgPay[i]}" alt='tarif_logo'></img>

            <h3 class="h3">${subscription.name}</h3>

            <div class="pay_descript">
                <span lang="uk">
                    <br>    
                    ${subscription.requests_limit}
                    API-запитів
                    <br> 
                    ${ !subscription.is_default ? ('Необмежено переглядів') : subscription.platform_requests_limit + ' Переглядів'}
                </span>
                <span lang="en">
                    <br>
                    ${requestsLimitEn}
                    API-requests
                    <br>
                    ${ !subscription.is_default ? ('Unlimited views') : subscription.platform_requests_limit + ' Views'}
                </span>
            </div>
            <div class="price">
                <div lang="uk">
                    ${subscription.price}
                    <span lang="uk">грн/міс</span>
                </div>
                <div lang="en">
                    ${subscriptionPriceEn}
                    <span lang="en">UAH/month</span>
                </div>
            </div>

                <button type="button" class="btn-primary btn-for-pay js-subscription-select" data-id="${subscription.id}">
                    <span lang="uk">Обрати</span>
                    <span lang="en">Choose</span>
                </button>
            </div>
            `
            elements.push(html);
        });

        $('#pay-box').html(elements)

        changeLang(window.localStorage.getItem('lang') || 'uk')

        $('.js-subscription-select').on('click', function () {
            const subId = $(this).data('id')
            window.open(process.env.DO_FRONTEND_HOST + '/system/subscriptions/?lang=' + localStorage.getItem('lang') + `&subscription=${subId}`);
        });
    }
  });

  const getPaySchema = () => {
    return {
        errorClass: "input_error",
        rules: {
            username_pay: {
                required: true,
                minlength: 2,
            },
            surname_pay: {
                required: true,
                minlength: 2,
            },
            email_pay: {
                required: true,
                email: true,
            }
        },
        messages: {
            username_pay: {
                required: t('usernameRequired'),
                minlength: t('minSymbols'),
            },
            surname_pay: {
                required: t('usernameRequired'),
                minlength: t('minSymbols'),
            },
            email_pay: {
                required: t('emailRequired'),
                email: t('emailCorrect'),
            }
        }
    }
};

$('#open-payform').on('click', function () {
    $('.open-payform').fadeToggle();
});

$('#pay-form').submit(function(event){
    event.preventDefault();
    let payForm = $(this);
    payForm.validate(getPaySchema())
    if (!payForm.valid()) {
        return
    }
    let payData = {
        name: this.username_pay.value + ' ' + this.surname_pay.value,
        email: this.email_pay.value,
        subject: this.username_pay.value + ' ' + this.phone_pay.value, 
        message: this.question_pay.value ?  t('note') + ': ' + this.question_pay.value : t('nomark'),
    }
    $('.open-payform').fadeOut();
    $.ajax({
        url: process.env.DO_BACKEND_HOST + '/api/landing_mail/',
        type: "POST",
        dataType: "json",
        data: payData,
        success: function(data, status, xhr) {
            if (xhr.status !== 200) {
                return
            }
            alert(t('messageSuccess'));
            payForm[0].reset();
        },
        error: function (jqXhr, textStatus, errorMessage) {
            if (jqXhr.status === 400 || jqXhr.status === 503) {
                alert(t('messageError'));
            }
            else {
                alert(t('messageErrorUnknown') + errorMessage);
            }
        }
    })
});

$('#payform-close').on('click', function () {
    $('.open-payform').fadeOut();
});

$('#terms_and_conditions').on('click', function () {
    if (localStorage.getItem('lang') === 'uk') {
        location.assign(process.env.DO_FRONTEND_HOST + '/docs/TermsAndConditionsUk.html');
    } else {
        location.assign(process.env.DO_FRONTEND_HOST + '/docs/TermsAndConditionsEn.html');
    }
});

$('#privacy_policy').on('click', function () {
    if (localStorage.getItem('lang') === 'uk') {
        location.assign(process.env.DO_FRONTEND_HOST + '/docs/PrivacyPolicyUk.html');
    } else {
        location.assign(process.env.DO_FRONTEND_HOST + '/docs/PrivacyPolicyEn.html');
    }
});

