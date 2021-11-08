const dietItem = document.querySelector('.diet-items');

function search() {
    const date = document.querySelector('#datepicker').value;
    dietItem.style.display = "block";
    console.log(date, typeof date);
}
