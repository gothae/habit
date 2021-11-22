// 하루치 솔루션
const config = {
    headers: {
        'Accept': 'application/json'
    }
};
function solutionSearch() {
    const area = document.querySelector('#day_diet_container');
    const date = document.querySelector('#datepicker_solution').value;
    const getDaySolution = () => {
        return fetch(`user/solution/${date}`, config).then((res) => res.json());
    }
    let calorie = 0;
    let carbohydrate = 0;
    let protein = 0;
    let fat = 0;
    let sodium = 0;
    let calcium = 0;
    let vitamin_c = 0;
    let saturated_fat = 0;
    getDaySolution().then((items) => {
        items.map((item) => {
            calorie += item[7];
            carbohydrate += item[8];
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
                        Math.round(carbohydrate / 324 * 10000) / 100,
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
            var arr = [
                { "name": '칼로리 (kcal)', 'amount': calorie },
                { "name": '탄수화물 (g)', 'amount': carbohydrate },
                { "name": '단백질 (g)', 'amount': protein },
                { "name": '지방 (g)', 'amount': fat },
                { "name": '포화지방 (g)', 'amount': saturated_fat },
                { "name": '나트륨 (mg)', 'amount': sodium },
                { "name": '칼슘 (mg)', 'amount': calcium },
                { "name": '비타민C (mg)', 'amount': vitamin_c }
            ];
            for (var i = 0; i < arr.length; i++) {
                var data = `<tr>
                            <td>${arr[i].name}</td>
                            <td>${arr[i].amount}</td>
                        </tr>`;
                tableContent.innerHTML += data;
            }
            console.log(tableContent);
            tableArea.style.display = 'block';
        });
}
