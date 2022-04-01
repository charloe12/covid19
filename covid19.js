let httpReq = new XMLHttpRequest()
let aside = document.querySelector('#as')
let main = document.querySelector('main')
httpReq.open('GET', 'https://api.covid19api.com/countries')
let divs
let input = document.querySelector('input')




httpReq.onreadystatechange = () => {
    if (httpReq.readyState == 4) {
        let res = JSON.parse(httpReq.response)
        let str = ''
        let con = []
        res.forEach(e => {
            str += `<div onclick='showinf("${e.ISO2}")' id='${e.ISO2}' class="country">${e.Country}</div>`
            con.push(e.Country)
        })
        aside.innerHTML = str
        console.log(aside.innerHTML.length)
        console.log(str.length)

        //console.log(str)
        divs = document.querySelectorAll('.country')

        let innt = setInterval(e => {
            if (input.value != '') {
                let hhh = ''
                res.forEach(e => {
                    let j = 0

                    for (let i = 0; i < input.value.length; i++) {

                        if (input.value[i].toLowerCase() == e.Country[i].toLowerCase()) {
                            j++
                        }
                        if (j == input.value.length) {
                            hhh += `<div onclick='showinf("${e.ISO2}")' id='${e.ISO2}' class="country">${e.Country}</div>`
                        }

                    }
                    aside.innerHTML = hhh
                })
            } if (input.value == '' && aside.innerHTML.length != 19798) {

                aside.innerHTML = str
            }
        }, 1000)

    }

}

httpReq.send()
function showinf(so) {
    let url = `https://api.covid19api.com/dayone/country/` + so
    let httpReq1 = new XMLHttpRequest()
    httpReq1.open('GET', url, true)
    httpReq1.onreadystatechange = () => {
        if (httpReq1.readyState == 4) {
            let res1 = JSON.parse(httpReq1.response)
            let deaths = []
            let recovered = []
            let confirmed = []
            let i = 1
            res1.forEach(el => {
                deaths.push({ x: i, y: parseInt(el.Deaths) })
                recovered.push({ x: i, y: parseInt(el.Recovered) })
                confirmed.push({ x: i, y: parseInt(el.Confirmed) })
                i++
            });
            var myChart = new Chart("myChart", {
                type: "scatter",
                data: {
                    datasets: [{
                        data: deaths,
                        borderColor: "#ECD4EA",
                        fill: false,
                        label: 'deaths'
                    }, {
                        data: confirmed,
                        borderColor: "#A987A8",
                        fill: false,
                        label: 'confirmed'
                    }, {
                        data: recovered,
                        borderColor: "#511F52",
                        fill: false,
                        label: 'recovered'
                    }]
                },
            });
        }
    }

    httpReq1.send()
}
