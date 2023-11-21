function showLanguageMenu() {
    alert('选择语言');
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
    var inputElement = document.getElementById("myInput");
    var inputValue = inputElement.value;

    var data = {
        "messages":[
            {"role":"user","content":inputValue},
        ],
        "stream":false,
        "model":"gpt-3.5-turbo-16k",
        "temperature":0.5,
        "presence_penalty":0,
        "frequency_penalty":0,
        "top_p":1
    }

    function handleResponse(response) {
        var responseText = response.choices[0].message.content; // 将响应转换为字符串
        var outputElement = document.getElementById("myOutput");
        outputElement.textContent = responseText; // 将响应文本设置为文本控件的值
        console.log(response.choices[0].message.content);
        // 在这里处理响应数据
    }
    sendPostRequest(data, handleResponse);
}
