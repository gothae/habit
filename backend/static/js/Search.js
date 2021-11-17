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
            breakfast.appendChild(b_h);
            breakfast.appendChild(b_img);
            breakfast.appendChild(b_button);
        }
        if (l.length != 0) {
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
            lunch.appendChild(l_h);
            lunch.appendChild(l_img);
            lunch.appendChild(l_button);
        }
        if (d.length != 0) {
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
            dinner.appendChild(d_h);
            dinner.appendChild(d_img);
            dinner.appendChild(d_button);
        }
        dietItems.style.display = "block";
    })
}
function DaySolutionSearch(){
    const date = document.querySelector('.datepicker').value;
    const getDaySolution = () =>{
        return fetch(`user/solution/${date}`, config).then((res) => res.json());
    }
    const area = document.querySelector('.day_diet_container');
    var calorie, carbohydrate, protein, fat, sodium, calcium, vitamin_c, saturated_fat;
    getDaySolution().then((item) => {
        console.log(item);
        calorie += item[7];
        carbohydrate += item[8];
        protein += item[9];
        fat += item[10];
        sodium += item[11];
        calcium += item[12];
        vitamin_c += item[13];
        saturated_fat += item[14];
    });
    const p = document.createElement('p');
    p.innerHTML = calorie;
    area.appendChild(p);
}

function solution(diet_id){
    location.href = `user/diet/${diet_id}`;
}