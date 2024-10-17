const seemBtn = document.querySelectorAll('#seem-btn');
const updateBtn = document.getElementById('update-btn');
const deleteBtn = document.getElementById('delete-btn');
const submitBtn = document.getElementById('submit');

const modal = document.getElementById('exampleModal');
const title = modal.querySelector('.modal-title');
const content = modal.querySelector('.modal-body');

seemBtn.forEach((button) => {
    button.addEventListener('click', async (event) => {
        title.innerHTML = 'Thông tin người dùng';
        submitBtn.textContent = 'Xong';
        content.innerHTML = `
            <div class="mb-3">Loading...</div>
        `;

        const res = await fetch(`/api/getUserInfo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: event.target.value || event.target.id }),
        });

        const result = await res.json();

        if (result.EC === '200' && result.DT) {
            const { username, fullname, address, sex, email } = result.DT;

            content.innerHTML = `
            <div class="mb-3">Username: ${username}</div>
            <div class="mb-3">Fullname: ${fullname}</div>
            <div class="mb-3">Address: ${address}</div>
            <div class="mb-3">Gender: ${sex}</div>
            <div class="mb-3">Email: ${email}</div>
            `;
        } else if (res.EC === '500' || !result.DT) {
            alert('Lỗi hệ thống!');
        }
    });
});

updateBtn.addEventListener('click', () => {
    title.innerHTML = 'Chỉnh sửa thông tin người dùng';
    submitBtn.textContent = 'Lưu';
});

deleteBtn.addEventListener('click', () => {
    title.innerHTML = 'Xoá thông tin người dùng';
    submitBtn.textContent = 'Xoá';
});

submitBtn.addEventListener('click', () => {
    console.log('submit');
});
