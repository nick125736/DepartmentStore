// 取得頁面中用來呈現內容的元素
const content = document.querySelector('#content');
// 取得頁面中用來導航的元素
const nav = document.querySelector('nav');
// 綁定導航元素的 click 事件處理函式
nav.addEventListener('click', handleNavClick);

// 切換導覽功能時，顯示相對應的內容
// title 是標題，html 是內容
function switchContent(title, html) {
    content.innerHTML = `
        ${title}
        ${html}
    `;
}


// 導航列各項目的點擊事件處理函式
function handleNavClick(e) {
    e.preventDefault();

    // 切換功能區域的內容
    if (e.target.textContent === '關於我們') {    
        const html = `
            <img src="https://ec051.so-buy.com/ezfiles/863/1863/plugin/ec/pictures/316/m/mczh-tw800x800_small100793.jpg" alt="alternatetext" weight="720px" height="720px">
            <img src="https://img.league-funny.com/imgur/170325577164_n.jpg" alt="alternatetext">
            <img src="https://megapx-assets.dcard.tw/images/699749fd-198c-4ec8-ab96-681c49813f23/1280.jpeg" alt="alternatetext">
            <iframe width="720" height="720" src="https://www.youtube.com/embed/Cjx8507XQfQ?si=7JoeO9RFa-8Bk83s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
        switchContent('', html);
    }
    else if (e.target.textContent === '單純顯示資料') {
        pureDisplay();
    } else if (e.target.textContent === 'CRUD操作') {
        crudOperate();
    } else if (e.target.textContent === '跨表格簡易存取') {
        crossTableBrief();
    } else if (e.target.textContent === '跨表格雙層折疊') {
        crossTableDoubleLayer();
    }
}


// 建立 Axios 實例
const axiosInstance = axios.create({
    baseURL: 'https://localhost:7205/api/',
    timeout: 5000,
});

// 單純顯示資料
function pureDisplay() {
    const html = `  
    <div class="button-container">
        <button class="btnMenu" onclick="counterFull()">Counter完整資料</button>
        <button class="btnMenu" onclick="memberFull()">Member完整資料</button>
    </div>
    `;
    // 切換功能區域的內容
    switchContent('單純顯示資料的按鈕', html);
}
// 點選「行事曆完整資料」功能時，呼叫此函式
function counterFull() {
    // 取得行事曆資料
    axiosInstance.get('Counter')
        .then(res => {
            const counter = res.data.counters;
            // 呼叫函式去呈現行事曆資料在頁面中
            show_counter_full(counter);
        })
        .catch(err => {
            console.error(err);
        });
}

// 呈現「行事曆完整資料」在頁面中
function show_counter_full(counter) {
    // 建立行事曆的 HTML 內容
    const html = `
        <table>
            <thead>
                <tr>
                    <th>編號</th>
                    <th>名子</th>
                    <th>信箱</th>
                    <th>電話</th>
                    <th>類型</th>
                    <th>樓層</th>
                </tr>
            </thead>
            <tbody>
                ${counter.map(item => `
                    <tr>
                        <td>${item.cid}</td>
                        <td>${item.cName}</td>
                        <td>${item.cmail}</td>
                        <td>${item.cphone}</td>
                        <td>${item.ctype}</td>
                        <td>${item.cfl}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('店鋪', html);
}

function memberFull() {
    // 取得行事曆資料
    axiosInstance.get('Member')
        .then(res => {
            const member = res.data.members;
            // 呼叫函式去呈現行事曆資料在頁面中
            show_member_full(member);
        })
        .catch(err => {
            console.error(err);
        });
}
// 呈現「行事曆完整資料」在頁面中
function show_member_full(member) {
    // 建立行事曆的 HTML 內容
    const html = `
        <table>
            <thead>
                <tr>
                    <th>編號</th>
                    <th>名子</th>
                    <th>性別</th>
                    <th>住址</th>
                    <th>電話</th>
                </tr>
            </thead>
            <tbody>
                ${member.map(item => `
                    <tr>
                        <td>${item.mid}</td>
                        <td>${item.mName}</td>
                        <td>${item.msex}</td>
                        <td>${item.mstate}</td>
                        <td>${item.mphone}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('會員', html);
}

function crudOperate() {
    const html = `  
    <div class="button-container">
        <button class="btnMenu" onclick="counterBrief()">CounterCRUD</button>
        <button class="btnMenu" onclick="memberBrief()">MemberCRUD</button>
    </div>
    `;
    // 切換功能區域的內容
    switchContent('單純顯示資料的按鈕', html);
}

// 將 form data 轉成 json
function form_data_to_json(formData) {
    let object = {};    // 宣告一個空物件
    // 逐一取出 form 之中各項的 key 和 value，記錄至物件中
    formData.forEach(function (value, key) {
        // 將 'true' 或 'false' 的字串格式轉換為布林值格式
        if (value === 'true' || value === 'false') {
            // 利用判斷 value 的值是 'true' 還是 'false'，來決定布林值
			// 通常是為了單選鈕 or 複選鈕是否要被勾選用
            object[key] = value === 'true';
        } else {
            object[key] = value; // 其他資料格式保持不變
        }
    });
    return object;
}

function counterBrief() {
    // 取得行事曆資料
    axiosInstance.get('Counter')
        .then(res => {
            const counter = res.data.counters;
            // 呼叫函式去呈現行事曆簡易資料在頁面中
            show_counter_brief(counter);
        })
        .catch(err => {
            console.error(err);
        });
}
// 呈現「行事曆簡易資料」在頁面中（具有新增、修改、刪除按鈕）
function show_counter_brief(counter) {
    // 行事曆的簡易資料及新增、修改、刪除按鈕
    const html = `
        <div class="button-container">
            <button class='createBtn' onclick="add_counter()">新增店鋪</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>編號</th>
                    <th>名子</th>
                    <th>信箱</th>
                    <th>電話</th>
                    <th>類型</th>
                    <th>樓層</th>
                    <th>操作功能</th>
                </tr>
            </thead>
            <tbody>
                ${counter.map(item => `
                    <tr>
                        <td>${item.cid}</td>
                        <td>${item.cName}</td>
                        <td>${item.cmail}</td>
                        <td>${item.cphone}</td>
                        <td>${item.ctype}</td>
                        <td>${item.cfl}</td>
                        <td>
                            <button class='updateBtn' onClick="update_counter('${item.cid}')">修改</button>
                            <button class='deleteBtn' onClick="delete_counter('${item.cid}')">刪除</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('店鋪簡易資料', html);
}

// （新增）點選行事曆的「新增」按鈕時，呼叫此函式
function add_counter() {
    // 呼叫函式去呈現行事曆新增資料在頁面中
    show_counter_add();
}

// （新增）呈現「行事曆新增資料」在頁面中
function show_counter_add() {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="add-counter-form">
        <table>
            <tbody>
                <tr>
                    <th>名子</th>
                    <td><input type="text" id="cname" name="cname"></td>
                </tr>
                <tr>
                    <th>電話</th>                    
                    <td><input type="text" id="cphone" name="cphone"></td>
                </tr>                
            </tbody>
        </table>
        <button type="submit" class='addBtn'>確認新增</button>
    </form>
    `;
    // 切換功能區域的內容
    switchContent('新增店鋪資料', html);

    const form = document.querySelector('#add-counter-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 取得表單（form）所填寫的資料
        const formData = new FormData(form);
        // 將表單的資料轉換成 json 格式
        const jsonData = form_data_to_json(formData);

        // 以 post 方式連線至伺服端新增資料
        axiosInstance.post('Counter', jsonData)
            .then(res => {
                window.alert('店鋪新增成功！');
                counterBrief();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}
// （修改）點選行事曆的「修改」按鈕時，呼叫此函式
function update_counter(cid) {
    // 取得行事曆資料
    axiosInstance.get(`Counter/${cid}`)
        .then(res => {
            const counter = res.data.counters;
            // 呼叫函式去呈現行事曆修改資料在頁面中
            show_counter_update(counter);
        })
        .catch(err => {
            console.error(err);
        });
}

// （修改）呈現「行事曆修改資料」在頁面中
function show_counter_update(counter) {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="update-counter-form">
        <table>
            <tbody>
                <tr>
                    <th>名子</th>
                    <td><input type="text" id="cname" name="cname" value="${counter.cName}" ></td>
                </tr>
                <tr>
                    <th>信箱</th>                    
                    <td><input type="text" id="cmail" name="cmail" value="${counter.cmail}"></td>
                </tr>
                <tr>
                    <th>電話</th>                    
                    <td><input type="text" id="cphone" name="cphone" value="${counter.cphone}"></td>
                </tr>
                <tr>
                    <th>類型</th>
                    <td><input type="text" id="ctype" name="ctype" value="${counter.ctype}"></td>
                </tr>
                <tr>
                    <th>樓層</th>                    
                    <td><input type="text" id="cfl" name="cfl" value="${counter.cfl}">如果失敗請使用數字+F</td>
                </tr>     
            </tbody>
        </table>
        <button type="submit" class='updateBtn'>確認修改</button>
        </form>
    `;
    // 切換功能區域的內容
    switchContent('店鋪修改資料', html);

    const form = document.querySelector('#update-counter-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 取得表單（form）所填寫的資料
        const formData = new FormData(form);
        // 將表單的資料轉換成 json 格式
        const jsonData = form_data_to_json(formData);
        // 以 put 方式連線至伺服端修改資料
        axiosInstance.put(`Counter/${counter.cid}`, jsonData)
            .then(res => {
                window.alert('店鋪修改成功！');
                counterBrief();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}

// （刪除）點選行事曆的「刪除」按鈕時，呼叫此函式
function delete_counter(cid) {
    // 取得行事曆資料
    axiosInstance.get(`Counter/${cid}`)
        .then(res => {
            const counter = res.data.counters;
            // 呼叫函式去呈現行事曆刪除資料在頁面中
            show_counter_delete(counter);
        })
        .catch(err => {
            console.error(err);
        });
}

// （刪除）呈現「行事曆刪除資料」在頁面中
function show_counter_delete(counter) {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="delete-counter-form">
        <table>
            <tbody>
                <tr>
                    <th>名子</th>
                    <td><input type="text" id="cname" name="cname" value="${counter.cName}" disabled></td>
                </tr>
                <tr>
                    <th>信箱</th>                    
                    <td><input type="text" id="cmail" name="cmail" value="${counter.cmail}" disabled></td>
                </tr>
                <tr>
                    <th>電話</th>                    
                    <td><input type="text" id="cphone" name="cphone" value="${counter.cphone}" disabled></td>
                </tr>
                <tr>
                    <th>類型</th>
                    <td><input type="text" id="ctype" name="ctype" value="${counter.ctype}" disabled></td>
                </tr>
                <tr>
                    <th>樓層</th>                    
                    <td><input type="text" id="cfl" name="cfl" value="${counter.cfl}" disabled></td>
                </tr>     
            </tbody>
        </table>
        <button type="submit" class='deleteBtn'>確認刪除</button>
     </form>
    `;
    // 切換功能區域的內容
    switchContent('店鋪刪除資料', html);

    const form = document.querySelector('#delete-counter-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 以 delete 方式連線至伺服端刪除資料
        axiosInstance.delete(`Counter/${counter.cid}`)
            .then(res => {
                window.alert('店鋪刪除成功！');
                counterBrief();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}


function memberBrief() {
    // 取得行事曆資料
    axiosInstance.get('Member')
        .then(res => {
            const member = res.data.members;
            // 呼叫函式去呈現行事曆簡易資料在頁面中
            show_member_brief(member);
        })
        .catch(err => {
            console.error(err);
        });
}

// 呈現「行事曆簡易資料」在頁面中（具有新增、修改、刪除按鈕）
function show_member_brief(member) {
    // 行事曆的簡易資料及新增、修改、刪除按鈕
    const html = `
        <div class="button-container">
            <button class='createBtn' onclick="add_member()">新增會員</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>編號</th>
                    <th>名子</th>
                    <th>性別</th>
                    <th>住址</th>
                    <th>電話</th>
                    <th>操作功能</th>
                </tr>
            </thead>
            <tbody>
                ${member.map(item => `
                    <tr>
                        <td>${item.mid}</td>
                        <td>${item.mName}</td>
                        <td>${item.msex}</td>
                        <td>${item.mstate}</td>
                        <td>${item.mphone}</td>
                        <td>
                            <button class='updateBtn' onClick="update_member(${item.mid})">修改</button>
                            <button class='deleteBtn' onClick="delete_member(${item.mid})">刪除</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('會員簡易資料', html);
}

// （新增）點選行事曆的「新增」按鈕時，呼叫此函式
function add_member() {
    // 呼叫函式去呈現行事曆新增資料在頁面中
    show_member_add();
}

// （新增）呈現「行事曆新增資料」在頁面中
function show_member_add() {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="add-member-form">
        <table>
            <tbody>
                <tr>
                    <th>名子</th>
                    <td><input type="text" id="mname" name="mname"></td>
                </tr>
                <tr>
                    <th>性別</th>                    
                    <td>
                        <input type="radio" id="M" name="msex" value="M">
                        <label for="M">M</label>
                        <input type="radio" id="F" name="msex" value="F">
                        <label for="F">F</label>
                    </td>
                </tr>                
            </tbody>
        </table>
        <button type="submit" class='addBtn'>確認新增</button>
    </form>
    `;
    // 切換功能區域的內容
    switchContent('新增會員資料', html);

    const form = document.querySelector('#add-member-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 取得表單（form）所填寫的資料
        const formData = new FormData(form);
        // 將表單的資料轉換成 json 格式
        const jsonData = form_data_to_json(formData);
        // 以 post 方式連線至伺服端新增資料
        axiosInstance.post(`Member`, jsonData)
            .then(res => {
                window.alert('會員新增成功！');
                memberBrief();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}

// （修改）點選行事曆的「修改」按鈕時，呼叫此函式
function update_member(mid) {
    // 取得行事曆資料
    axiosInstance.get(`Member/${mid}`)
        .then(res => {
            const member = res.data.member;
            // 呼叫函式去呈現行事曆修改資料在頁面中
            show_member_update(member);
        })
        .catch(err => {
            console.error(err);
        });
}

// （修改）呈現「行事曆修改資料」在頁面中
function show_member_update(member) {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="update-member-form">
        <table>
            <tbody>
                <tr>
                    <th>名子</th>
                    <td><input type="text" id="mname" name="mname" value="${member.mName}"></td>
                </tr>
                <tr>
                    <th>性別</th>
                    <td>
                        <input type="radio" id="M" name="msex" value='M' ${member.msex === 'M' ? 'checked' : ''}>
                        <label for="M">M</label>
                        <input type="radio" id="F" name="msex" value='F' ${member.msex === 'F' ? 'checked' : ''}>
                        <label for="F">F</label>
                    </td>
                </tr>
                <tr>
                    <th>住址</th>                    
                    <td><input type="text" id="mstate" name="mstate" value="${member.mstate}"></td>
                </tr>
                <tr>
                    <th>電話</th>
                    <td><input type="text" id="mphone" name="mphone" value="${member.mphone}"></td>
                </tr>
                
            </tbody>
        </table>
        <button type="submit" class='updateBtn'>確認修改</button>
        </form>
    `;
    // 切換功能區域的內容
    switchContent('會員修改資料', html);

    const form = document.querySelector('#update-member-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 取得表單（form）所填寫的資料
        const formData = new FormData(form);
        // 將表單的資料轉換成 json 格式
        const jsonData = form_data_to_json(formData);
        // 以 put 方式連線至伺服端修改資料
        axiosInstance.put(`Member/${member.mid}`, jsonData)
            .then(res => {
                window.alert('會員修改成功！');
                memberBrief();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}

// （刪除）點選行事曆的「刪除」按鈕時，呼叫此函式
function delete_member(mid) {
    // 取得行事曆資料
    axiosInstance.get(`Member/${mid}`)
        .then(res => {
            const member = res.data.member;
            // 呼叫函式去呈現行事曆刪除資料在頁面中
            show_member_delete(member);
        })
        .catch(err => {
            console.error(err);
        });
}

// （刪除）呈現「行事曆刪除資料」在頁面中
function show_member_delete(member) {
    // 建立行事曆的 HTML 內容
    const html = `
    <form id="delete-member-form">
        <table>
            <tbody>
                <tr>
                    <th>名子</th>
                    <td><input type="text" id="mname" name="mname" value="${member.mName}" disabled></td>
                </tr>
                <tr>
                    <th>性別</th>
                    <td>
                        <input type="radio" id="M" name="msex" value='M' ${member.msex === 'M' ? 'checked' : ''} disabled>
                        <label for="M">M</label>
                        <input type="radio" id="F" name="msex" value='F' ${member.msex === 'F' ? 'checked' : ''} disabled>
                        <label for="F">F</label>
                    </td>
                </tr>
                <tr>
                    <th>住址</th>                    
                    <td><input type="text" id="mstate" name="mstate" value="${member.mstate}" disabled></td>
                </tr>
                <tr>
                    <th>電話</th>
                    <td><input type="text" id="mphone" name="mphone" value="${member.mphone}" disabled></td>
                </tr>
                
            </tbody>
        </table>
        <button type="submit" class='deleteBtn'>確認刪除</button>
     </form>
    `;
    // 切換功能區域的內容
    switchContent('會員刪除資料', html);

    const form = document.querySelector('#delete-member-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 以 delete 方式連線至伺服端刪除資料
        axiosInstance.delete(`Member/${member.mid}`)
            .then(res => {
                window.alert('會員刪除成功！');
                memberBrief();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}

// 「跨表格簡易存取」的首頁
function crossTableBrief() {
    const html = `
        <div class="button-container">
            <button class='btnMenu2' onclick="membersForCounter()">參與店鋪的會員</button>
            <button class='btnMenu2' onclick="countersForMember()">會員所參與的店鋪</button>
        </div>
    `;
    // 切換功能區域的內容
    switchContent('跨表格簡易存取', html);
}

// 點選「參與行事曆的會員」功能時，呼叫此函式
function membersForCounter() {
    // 取得行事曆資料
    axiosInstance.get('Counter')
        .then(res => {
            const counter = res.data.counters;
            // 呼叫函式去呈現行事曆簡易資料在頁面中
            show_members_for_counter(counter);
        })
        .catch(err => {
            console.error(err);
        });
}

// 呈現「行事曆資料及參與會員按鈕」在頁面中
function show_members_for_counter(counter) {
    // 行事曆資料及參與會員按鈕
    const html = `
        <table>
            <thead>
                <tr>
                    <th>編號</th>
                    <th>名子</th>
                    <th>信箱</th>
                    <th>電話</th>
                    <th>類型</th>
                    <th>樓層</th>
                    <th>操作功能</th>
                </tr>
            </thead>
            <tbody>
                ${counter.map(item => `
                    <tr>
                        <td>${item.cid}</td>
                        <td>${item.cName}</td>
                        <td>${item.cmail}</td>
                        <td>${item.cphone}</td>
                        <td>${item.ctype}</td>
                        <td>${item.cfl}</td>
                        <td>
                            <button class='doubleLayer' onClick="show_join_members('${item.cid}')">參與的會員</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('參與行事曆的會員', html);
}

// 點選「參與的會員」的按鈕時，呼叫此函式
function show_join_members(cid) {
    // 取得行事曆及參與的會員資料
    axiosInstance.get(`Cross/MemberForCounter/${cid}`)
        .then(res => {
            const counter = res.data.counter;
            // 呼叫函式去呈現行事曆及參與的會員資料在頁面中
            show_join_members_info(counter);
        })
        .catch(err => {
            console.error(err);
        });
}

// 顯示「行事曆及參與的會員」資料
function show_join_members_info(counter) {
    const memberList = counter.member;
    // 如果有多個會員，則用逗號隔開
    if (!memberList) {
        memberList.join(',');
    }

    const html = `
        <table>
            <tbody>
                <tr>
                    <th>編號</th>
                    <td><input type="text" id="cid" name="cid" value="${counter.cid}" disabled></td>
                </tr>
                <tr>
                    <th>名子</th>
                    <td><input type="text" id="cname" name="cname" value="${counter.cname}" disabled></td>
                </tr>
                <tr>
                    <th>參與會員</th>                    
                    <td><input type="text" id="members" name="members" value="${memberList}" disabled></td>
                </tr>              
            </tbody>
        </table>
        <div class="button-container">
            <button id="closeButton">關閉</button>
        </div>
    `;

    // 切換功能區域的內容
    switchContent('行事曆的會員列表', html);
    // 取得關閉按鈕
    const closeButton = document.getElementById('closeButton');

    // 設置關閉按鈕的功能
    closeButton.addEventListener('click', function () {
        // 重新列出最新的行事曆清單
        membersForCounter();
    });
}

// 點選「參與行事曆的會員」功能時，呼叫此函式
function countersForMember() {
    // 取得行事曆資料
    axiosInstance.get('Member')
        .then(res => {
            const member = res.data.members;
            // 呼叫函式去呈現行事曆簡易資料在頁面中
            show_counters_for_member(member);
        })
        .catch(err => { 
            console.error(err);
        });
}

// 呈現「行事曆資料及參與會員按鈕」在頁面中
function show_counters_for_member(member) {
    // 行事曆資料及參與會員按鈕
    const html = `
        <table>
            <thead>
                <tr>
                    <th>編號</th>
                    <th>名子</th>
                    <th>性別</th>
                    <th>住址</th>
                    <th>電話</th>
                    <th>操作功能</th>
                </tr>
            </thead>
            <tbody>
                ${member.map(item => `
                    <tr>
                        <td>${item.mid}</td>
                        <td>${item.mName}</td>
                        <td>${item.msex}</td>
                        <td>${item.mstate}</td>
                        <td>${item.mphone}</td>
                        <td>
                            <button class='doubleLayer' onClick="show_join_counters(${item.mid})">參與的會員</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('參與行事曆的會員', html);
}

// 點選「參與的會員」的按鈕時，呼叫此函式
function show_join_counters(mid) {
    // 取得行事曆及參與的會員資料
    axiosInstance.get(`Cross/CounterForMemeber/${mid}`)
        .then(res => {
            const member = res.data.member;
            // 呼叫函式去呈現行事曆及參與的會員資料在頁面中
            show_join_counter_info(member);
        })
        .catch(err => {
            console.error(err);
        });
}

// 顯示「行事曆及參與的會員」資料
function show_join_counter_info(member) {
    const counterList = member.counter;
    // 如果有多個會員，則用逗號隔開
    if (!counterList) {
        counterList.join(',');
    }

    const html = `
        <table>
            <tbody>
                <tr>
                    <th>編號</th>
                    <td><input type="text" id="mid" name="mid" value="${member.mid}" disabled></td>
                </tr>
                <tr>
                    <th>標題</th>
                    <td><input type="text" id="mname" name="mname" value="${member.mname}" disabled></td>
                </tr>
                <tr>
                    <th>參與會員</th>                    
                    <td><input type="text" id="counters" name="counters" value="${counterList}" disabled></td>
                </tr>              
            </tbody>
        </table>
        <div class="button-container">
            <button id="closeButton">關閉</button>
        </div>
    `;

    // 切換功能區域的內容
    switchContent('行事曆的會員列表', html);
    // 取得關閉按鈕
    const closeButton = document.getElementById('closeButton');

    // 設置關閉按鈕的功能
    closeButton.addEventListener('click', function () {
        // 重新列出最新的行事曆清單
        countersForMember();
    });
}