const submitBtn = document.getElementById('submit');
// submit and send api
submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const loginForm = document.forms['login-form'];

    const { username, password } = loginForm;

    if (!username) alert('Tên đăng nhập không thể để trống');
    else if (username.length > 100) alert('Tên đăng nhập của bạn quá dài');
    else if (password.length < 8 || password.length > 50) alert('Mật khẩu có từ 8 - 50 kí tự');
    else {
        const info = {
            username: username.value,
            password: password.value,
        };

        const addRes = await fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        });

        const addResult = await addRes.json();

        if (addResult.EC === '200') {
            alert('Đăng nhập thành công');
            window.location.href = '/';
        } else if (addResult.EC === '400') {
            alert(addResult.EM);
        } else if (addResult.EC === '500') {
            alert('Lỗi hệ thống');
        }
    }
});
