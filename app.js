const apiAll = 'https://restcountries.com/v3.1/all'
let cards = document.querySelector('.cards')
let searchInput = document.querySelector('.searchInput')
let detailPage = document.querySelector('.detail')
let inputContainer = document.querySelector('.inputContainer')


function goBack() {
    cards.style.display = 'grid'
    detailPage.style.display = 'none'
    inputContainer.style.display = 'block'
}

function createCardElement(item) {
    let name = item.name.common.replace(/ /g , '%20')
    console.log(name)
    cards.innerHTML += `<div class="card" data-country=${name}>
                    <img src="${item.flags.png}" alt="Country">
                    <div class="data">
                        <h1>${item.name.common}</h1>
                        <P class="population"><span>Population:</span> ${item.population}</P>
                        <P class="population"><span>Region:</span> ${item.region}</P>
                        <P class="population"><span>Capital:</span> ${item.capital[0]}</P>
                    </div>
                </div>`

    let allCard = document.querySelectorAll('.card')
    allCard.forEach(function (card) {
        card.addEventListener('click', () => {
            console.log(card.dataset.country)
            fetch(`https://restcountries.com/v3.1/name/${card.dataset.country}`)
                .then((res) => res.json())
                .then((data) => {
                    data.forEach(data => {

                        let languages = []
                        for (const key in data.languages) {
                            languages.push(data.languages[key])
                        }
                        languages = languages.join(', ')

                        let currency

                        for (const key in data.currencies) {
                            currency = data.currencies[key].name
                        }

                        let nativeName = Object.values(data.name.nativeName)[0].common
                        let borderCounteries
                        if (data.borders) {
                            borderCounteries = data.borders.map(border => {
                                return (
                                    `<div>${border}</div>`
                                )
                            })
                            borderCounteries = borderCounteries.join('')
                        } else {
                            borderCounteries = 'this country is not bordered with any country'
                        }
                        cards.style.display = 'none'
                        detailPage.style.display = 'flex'
                        inputContainer.style.display = "none"
                        detailPage.innerHTML = `
                        <div class="backContainer">
                            <div onclick="goBack()"  class="back">
                                <span class="material-symbols-outlined">
                                keyboard_backspace
                                </span>
                                <p>Back</p>
                            </div>
                            </div>
                            <div class="bottomDetail">
                            <img class="flag" src="${data.flags.png}" alt="flag">
                            <div class="information">
                                <div class="country-name">${data.name.common}</div>
                                <div class="left">
                                    <div><span>Native Name:</span> ${nativeName}</div>
                                    <div><span>Population:</span> ${parseFloat(data.population).toLocaleString()}</div>
                                    <div><span>Region:</span> ${data.region}</div>
                                    <div><span>Sub Region:</span> ${data.subregion}</div>
                                    <div><span>Capital:</span> ${data.capital}</div>
                                </div>
                                <div class="right">
                                    <div><span>Top Level Domain:</span> ${data.tld}</div>
                                    <div><span>Currencies:</span> ${currency}</div>
                                    <div><span>Languages:</span> ${languages}</div>
                                </div>
                                <div class="border-countries">
                                    <h1>Border Countries:</h1>
                                    <div class="countries">
                                        ${borderCounteries}
                                    </div>
                                </div>
                            </div>
                            </div>

                            <p class="attribution" style="text-align: center; position: absolute; bottom: 0;">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
                style="color: gray; font-weight: 700; text-decoration:none;">Frontend Mentor</a>.
            Coded by <a href="https://github.com/ehsanqasimi" target="_blank"
                style="color: gray; font-weight: 700; text-decoration:none;">Ehsan Qasimi</a>.
        </p>
                        `
                    })
                })

        })
    })
}
//fetching data and storing it in cards

if (searchInput.value === '' || searchInput.value === null) {
    fetch(apiAll)
        .then((res) => res.json())
        .then((data) => {
            data.forEach(item => {
                createCardElement(item)
            });

        }).catch(err => {
            return
        })
}

searchInput.addEventListener('input', function () {
    region.value = 'All'
    fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            cards.innerHTML = null
            data.forEach(item => {
                createCardElement(item)

            });

        }).catch(err => {
            return
        })

})


//dark and light mode
const darkMode = document.querySelector('.darkMode')

darkMode.addEventListener('click', function () {
    document.body.classList.toggle('bodyDarkMode')
})




//filter by region
const region = document.getElementById('region')
region.addEventListener('input', function () {
    console.log(region.value)
    if (region.value === 'All') {
        fetch(apiAll)
            .then((res) => res.json())
            .then((data) => {
                data.forEach(item => {
                    createCardElement(item)

                });

            }).catch(err => {
                return
            })
    }
    fetch(`https://restcountries.com/v3.1/region/${region.value}`)
        .then((res) => res.json())
        .then((data) => {
            cards.innerHTML = null
            data.forEach(item => {
                createCardElement(item)

            });


        }).catch(err => {
            return
        })
})