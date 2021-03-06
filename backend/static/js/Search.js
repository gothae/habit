const dietItems = document.querySelector('.diet-items');
const breakfast = document.querySelector('.breakfast');
const lunch = document.querySelector('.lunch');
const dinner = document.querySelector('.dinner');
const config = {
    headers: {
        'Accept': 'application/json'
    }
};
function dietSearch() {
    // diet table : diet_id, foods, image, user_id, date, meal, solution_id
    const date = document.querySelector('#datepicker_diet').value;
    const url = 'user/diet';
    while(breakfast.hasChildNodes()){
        breakfast.removeChild(breakfast.firstChild);
    }
    while (lunch.hasChildNodes()) {
        lunch.removeChild(lunch.firstChild);
    }
    while (dinner.hasChildNodes()) {
        dinner.removeChild(dinner.firstChild);
    }
    const getDiet = () => {
        return fetch(`${url}/${date}`,config).then((res) => res.json());
    }
    getDiet().then((items) => {
        var b = new Array();
        var l = new Array();
        var d = new Array();
        items.forEach((item) => {
            if (item[4] === "์์นจ") {
                b = b.concat(item);
            }
            else if (item[4] === "์ ์ฌ") {
                l = l.concat(item);
            }
            else {
                d = d.concat(item);
            }
        })
        var meals = new Array(b,l,d);
        meals.map((meal) => {
            if(meal.length != 0){
                const bkgr = document.createElement('div');
                bkgr.classList.add('hover_bkgr_fricc');
                const helper = document.createElement('span');
                helper.classList.add('helper');
                const blank = document.createElement('div');
                const clostBtn = document.createElement('div');
                clostBtn.classList.add('popupCloseButton');

                clostBtn.innerHTML = '&times;';

                const div = document.createElement('div')
                div.classList.add('container');
                const h = document.createElement('h2');
                const img = document.createElement('img');
                const button = document.createElement('button');
                button.classList.add('trigger_popup_fricc');
                h.innerHTML = meal[4];
                img.src = meal[2];
                img.width = '380';
                img.height = '320';
                img.style.marginBottom = '20px';
                button.innerHTML = "์๋ฃจ์";

                const popupImg = document.createElement('img');
                popupImg.src = meal[2];
                popupImg.width = '300';
                popupImg.height = '300';
                const title = document.createElement('div');
                title.classList.add('title');
                const mealtime = document.createElement('h3');
                const calorie = document.createElement('h3');
                calorie.style.color = 'red';
                calorie.innerHTML = ` ${meal[7]}kcal`;
                title.appendChild(mealtime);
                title.appendChild(calorie);
                const nutrient = document.createElement('div');
                nutrient.classList.add('nutrient')

                const carbo = document.createElement('div');
                const ch = document.createElement('h5');
                ch.style.backgroundColor = '#215cf3';
                ch.style.color = 'white';
                ch.innerHTML = 'ํ';
                const cc = document.createElement('h5');
                cc.innerHTML = `${meal[8]}g `;
                cc.style.marginLeft = '5px';
                carbo.appendChild(ch);
                carbo.appendChild(cc);

                const protein = document.createElement('div');
                const ph = document.createElement('h5');
                ph.style.backgroundColor = '#0eeb24';
                ph.style.color = 'white';
                ph.innerHTML = '๋จ ';
                const pc = document.createElement('h5');
                pc.innerHTML = `${meal[9]}g `;
                pc.style.marginLeft = '5px';
                protein.appendChild(ph);
                protein.appendChild(pc);

                const fat = document.createElement('div');
                const fh = document.createElement('h5');
                fh.style.backgroundColor = '#f9e41f';
                fh.style.color = 'white';
                fh.innerHTML = '์ง';
                const fc = document.createElement('h5');
                fc.innerHTML = `${meal[10]}g `;
                fc.style.marginLeft = '5px';
                fat.appendChild(fh);
                fat.appendChild(fc);

                const solutionHead = document.createElement('h3');
                solutionHead.style.display = 'block';
                solutionHead.innerHTML = "<์์์ฑ๋ถ ๋ถ์>";
                const solutionContent = document.createElement('p');
                solutionContent.innerHTML ="ํ๊ธฐ์ง ์์ ๋ฉด์ผ๋ก ๊ฐ๊ธ์  ๋์๊ธฐ ๋ฐ๋๋๋ค.์ ์ ํผํ์ธ์ <br> ํ๋ผ์ญ์ทจ๋ ๋๋น ํ์ํ๋ฌผ ๊ณผ๋ค์ด๋ฉฐ, ๋จ๋ฐฑ์ง ์ ์ , ์ง๋ฐฉ ๊ณผ๋ค์๋๋ค.";

                nutrient.appendChild(carbo);
                nutrient.appendChild(protein);
                nutrient.appendChild(fat);

                blank.appendChild(title);
                blank.appendChild(nutrient);
                blank.appendChild(popupImg);
                blank.appendChild(solutionHead);
                blank.appendChild(solutionContent);
                blank.appendChild(clostBtn);
                bkgr.appendChild(helper);
                bkgr.appendChild(blank);

                div.appendChild(h);
                div.appendChild(img);
                div.appendChild(button);
                div.appendChild(bkgr);
                if(meal[4] === '์์นจ'){
                    breakfast.appendChild(div);
                    mealtime.innerHTML = '์์นจ';
                    button.addEventListener('click', function () {
                        popup('breakfast');
                    });
                }
                else if(meal[4] ==='์ ์ฌ'){
                    mealtime.innerHTML = '์ ์ฌ';
                    lunch.appendChild(div);
                    button.addEventListener('click', function () {
                        popup('lunch');
                    });
                }
                else{
                    mealtime.innerHTML = '์ ๋';
                    dinner.appendChild(div);
                    button.addEventListener('click', function () {
                        popup('dinner');
                    });
                }
            }
        });

        dietItems.style.display = "block";
    });
}

function popup(mealtime) {
    const trigger = document.querySelector(`.${mealtime} .trigger_popup_fricc`);
    const bkgr = document.querySelector(`.${mealtime} .hover_bkgr_fricc`);
    const close = document.querySelector(`.${mealtime} .popupCloseButton`);
    trigger.addEventListener('click', function () {
        bkgr.style.display = 'block';
    });
    bkgr.addEventListener('click', function () {
        bkgr.style.display = 'none';
    });
    close.addEventListener('click', function () {
        bkgr.style.display = 'none';
    });
}

function solutionSearch() {
    const diet_recommend = document.querySelector('#diet_recommend');
    diet_recommend.style.display = 'block';
    const area = document.querySelector('#day_diet_container');
    const date = document.querySelector('#datepicker_solution').value;
    const getDaySolution = () => {
        return fetch(`user/solution/${date}`, config).then((res) => res.json());
    }
    let calorie = 0;
    let chydrate = 0;
    let protein = 0;
    let fat = 0;
    let sodium = 0;
    let calcium = 0;
    let vitamin_c = 0;
    let saturated_fat = 0;
    getDaySolution().then((items) => {
        items.map((item) => {
            calorie += item[7];
            chydrate += item[8];
            protein += item[9];
            fat += item[10];
            sodium += item[11];
            calcium += item[12];
            vitamin_c += item[13];
            saturated_fat += item[14];
        })
    })
        .then(() => {
            Highcharts.chart('day_diet_container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'ํ๋ฃจ ๊ถ์ฅ๋ ๋๋น ์์์ ์ญ์ทจ ํํฉ'
                },
                xAxis: {
                    categories: ['์นผ๋ก๋ฆฌ(kcal)', 'ํ์ํ๋ฌผ(g)', '๋จ๋ฐฑ์ง(g)', '์ง๋ฐฉ(g)', '๋ํธ๋ฅจ(mg)', '์นผ์(mg)', '๋นํ๋ฏผC(mg)', 'ํฌํ์ง๋ฐฉ(g)'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'ํ๋ฃจ ๊ถ์ฅ๋ ๋๋น ๋น์จ (%)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' %'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '์ญ์ทจ๋',
                    data: [
                        Math.round(calorie / 2400 * 10000) / 100,
                        Math.round(chydrate / 324 * 10000) / 100,
                        Math.round(protein / 55 * 10000) / 100,
                        Math.round(fat / 54 * 10000) / 100,
                        Math.round(sodium / 2000 * 10000) / 100,
                        Math.round(calcium / 750 * 10000) / 100,
                        Math.round(vitamin_c / 100 * 10000) / 100,
                        Math.round(saturated_fat / 15 * 10000) / 100
                    ]
                }]
            });
            area.style.display = 'block';
            const tableArea = document.querySelector('#diet_analyze_table');
            const tableContent = document.querySelector('#table_content');
            while(tableContent.hasChildNodes()){
                tableContent.removeChild(tableContent.firstChild);
            }
            var arr = [
                { "name": '์นผ๋ก๋ฆฌ (kcal)', 'amount': calorie, "solution": `ํ๊ท  ์นผ๋ก๋ฆฌ ํ์๋(2,400 kcal)์ ${Math.round(calorie / 2400 *10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค.`},
                { "name": 'ํ์ํ๋ฌผ (g)', 'amount': chydrate, "solution": `๊ถ์ฅ ์ญ์ทจ๋ (324 g)์ ${Math.round(chydrate / 324 * 10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค.`},
                { "name": '๋จ๋ฐฑ์ง (g)', 'amount': protein, "solution": `๊ถ์ฅ ์ญ์ทจ๋ (55 g)์ ${Math.round(protein / 55 * 10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค`},
                { "name": '์ง๋ฐฉ (g)', 'amount': fat, "solution": `๊ถ์ฅ ์ญ์ทจ๋ (54 g)์ ${Math.round(fat / 54 * 10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค.`},
                { "name": 'ํฌํ์ง๋ฐฉ (g)', 'amount': saturated_fat, "solution": `๊ถ์ฅ ์ญ์ทจ๋ (15 g)์ ${Math.round(saturated_fat / 15 *10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค.`},
                { "name": '๋ํธ๋ฅจ (mg)', 'amount': sodium, "solution": `๊ถ์ฅ ์ญ์ทจ๋ (2,000 mg)์ ${Math.round(sodium / 2000 * 10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค.`},
                { "name": '์นผ์ (mg)', 'amount': calcium, "solution": `๊ถ์ฅ ์ญ์ทจ๋ (750 mg)์ ${Math.round(calcium / 750 * 10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค.`},
                { "name": '๋นํ๋ฏผC (mg)', 'amount': vitamin_c, "solution": `๊ถ์ฅ ์ญ์ทจ๋ (100 mg)์ ${Math.round(vitamin_c / 100 * 10000) / 100}% ์์ค์ผ๋ก ์ญ์ทจํ์์ต๋๋ค.`}
            ];
            for (var i = 0; i < arr.length; i++) {
                var data = `<tr>
                            <td>${arr[i].name}</td>
                            <td>${arr[i].amount}</td>
                            <td>${arr[i].solution}</td>
                        </tr>`;
                tableContent.innerHTML += data;
            }
            tableArea.style.display = 'block';
        });
}

function showPatientDiet(patientName) {
    const container = document.querySelector('#patientListTable');
    const table = document.querySelector('#patientTableContent');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    const getPatientDiet = (pname) => {
        try {
            return fetch(`${pname}/dietList`, config).then((res) => res.json());
        } catch (error) {
            console.log(error);
        }
    };
    getPatientDiet(patientName).then((diets) => {
        diets.map((diet) => {
            var row = `
                        <tr onclick="location.href='/patientDiet/${diet[0]}'">
                            <td>${diet[3]}</td>
                            <td>${diet[4]}</td>
                            <td>${diet[1]}</td>
                        </tr>
                        `;
            table.innerHTML += row;
        });
        container.style.display = 'block';
    });
}