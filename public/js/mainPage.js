const seemBtn = document.querySelectorAll('#seem-btn');
const updateBtn = document.querySelectorAll('#update-btn');
const deleteBtn = document.querySelectorAll('#delete-btn');
const addBtn = document.getElementById('add-btn');
const submitBtn = document.getElementById('submit');

const modal = document.getElementById('exampleModal');
const title = modal.querySelector('.modal-title');
const content = modal.querySelector('.modal-body');

let currOption = 'update';
let currId = '';

function hideModal() {
    bootstrap.Modal.getInstance(modal).hide();
}

function showModal() {
    bootstrap.Modal.getOrCreateInstance(modal).show();
}

const handleSeen = async (event) => {
    title.innerHTML = 'Thông tin người dùng';
    submitBtn.textContent = 'Xong';
    content.innerHTML = `
        <div class="mb-3">Loading...</div>
    `;
    currId = event.target.value || event.target.id;

    const res = await fetch(`/api/getUserInfo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currId }),
    });

    const result = await res.json();

    if (result.EC === '200' && result.DT) {
        const { username, fullname, address, sex, email } = result.DT;

        content.innerHTML = `
        <div class="mb-3">Username: ${username || `không có`}</div>
        <div class="mb-3">Fullname: ${fullname || `không có`}</div>
        <div class="mb-3">Address: ${address || `không có`}</div>
        <div class="mb-3">Gender: ${sex == 0 ? `nam` : sex == 1 ? `nữ` : `khác`}</div>
        <div class="mb-3">Email: ${email || `không có`}</div>
        `;
    } else if (res.EC === '500' || !result.DT) {
        alert('Lỗi hệ thống!');
    }
};

const handleUpdate = async (event) => {
    // set up modal
    title.innerHTML = 'Chỉnh sửa thông tin người dùng';
    submitBtn.textContent = 'Lưu';
    content.innerHTML = `
        <div class="mb-3">Loading...</div>
    `;
    currOption = 'update';
    currId = event.target.value || event.target.id;

    const res = await fetch(`/api/getUserInfo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currId }),
    });

    const result = await res.json();

    if (result.EC === '200' && result.DT) {
        const { username, fullname, address, sex, email } = result.DT;

        content.innerHTML = `
            <form name="update-form">
                <!-- Username -->
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" value="${username}" readonly/>
                </div>
                <!-- Fullname -->
                <div class="mb-3">
                    <label for="fullname" class="form-label">Fullname</label>
                    <input type="text" name="newFullname" class="form-control" value="${fullname}"/>
                </div>
                <!-- Address -->
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" name="newAddress" class="form-control" value="${address}"/>
                </div>
                <!-- Gender -->
                <div class="mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="newGender"
                            id="ratio-men"
                            value="0"
                        />
                        <label class="form-check-label" for="inlineRadio1"
                            >Nam</label
                        >
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="newGender"
                            id="ratio-women"
                            value="1"
                        />
                        <label class="form-check-label" for="inlineRadio2"
                            >Nữ</label
                        >
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="newGender"
                            id="ratio-orthers"
                            value="2"
                        />
                        <label class="form-check-label" for="inlineRadio3"
                            >Khác</label
                        >
                    </div>
                </div>
                <!-- Email -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" name="newEmail" class="form-control" value="${
                        email || ``
                    }"/>
                </div>
            </form>
        `;

        switch (sex) {
            case 0:
                const men = document.getElementById('ratio-men');
                men.checked = true;
                break;
            case 1:
                const women = document.getElementById('ratio-women');
                women.checked = true;
                break;
            default:
                const orthers = document.getElementById('ratio-orthers');
                orthers.checked = true;
                break;
        }
    } else if (res.EC === '500' || !result.DT) {
        alert('Lỗi hệ thống!');
    }
};

const handleDelete = (event) => {
    title.innerHTML = 'Xoá thông tin người dùng';
    submitBtn.textContent = 'Xoá';
    currOption = 'delete';
    currId = event.target.value || event.target.id;
    content.innerHTML = `
    <div class="mb-3">Bạn có chắc muốn xoá người dùng?</div>
    `;
};

// Xem thông tin người dùng
seemBtn.forEach((button) => {
    button.addEventListener('click', handleSeen);
});

// Sửa thông tin người dùng
updateBtn.forEach((button) => {
    button.addEventListener('click', handleUpdate);
});

// Xoá người dùng
deleteBtn.forEach((button) => {
    button.addEventListener('click', handleDelete);
});

// Thêm người dùng
if (addBtn)
    addBtn.addEventListener('click', (event) => {
        title.innerHTML = 'Thêm người dùng';
        submitBtn.textContent = 'Thêm';
        currOption = 'add';
        content.innerHTML = `
        <form name="add-form">
            <!-- Username -->
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" name="username" class="form-control"/>
            </div>
            <!-- Password -->
            <div class="mb-3">
                <label for="pasword" class="form-label">Password</label>
                <input type="password" name="password" class="form-control"/>
            </div>
            <!-- Fullname -->
            <div class="mb-3">
                <label for="fullname" class="form-label">Fullname</label>
                <input type="text" name="fullname" class="form-control"/>
            </div>
            <!-- Address -->
            <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" name="address" class="form-control"/>
            </div>
            <!-- Gender -->
            <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="ratio-men"
                        value="0"
                        checked
                    />
                    <label class="form-check-label" for="inlineRadio1"
                        >Nam</label
                    >
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="ratio-women"
                        value="1"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                        >Nữ</label
                    >
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="ratio-orthers"
                        value="2"
                    />
                    <label class="form-check-label" for="inlineRadio3"
                        >Khác</label
                    >
                </div>
            </div>
            <!-- Email -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" class="form-control"/>
            </div>
        </form>
    `;
    });

// submit and send api
submitBtn.addEventListener('click', async () => {
    switch (currOption) {
        case 'add':
            const addForm = document.forms['add-form'];
            const { username, password, fullname, address, gender, email } = addForm;

            const info = {
                username: username.value,
                password: password.value,
                fullname: fullname.value,
                address: address.value,
                gender: gender.value,
                email: email.value,
            };
            const addRes = await fetch(`/api/addUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ info }),
            });

            const addResult = await addRes.json();

            if (addResult.EC === '200') {
                const insertId = addResult.DT;
                // add rows
                const currTable = document.getElementById('table_rows');
                const node = document.createElement('tr'); // Create the <tr> element
                node.id = `row_${insertId}`;
                node.innerHTML = `
                    <tr id="row_${insertId}">
                        <th scope="row">${insertId}</th>
                        <td>${username.value}</td>
                        <td id="fullname_${insertId}">${fullname.value}</td>
                        <td id="address_${insertId}">${username.value}</td>
                        <!-- button group -->
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button
                                    type="button"
                                    id="seem-btn"
                                    class="btn btn-link"
                                    value="${insertId}"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i class="fa-regular fa-eye" id="${insertId}"></i>
                                </button>
                                <button
                                    type="button"
                                    id="update-btn"
                                    class="btn btn-link"
                                    value="${insertId}"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i class="fa-regular fa-pen-to-square" id="${insertId}"></i>
                                </button>
                                <button
                                    type="button"
                                    id="delete-btn"
                                    class="btn btn-link"
                                    value="${insertId}"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    <i class="fa-regular fa-trash-can" id="${insertId}"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;

                currTable.appendChild(node);

                // add eventListen
                const currSeemBtn = document.querySelector(`#row_${insertId} #seem-btn`);
                const currUpdateBtn = document.querySelector(`#row_${insertId} #update-btn`);
                const currDeleteBtn = document.querySelector(`#row_${insertId} #delete-btn`);

                currSeemBtn.addEventListener('click', handleSeen);
                currUpdateBtn.addEventListener('click', handleUpdate);
                currDeleteBtn.addEventListener('click', handleDelete);
                // hide modal
                hideModal();
            } else if (addResult.EC === '400') {
                alert(addResult.EM);
            } else if (addResult.EC === '403') {
                alert('Người dùng đã tồn tại');
            } else if (addResult.EC === '500') {
                alert('Lỗi hệ thống');
            }
            frameElement;
            break;
        case 'update':
            const form = document.forms['update-form'];
            const { newFullname, newAddress, newGender, newEmail } = form;

            const newData = {
                fullname: newFullname.value,
                address: newAddress.value,
                gender: newGender.value,
                email: newEmail.value,
            };

            const updateRes = await fetch(`/api/updateUserInfo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currId, newData }),
            });

            const updateResult = await updateRes.json();

            if (updateResult.EC === '200') {
                // update row
                document.getElementById(`fullname_${currId}`).innerHTML = newFullname.value;
                document.getElementById(`address_${currId}`).innerHTML = newAddress.value;

                // hide modal
                hideModal();
            } else if (updateResult.EC === '400') {
                alert('Không có thay đổi được thực hiện');
            } else if (updateResult.EC === '500') {
                alert('Lỗi hệ thống');
            }
            break;
        case 'delete':
            const deleteRes = await fetch(`/api/deleteUserInfo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currId }),
            });

            const deleteResult = await deleteRes.json();

            if (deleteResult.EC === '200') {
                document.getElementById(`row_${currId}`).remove();
                // hide modal
                hideModal();
            } else if (deleteResult.EC === '400') {
                alert('Không có người dùng bị xoá');
            } else if (deleteResult.EC === '500') {
                alert('Lỗi hệ thống');
            }
            break;
        default:
            throw new Error('Invalided option');
    }
});
