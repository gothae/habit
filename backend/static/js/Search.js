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
            const b_h = document.createElement('h2');
            const b_img = document.createElement('img');
            const b_button = document.createElement('button');
            b_button.classList.add('trigger_popup_fricc');
            b_h.innerHTML = "아침";
            b_img.src = b[2];
            b_img.width = '350';
            b_img.height = '350';
            b_button.innerHTML = "솔루션";
            // b_button.addEventListener('click', function () {
            //     solution(b[0]);
            // });
            const popupImg = document.createElement('img');
            popupImg.src = b[2];
            popupImg.width = '100';
            popupImg.height = '100';

            blank.appendChild(popupImg);
            blank.appendChild(clostBtn);
            bkgr.appendChild(helper);
            bkgr.appendChild(blank);

            div.appendChild(b_h);
            div.appendChild(b_img);
            div.appendChild(b_button);
            div.appendChild(bkgr);
            breakfast.appendChild(div);
            clostBtn.onclick = popup();
            function popup() {
                const trigger = document.querySelector('.trigger_popup_fricc');
                const bkgr = document.querySelector('.hover_bkgr_fricc');
                const close = document.querySelector('.popupCloseButton');
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
        }
        if (l.length != 0) {
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
            const l_h = document.createElement('h2');
            const l_img = document.createElement('img');
            const l_button = document.createElement('button');
            l_button.classList.add('trigger_popup_fricc');
            l_h.innerHTML = "점심";
            l_img.src = l[2];
            l_img.width = '350';
            l_img.height = '350';
            l_button.innerHTML = "솔루션";
            // l_button.addEventListener('click', function () {
            //     solution(l[0]);
            // });
            const popupImg = document.createElement('img');
            popupImg.src = l[2];
            popupImg.width = '100';
            popupImg.height = '100';

            blank.appendChild(popupImg);
            blank.appendChild(clostBtn);
            bkgr.appendChild(helper);
            bkgr.appendChild(blank);

            div.appendChild(l_h);
            div.appendChild(l_img);
            div.appendChild(l_button);
            div.appendChild(bkgr);
            lunch.appendChild(div);
            clostBtn.onclick = popup();
            function popup() {
                const trigger = document.querySelector('.trigger_popup_fricc');
                const bkgr = document.querySelector('.hover_bkgr_fricc');
                const close = document.querySelector('.popupCloseButton');
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
        }
        if (d.length != 0) {
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
            const d_h = document.createElement('h2');
            const d_img = document.createElement('img');
            const d_button = document.createElement('button');
            d_button.classList.add('trigger_popup_fricc');
            d_h.innerHTML = "저녁";
            d_img.src = d[2];
            d_img.width = '350';
            d_img.height = '350';
            d_button.innerHTML = "솔루션";
            // d_button.addEventListener('click', function () {
            //     solution(d[0]);
            // });
            const popupImg = document.createElement('img');
            popupImg.src = d[2];
            popupImg.width = '100';
            popupImg.height = '100';

            blank.appendChild(popupImg);
            blank.appendChild(clostBtn);
            bkgr.appendChild(helper);
            bkgr.appendChild(blank);

            div.appendChild(d_h);
            div.appendChild(d_img);
            div.appendChild(d_button);
            div.appendChild(bkgr);
            dinner.appendChild(div);
            clostBtn.onclick = popup();
            function popup() {
                const trigger = document.querySelector('.trigger_popup_fricc');
                console.log(trigger);
                const bkgr = document.querySelector('.hover_bkgr_fricc');
                const close = document.querySelector('.popupCloseButton');
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
    let calorie = 0;
    let carbohydrate = 0;
    let protein = 0;
    let fat = 0;
    let sodium = 0;
    let calcium = 0;
    let vitamin_c = 0;
    let saturated_fat =0;
    getDaySolution().then((items) => {
        items.map((item)=>{
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
    .then(()=>{
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
                    Math.round(calorie/2400 * 10000) / 100,
                    Math.round(carbohydrate/324 * 10000) / 100,
                    Math.round(protein/55 * 10000) / 100,
                    Math.round(fat/54*10000)/100,
                    Math.round(sodium/2000*10000)/100,
                    Math.round(calcium/750*10000)/100,
                    Math.round(vitamin_c/100*10000)/100,
                    Math.round(saturated_fat/15*10000)/100
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
        for( var i=0; i<arr.length; i++){
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

// 식단 하나 솔루션
function solution(diet_id){
    location.href = `user/diet/${diet_id}`;
}
