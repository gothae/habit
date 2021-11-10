const dietItems = document.querySelector('.diet-items');
const dietItem = document.querySelector('.diet-item');
const breakfast = document.querySelector('.breakfast');
const lunch = document.querySelector('.lunch');
const dinner = document.querySelector('.dinner');
// const btnSearch = document.querySelector('#btn-search');

// btnSearch.addEventListener('click',function(){
//     search();
// })

function search() {
    // diet table : diet_id, foods, image, user_id, date, meal
    const date = document.querySelector('#datepicker').value;
    const url = 'user/diet';

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };
    const getDiet = () => {
        return fetch(`${url}/${date}`,config).then((res) => res.json());
    }
    getDiet().then((item) => {
        if(item[5] === "breakfast"){
            var b = item;
        }
        else if(item[5] === "lunch"){
            var l = item;
        }
        else{
            var d = item;
        }
        if (b.length != 0) {
            const b_h = document.createElement('h2');
            const b_img = document.createElement('img');
            const b_p = document.createElement('p');
            const b_button = document.createElement('button');
            b_h.innerHTML = b[5];
            b_img.src = b[2];
            b_img.width = '300px';
            b_img.height = '300px';
            b_p.innerHTML = b[4];
            b_button.addEventListener('click', function () {
                solution();
            });
            breakfast.appendChild(b_h, b_img, b_p, b_button);
        }
        if (l.length != 0) {
            const l_h = document.createElement('h2');
            const l_img = document.createElement('img');
            const l_p = document.createElement('p');
            const l_button = document.createElement('button');
            l_h.innerHTML = l[5];
            l_img.src = l[2];
            l_img.width = '300px';
            l_img.height = '300px';
            l_p.innerHTML = l[4];
            l_button.addEventListener('click', function () {
                solution();
            });
            lunch.appendChild(l_h, l_img, l_p, l_button);
        }
        if (d.length != 0) {
            const d_h = document.createElement('h2');
            const d_img = document.createElement('img');
            const d_p = document.createElement('p');
            const d_button = document.createElement('button');
            d_h.innerHTML = d[5];
            d_img.src = d[2];
            d_img.width = '300px';
            d_img.height = '300px';
            d_p.innerHTML = d[4];
            d_button.addEventListener('click', function () {
                solution();
            });
            dinner.appendChild(d_h, d_img, d_p, d_button);
        }
        dietItems.style.display = "block";
        console.log(b,l,d);
    })
}
function solution(){
    location.href = `user/diet/`;
}