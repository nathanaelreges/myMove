_['pages/photo.js'] = function getPhoto () {
    const initMyMove = _['tools/myMove/init.js']
    const initMyMoveListen = _['tools/myMoveListen.js']
    const newEle = _['tools/myLib.js'].newEle

    const module = {}




    const thisPageEle = newEle(`<div class="photo_box page">  
        
        <style>
            .photo_box {
                //background: rgba(0,0,0,0.4)
            }

            .photo {
                height: 100%;
                width: 100%;
                will-change: transform;
                border: 3px solid #556;
                background-color:#556;
                background-image: linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
                linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
                linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
                linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
                linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a), 
                linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a);
                background-size:80px 140px;
                background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
            }
        </style>
        <div class="photo">
        <div>
        
    </div>`)
    
    const photoEle = thisPageEle.querySelector('.photo')









    const maxValue = window.innerHeight

    const moveModule = initMyMove(renderMove, {maxValue, eleToListen: thisPageEle, adjustAcel: 2})
    
    moveModule.onEndMove = (position) => {
        if(position === 'zero') {
            end()
        }
    }
    

    renderMove(0)


    moveModule.switch()

    module.ele = thisPageEle

    return module









    function end () {
        thisPageEle.remove()

    }


    function renderMove (moveValue) {
        moveValue -= maxValue
        photoEle.style.transform = `translateY(${moveValue}px)`
    }




}