document.addEventListener("DOMContentLoaded", function () {

    // 页面加载成功后读取数据
    fetch("/api/getSettings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.data) {
                const settings = JSON.parse(data.data);
                document.getElementById("startTime").value = settings.startTime || "";
                document.getElementById("endTime").value = settings.endTime || "";
                document.getElementById("minPlaytime").value = settings.minPlaytime || "";
                document.getElementById("maxPlaytime").value = settings.maxPlaytime || "";
                document.getElementById("minInterval").value = settings.minInterval || "";
                document.getElementById("maxInterval").value = settings.maxInterval || "";
            }
        })
        .catch(error => {
            alert(error)
        });

    // 提交保存数据
    document
        .querySelector(".submit")
        .addEventListener("click", function (e) {
            e.preventDefault();

            const requestData = {
                // 播放时间段开始时间
                startTime: document.getElementById("startTime").value,
                // 播放时间段结束时间
                endTime: document.getElementById("endTime").value,
                // 最小播放时间
                minPlaytime: document.getElementById("minPlaytime").value,
                // 最大播放时间
                maxPlaytime: document.getElementById("maxPlaytime").value,
                // 播放间隔
                minInterval: document.getElementById("minInterval").value,
                maxInterval: document.getElementById("maxInterval").value,
            }

            fetch("/api/playSetting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message)
                })
                .catch((error) => {
                    alert(error)
                });
        });
});