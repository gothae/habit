Kakao.init('bf82e456f3647f700101cbfcbf95217d'); //발급받은 키 중 javascript키를 사용해준다.
console.log(Kakao.isInitialized()); // sdk초기화여부판단
//카카오로그인
function kakaoLogin() {
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    var userEmail = response.kakao_account.email;
                    var userName = response.kakao_account.name;
                    var userBirthDay = response.kakao_account.birthday;
                    var userBirthYear = response.kakao_account.birthyear;
                    var userBirthDate = `${userBirthYear}-${userBirthDay.substr(0, 2)}-${userBirthDay.substr(2, 4)}`;
                    var userGender = response.kakao_account.gender;
                    var userPhoneNum = response.kakao_account.phone_number;

                },
                fail: function (error) {
                    console.log(error)
                },
            })
        },
        fail: function (error) {
            console.log(error)
        },
    })
}
//카카오로그아웃
function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response)
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)
    }
}