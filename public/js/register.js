const submitBtn = document.getElementById('submit');
// submit and send api
submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const registerForm = document.forms['register-form'];

    const { fullname, username, email, password, repass } = registerForm;

    if (!email) alert('Email không thể để trống');
    else if (!username) alert('Tên đăng nhập không thể để trống');
    else if (username.length > 100) alert('Tên đăng nhập của bạn quá dài');
    else if (password.length < 8 || password.length > 50) alert('Mật khẩu có từ 8 - 50 kí tự');
    else if (password.value !== repass.value) alert('Mật khẩu nhập lại không trùng khớp');
    else if (!fullname) alert('Họ và tên không thể để trống');
    else if (fullname.length > 100) alert('Họ và tên của bạn quá dài');
    else {
        const info = {
            fullname: fullname.value,
            username: username.value,
            password: password.value,
            repass: repass.value,
            email: email.value,
        };

        const addRes = await fetch(`/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        });

        const addResult = await addRes.json();

        if (addResult.EC === '200') {
            alert('Đăng kí tài khoản thành công');
        } else if (addResult.EC === '400') {
            alert(addResult.EM);
        } else if (addResult.EC === '403') {
            alert('Người dùng đã tồn tại');
        } else if (addResult.EC === '500') {
            alert('Lỗi hệ thống');
        }
    }
});
