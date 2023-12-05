const cors = require("cors")
const express = require('express')
const app = express();
app.use(cors())

const data = {
    "messages":[],
    "stream":false,
    "model":"gpt-3.5-turbo-16k",
    "temperature":0.5,
    "presence_penalty":0,
    "frequency_penalty":0,
    "top_p":1
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

function showChatUI() {
    let window_bg = document.getElementsByClassName("chat-bg")[0]
    window_bg.style.display = "block";
}

function dismissChatUI() {
    let window_bg = document.getElementsByClassName("chat-bg")[0]
    window_bg.style.display = "none";
}

function sendPostRequest(data, callback) {
    fetch("https://chatai.dingsm.top/api/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer nk-ABC123456"
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
