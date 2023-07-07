function notifyConfig(min) {
    return {
        body: `${min} 分已到，典獄長開始準備點名了喔！！！`,
        icon: 'https://i.imgur.com/cpyMH5w.png',
    }
}
function notify() {
    if(interval) {
        console.error('Interval exist!')
        return
    }

    check = [ox, bingo, rockPaperScissors].filter(el => el.checked == true)
    if (check.length === 0) {
        alert('請選擇任一小遊戲再啟動通知')
        return
    }

    interval = setInterval(function () {
        min = new Date().getMinutes()
        check = [ox, bingo, rockPaperScissors].filter(el => el.checked == true)
        if (check.length === 0) return
        if (![25, 29].includes(min)) return

        hour = new Date().getHours()
        item = check.find(el => setting[el.id].includes(hour % 12))

        if (!item) return
        new Notification('監獄廣播!', notifyConfig(min))

    }, 30 * 1000);
    console.log('Interval setup success!')
}

function start() {
    if (!('Notification' in window)) { console.log('This browser does not support notification'); }

    if (Notification.permission === 'default' || Notification.permission === 'undefined') {
        Notification.requestPermission(() => { notify() });
    }

    if (Notification.permission === 'granted') notify()
}

function reset() {
    ox.checked = false
    bingo.checked = false
    rockPaperScissors.checked = false
    clearInterval(interval)
    interval = undefined
    console.log('Interval clear success!')
}

var interval;
var setting = {
    'ox': [0, 3, 6, 9],
    'rockPaperScissors': [1, 4, 7, 10],
    'bingo': [2, 5, 8, 11]
}