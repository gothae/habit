const dietItems = document.querySelector('.diet-items');
const dietItem = document.querySelectorAll('.diet-item');

function search() {
    const date = document.querySelector('#datepicker').value;
    dietItems.style.display = "block";
}

const solution = () => {
    location.href = `user/diet/1109`;
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