function postLogin() {
    let user = document.getElementById('username').val();
    let password = document.getElementById('password').val();

    const details = {
        userLogin: user,
        userPassword: password
    }

    //using the axios module to make the request
    axios({
            method: 'post',
            url: URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: details
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(err) {
            console.log(err);
        })
}
