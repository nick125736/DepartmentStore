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
        switchContent('關於我們', '此系統包含會員及行事曆資訊！');
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
    console.log(counter);
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
    console.log(member);
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
            <button class='createBtn' onclick="add_counter()">新增行事曆</button>
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
    switchContent('行事曆簡易資料', html);
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
    switchContent('新增行事曆資料', html);

    const form = document.querySelector('#add-counter-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 取得表單（form）所填寫的資料
        const formData = new FormData(form);
        // console.log(formData);
        // 將表單的資料轉換成 json 格式
        const jsonData = form_data_to_json(formData);

        // 以 post 方式連線至伺服端新增資料
        axiosInstance.post('Counter', jsonData)
            .then(res => {
                window.alert('行事曆新增成功！');
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
            <button class='createBtn' onclick="add_member()">新增行事曆</button>
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
                            <button class='updateBtn' onClick="update_member(${item.cid})">修改</button>
                            <button class='deleteBtn' onClick="delete_member(${item.cid})">刪除</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    // 切換功能區域的內容
    switchContent('行事曆簡易資料', html);
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
    switchContent('新增行事曆資料', html);

    const form = document.querySelector('#add-member-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        // 取得表單（form）所填寫的資料
        const formData = new FormData(form);
        // 將表單的資料轉換成 json 格式
        const jsonData = form_data_to_json(formData);
        console.log(jsonData);
        // 以 post 方式連線至伺服端新增資料
        axiosInstance.post(`Member`, jsonData)
            .then(res => {
                window.alert('行事曆新增成功！');
                memberBrief();     // 重新列出最新的資料清單
            })
            .catch(err => {
                console.error(err);
            });
    });
}