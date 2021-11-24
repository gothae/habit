import axios from 'axios';
const getPatientDiet = async (pname) => {
    try {
        return await axios.get(`/${pname}/dietList`);
    } catch (error) {
        console.log(error);
    }
}

function showPatientDiet(patientName) {
    getPatientDiet(patientName).then((diets) => {
        diets.map((diet) => {
            console.log(diet);
        })
    })
}