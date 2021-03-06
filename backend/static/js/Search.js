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
            if (item[4] === "아침") {
                b = b.concat(item);
            }
            else if (item[4] === "점심") {
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
                button.innerHTML = "솔루션";

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
                ch.innerHTML = '탄';
                const cc = document.createElement('h5');
                cc.innerHTML = `${meal[8]}g `;
                cc.style.marginLeft = '5px';
                carbo.appendChild(ch);
                carbo.appendChild(cc);

                const protein = document.createElement('div');
                const ph = document.createElement('h5');
                ph.style.backgroundColor = '#0eeb24';
                ph.style.color = 'white';
                ph.innerHTML = '단 ';
                const pc = document.createElement('h5');
                pc.innerHTML = `${meal[9]}g `;
                pc.style.marginLeft = '5px';
                protein.appendChild(ph);
                protein.appendChild(pc);

                const fat = document.createElement('div');
                const fh = document.createElement('h5');
                fh.style.backgroundColor = '#f9e41f';
                fh.style.color = 'white';
                fh.innerHTML = '지';
                const fc = document.createElement('h5');
                fc.innerHTML = `${meal[10]}g `;
                fc.style.marginLeft = '5px';
                fat.appendChild(fh);
                fat.appendChild(fc);

                const solutionHead = document.createElement('h3');
                solutionHead.style.display = 'block';
                solutionHead.innerHTML = "<영양성분 분석>";
                const solutionContent = document.createElement('p');
                solutionContent.innerHTML ="튀기지 않은 면으로 가급적 드시기 바랍니다.술은 피하세요 <br> 한끼섭취량 대비 탄수화물 과다이며, 단백질 적정, 지방 과다입니다.";

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
                if(meal[4] === '아침'){
                    breakfast.appendChild(div);
                    mealtime.innerHTML = '아침';
                    button.addEventListener('click', function () {
                        popup('breakfast');
                    });
                }
                else if(meal[4] ==='점심'){
                    mealtime.innerHTML = '점심';
                    lunch.appendChild(div);
                    button.addEventListener('click', function () {
                        popup('lunch');
                    });
                }
                else{
                    mealtime.innerHTML = '저녁';
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
                    text: '하루 권장량 대비 영양소 섭취 현황'
                },
                xAxis: {
                    categories: ['칼로리(kcal)', '탄수화물(g)', '단백질(g)', '지방(g)', '나트륨(mg)', '칼슘(mg)', '비타민C(mg)', '포화지방(g)'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '하루 권장량 대비 비율 (%)',
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
                    name: '섭취량',
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
                { "name": '칼로리 (kcal)', 'amount': calorie, "solution": `평균 칼로리 필요량(2,400 kcal)의 ${Math.round(calorie / 2400 *10000) / 100}% 수준으로 섭취하였습니다.`},
                { "name": '탄수화물 (g)', 'amount': chydrate, "solution": `권장 섭취량 (324 g)의 ${Math.round(chydrate / 324 * 10000) / 100}% 수준으로 섭취하였습니다.`},
                { "name": '단백질 (g)', 'amount': protein, "solution": `권장 섭취량 (55 g)의 ${Math.round(protein / 55 * 10000) / 100}% 수준으로 섭취하였습니다`},
                { "name": '지방 (g)', 'amount': fat, "solution": `권장 섭취량 (54 g)의 ${Math.round(fat / 54 * 10000) / 100}% 수준으로 섭취하였습니다.`},
                { "name": '포화지방 (g)', 'amount': saturated_fat, "solution": `권장 섭취량 (15 g)의 ${Math.round(saturated_fat / 15 *10000) / 100}% 수준으로 섭취하였습니다.`},
                { "name": '나트륨 (mg)', 'amount': sodium, "solution": `권장 섭취량 (2,000 mg)의 ${Math.round(sodium / 2000 * 10000) / 100}% 수준으로 섭취하였습니다.`},
                { "name": '칼슘 (mg)', 'amount': calcium, "solution": `권장 섭취량 (750 mg)의 ${Math.round(calcium / 750 * 10000) / 100}% 수준으로 섭취하였습니다.`},
                { "name": '비타민C (mg)', 'amount': vitamin_c, "solution": `권장 섭취량 (100 mg)의 ${Math.round(vitamin_c / 100 * 10000) / 100}% 수준으로 섭취하였습니다.`}
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