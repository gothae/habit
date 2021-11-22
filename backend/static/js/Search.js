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
        var meals = new Array(b,l,d);
        meals.map((meal) => {
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
            popupImg.width = '100';
            popupImg.height = '100';
            const calorie =document.createElement('')

            blank.appendChild(popupImg);
            blank.appendChild(clostBtn);
            bkgr.appendChild(helper);
            bkgr.appendChild(blank);

            div.appendChild(h);
            div.appendChild(img);
            div.appendChild(button);
            div.appendChild(bkgr);
            if(meal[4] === '아침'){
                breakfast.appendChild(div);
                button.addEventListener('click', function () {
                    popup('breakfast');
                });
            }
            else if(meal[4] ==='점심'){
                lunch.appendChild(div);
                button.addEventListener('click', function () {
                    popup('lunch');
                });
            }
            else{
                dinner.appendChild(div);
                button.addEventListener('click', function () {
                    popup('dinner');
                });
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