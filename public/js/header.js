const logoutBtn = document.getElementById('logout');
// submit and send api
logoutBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const addRes = await fetch(`/api/logout`, {
        method: 'GET',
    });

    const addResult = await addRes.json();

    if (addResult.EC === '200') {
        alert('Đăng xuất tài khoản thành công');
        window.location.reload();
    } else if (addResult.EC === '500') {
        alert('Lỗi hệ thống');
    }
});
