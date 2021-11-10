const dietItems = document.querySelector('.diet-items');
const dietItem = document.querySelector('.diet-item');
const breakfast = document.querySelector('.breakfast');
const lunch = document.querySelector('.lunch');
const dinner = document.querySelector('.dinner');

function search() {
    const date = document.querySelector('#datepicker').value;
    const url = 'user/diet'
    // diet table : diet_id, foods, image, user_id, date, meal
    let b = new Array();
    let l = new Array();
    let d = new Array();
    
    fetch(`${url}/${date}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((element) => {
                if(element[5] == 'breakfast'){
                    b = element;
                }
                else if(element[5] == 'lunch'){
                    l = element;
                }
                else{
                    d = element;
                }
            });
        });
    const b_h = document.createElement('h2');
    const b_img = document.createElement('img');
    const b_p = document.createElement('p');
    const b_button = document.createElement('button');
    b_h.innerHTML = b[5];
    b_img.src = b[2];
    b_img.width = '300px';
    b_img.height = '300px';
    b_p.innerHTML = b[4];
    b_button.onclick = solution()
    breakfast.appendChild(b_h, b_img, b_p, b_button);

    const l_h = document.createElement('h2');
    const l_img = document.createElement('img');
    const l_p = document.createElement('p');
    const l_button = document.createElement('button');
    l_h.innerHTML = l[5];
    l_img.src = l[2];
    l_img.width = '300px';
    l_img.height = '300px';
    l_p.innerHTML = l[4];
    l_button.onclick = solution();
    lunch.appendChild(l_h, l_img, l_p, l_button);

    const d_h = document.createElement('h2');
    const d_img = document.createElement('img');
    const d_p = document.createElement('p');
    const d_button = document.createElement('button');}
    d_h.innerHTML = d[5];
    d_img.src = d[2];
    d_img.width = '300px';
    d_img.height = '300px';
    d_p.innerHTML = d[4];
    d_button.onclick = solution();
    dinner.appendChild(d_h, d_img, d_p, d_button);

    console.log(b,l,d);
    dietItems.style.display = "block";

function solution() {
    location.href = `user/diet/`;
}