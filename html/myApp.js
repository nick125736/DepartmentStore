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