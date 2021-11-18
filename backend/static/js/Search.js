const dietItems = document.querySelector('.diet-items');
const dietItem = document.querySelector('.diet-item');
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
        if (b.length != 0) {
            const div = document.createElement('div')
            div.classList.add('container');
            const b_h = document.createElement('h2');
            const b_img = document.createElement('img');
            const b_button = document.createElement('button');
            b_h.innerHTML = "아침";
            b_img.src = b[2];
            b_img.width = '350';
            b_img.height = '350';
            b_button.innerHTML = "솔루션";
            b_button.addEventListener('click', function () {
                solution(b[0]);
            });
            div.appendChild(b_h);
            div.appendChild(b_button);
            breakfast.appendChild(b_img);
            breakfast.appendChild(div);
        }
        if (l.length != 0) {
            const div = document.createElement('div')
            div.classList.add('container');
            const l_h = document.createElement('h2');
            const l_img = document.createElement('img');
            const l_button = document.createElement('button');
            l_h.innerHTML = "점심";
            l_img.src = l[2];
            l_img.width = '350';
            l_img.height = '350';
            l_button.innerHTML = "솔루션";
            l_button.addEventListener('click', function () {
                solution(l[0]);
            });
            div.appendChild(l_h);
            div.appendChild(l_button);
            lunch.appendChild(l_img);
            lunch.appendChild(div);
        }
        if (d.length != 0) {
            const div = document.createElement('div')
            div.classList.add('container');
            const d_h = document.createElement('h2');
            const d_img = document.createElement('img');
            const d_button = document.createElement('button');
            d_h.innerHTML = "저녁";
            d_img.src = d[2];
            d_img.width = '350';
            d_img.height = '350';
            d_button.innerHTML = "솔루션";
            d_button.addEventListener('click', function () {
                solution(d[0]);
            });
            div.appendChild(d_h);
            div.appendChild(d_button);
            dinner.appendChild(d_img);
            dinner.appendChild(div);
        }
        dietItems.style.display = "block";
    });
}
// 하루치 솔루션
function DaySolutionSearch(){
    const area = document.querySelector('#day_diet_container');
    const date = document.querySelector('#datepicker_solution').value;
    const getDaySolution = () =>{
        return fetch(`user/solution/${date}`, config).then((res) => res.json());
    }
    var calorie, carbohydrate, protein, fat, sodium, calcium, vitamin_c, saturated_fat;
    getDaySolution().then((items) => {
        items.map((item)=>{
            console.log(item);
            calorie += item[7];
            carbohydrate += item[8];
            protein += item[9];
            fat += item[10];
            sodium += item[11];
            calcium += item[12];
            vitamin_c += item[13];
            saturated_fat += item[14];
        })
        console.log(calorie);
    })
    .then(()=>{
        console.log(calorie);
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
                data: [calorie, carbohydrate, protein, fat, sodium, calcium, vitamin_c, saturated_fat]
            }, {
                name: '권장량',
                data: [2400, 324, 55, 54, 2000, 750, 100, 15]
            }]
        });
    console.log(calorie);
    area.style.display = 'block'; 
    });
    
}

// 식단 하나 솔루션
function solution(diet_id){
    location.href = `user/diet/${diet_id}`;
}