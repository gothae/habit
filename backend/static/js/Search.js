const dietItems = document.querySelector('.diet-items');
const dietItem = document.querySelector('.diet-item');
const breakfast = document.querySelector('.breakfast');
const lunch = document.querySelector('.lunch');
const dinner = document.querySelector('.dinner');

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
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
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
            const b_p = document.createElement('p');
            const b_button = document.createElement('button');
            b_h.innerHTML = "아침";
            b_img.src = b[2];
            b_img.width = '350';
            b_img.height = '350';
            b_p.innerHTML = b[4];
            b_button.innerHTML = "솔루션";
            b_button.addEventListener('click', function () {
                solution(b[0]);
            });
            breakfast.appendChild(b_h);
            breakfast.appendChild(b_img);
            breakfast.appendChild(b_p);
            breakfast.appendChild(b_button);
        }
        if (l.length != 0) {
            const l_h = document.createElement('h2');
            const l_img = document.createElement('img');
            const l_p = document.createElement('p');
            const l_button = document.createElement('button');
            l_h.innerHTML = "점심";
            l_img.src = l[2];
            l_img.width = '350';
            l_img.height = '350';
            l_p.innerHTML = l[4];
            l_button.innerHTML = "솔루션";
            l_button.addEventListener('click', function () {
                solution(l[0]);
            });
            lunch.appendChild(l_h);
            lunch.appendChild(l_img);
            lunch.appendChild(l_p);
            lunch.appendChild(l_button);
        }
        if (d.length != 0) {
            const d_h = document.createElement('h2');
            const d_img = document.createElement('img');
            const d_p = document.createElement('p');
            const d_button = document.createElement('button');
            d_h.innerHTML = "저녁";
            d_img.src = d[2];
            d_img.width = '350';
            d_img.height = '350';
            d_p.innerHTML = d[4];
            d_button.innerHTML = "솔루션";
            d_button.addEventListener('click', function () {
                solution(d[0]);
            });
            dinner.appendChild(d_h);
            dinner.appendChild(d_img);
            dinner.appendChild(d_p);
            dinner.appendChild(d_button);
        }
        dietItems.style.display = "block";
    })
}
function solutionSearch(){
    const date = document.querySelector('.datepicker').value;

}

function solution(diet_id){
    location.href = `user/diet/${diet_id}`;
}