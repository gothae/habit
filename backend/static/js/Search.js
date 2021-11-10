const dietItems = document.querySelector('.diet-items');
const dietItem = document.querySelector('.diet-item');
const breakfast = document.querySelector('.breakfast');
const lunch = document.querySelector('.lunch');
const dinner = document.querySelector('.dinner');

function search() {
    const date = document.querySelector('#datepicker').value;
    const url = 'user/diet'
    let b = {};
    let l = {};
    let d = {};
    dietItems.style.display = "block";
    fetch(`${url}/${date}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((element) => {
                console.log(element[5]);
            });
        });
    console.log(l);
    console.log(d);
}

const solution = () => {
    location.href = `user/diet/`;
}

// var fetch = true;
// var url = 'someurl.java';
// $.ajax(
//     {
//         type: 'post',
//         url: url,
//         dataType: 'json', // expected returned data format.
//         data:
//         {
//             'fetch': fetch // You might want to indicate what you're requesting.
//         },
//         success: function (data) {
//             // This happens AFTER the backend has returned an JSON array (or other object type)
//             var res1, res2;

//             for (var i = 0; i < data.length; i++) {
//                 // Parse through the JSON array which was returned.
//                 // A proper error handling should be added here (check if
//                 // everything went successful or not)

//                 res1 = data[i].res1;
//                 res2 = data[i].res2;

//                 // Do something with the returned data
//                 $('#div1').html(res1);
//             }
//         },
//         complete: function (data) {
//             // do something, not critical.
//         }
//     });