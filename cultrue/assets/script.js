/*const data = {
    "messages":[],
    "stream":false,
    "model":"gpt-3.5-turbo-16k",
    "temperature":0.5,
    "presence_penalty":0,
    "frequency_penalty":0,
    "top_p":1
}*/

const data = {
    "model":"gpt-4",
    "stream":false,
    "frequency_penalty":0,
    "presence_penalty":0,
    "temperature":0.6,
    "top_p":1,
    "messages":[],
}

function getRes() {
    fetch('http://localhost:8080/api?userXq=千佛山校区&userFj=502043&payType=2')
        .then(res => res.json())
        .then(result => console.log(result))
}

function showLanguageMenu() {
    alert('选择语言');
}

function showSidebar() {
    document.getElementById('sidebar').className += ' show-menu'
}

function hideSidebar() {
    document.getElementById('sidebar').className = 'menu-nav'
}

function sendPostRequest(data, callback) {
    fetch("https://ib-private-git-allstarproductions-gpt-50365e-allstarproductions.vercel.app/api/openai/v1/chat/completions", {
        /*"https://chat6.dingsm.top/api/openai/v1/chat/completions"*/
        method: "POST",
        headers: {
            /*"Authorization": "Bearer nk-ABC123456",
            "X-Openai-End-Point": "https://api.chatnio.net/v1",
            "X-Openai-Api-Key": "sk-af53adfeee6ebf5ce10a5902c8216d6d79e3ce727dac4f5b9ec6fc0d20c20af4",
            "Cookie": "LOBE_LOCALE=zh-CN; LOBE_THEME_PRIMARY_COLOR=undefined; LOBE_THEME_NEUTRAL_COLOR=undefined",*/
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("HTTP error " + response.status);
        })
        .then(function (responseData) {
            callback(responseData);
        })
        .catch(function (error) {
            console.log(error);
            errorTip('请检查网络连接')
        });
}

function submit(){
    const inputElement = document.getElementById("myInput");
    const inputValue = inputElement.value;
    const chatDisplay = document.querySelector('.chat-display');
    const newMessage = document.createElement('div');
    const content = document.createElement('div');

    if (data.messages.length >= 40) {
        alert('开发者要求不得超过20条问题，现在已经清除对话，请重新开始！');
        console.log('开发者要求不得超过20条问题，现在已经清除对话，请重新开始！')
        inputElement.value = '';
        data.messages.splice(0,data.messages.length);
        chatDisplay.innerHTML = '';
        return;
    }
    newMessage.classList.add('new_message');
    newMessage.style.alignSelf = 'flex-end';
    content.classList.add('content');
    content.classList.add('right-chat');
    content.innerHTML = inputValue;
    chatDisplay.appendChild(newMessage);
    newMessage.appendChild(content);
    data.messages.push({"role":"user","content":inputValue})

    function handleResponse(response) {
        const responseText = response.choices[0].message.content; // 将响应转换为字符串
        const replyMessage = document.createElement('div');
        const replyContent = document.createElement('div');
        replyMessage.classList.add('new_message');
        replyContent.classList.add('content');
        replyContent.classList.add('left-chat');
        replyContent.innerHTML = responseText;
        chatDisplay.appendChild(replyMessage);
        replyMessage.appendChild(replyContent);
        data.messages.push({"role":"assistant","content":responseText})
        console.log(responseText);
        // 在这里处理响应数据
    }
    sendPostRequest(data, handleResponse);
    inputElement.value = '';
}

let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let handleDarkModeChange = (e) => {
    if (e.matches) {
        // 系统处于暗黑模式，给 html 添加 "dark" 类
        document.documentElement.classList.add('dark');
    } else {
        // 系统不处于暗黑模式，移除 html 的 "dark" 类
        document.documentElement.classList.remove('dark');
    }
};
darkModeMediaQuery.addListener(handleDarkModeChange);
handleDarkModeChange(darkModeMediaQuery);