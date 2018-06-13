_['tools/myLib.js'] = {
    
    newEle: function (html) {
        var div = document.createElement('div')
        div.innerHTML = html
        return div.firstElementChild
    },

    listenActions (ele, actions) {
        ele.addEventListener('click', (e)=>{
            const act = e.target.dataset.action
            if(typeof actions[act] == 'function') {
                actions[act]()
                e.stopPropagation()
            }
            
        })
    }
}


