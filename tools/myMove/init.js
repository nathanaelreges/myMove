_['tools/myMove/init.js'] = function getMyMove (renderFun, maxValue, eleToListen, opts = {}) {
    
    const initToss = _['tools/myMove/toss.js']
    const initRender = _['tools/myMove/render.js']
    const initListen = _['tools/myMove/listen.js']
    
    const module = {}
   
    
    opts.adjustAcel = opts.adjustAcel == undefined ? 1: opts.adjustAcel

    const positiveMaxValue = maxValue > 0
    const highestValue = positiveMaxValue? maxValue: 0;
    const lowestValue = positiveMaxValue? 0: maxValue;
    let gluedTo = positiveMaxValue? 'low': 'high'
    let moveRunning = false

   




    const render = initRender({highestValue, lowestValue, startValue: 0, startAt: gluedTo})




    const listen = initListen(eleToListen)

    listen.listeners = {
        touchStart (rawValue) {
            
            if(toss.running) {
                if(toss.jumpToEndRunning) {
                    listen.skipThisTouch()
                    return
                }
                else{
                    toss.reset()
                    render.looseRef()
                }
            }

            render.refer(rawValue)
            toss.mesure(rawValue)
            
            if(!moveRunning){
                moveRunning = true
                module.onStartMove()
            }
        },
        touchMove (rawValue) {        
            const renderedValue = render.move(rawValue)
            renderFun(renderedValue)
    
            toss.mesure(rawValue)
        },
        touchEnd () { 
            const position = render.getPosition()

            if(position == 'mid'){
                tossForMe()
            }
            else {
                end(position)
            }
        }
    }
 
    

    
    const toss = initToss(opts.adjustAcel)

    toss.listeners = {
        move (rawValue) {
            const renderedValue = render.move(rawValue)
            renderFun(renderedValue)

            const position = render.getPosition()        
            if(position != 'mid'){
                end(position)
            }
        }
    }   


    




    module.cancelMove = function () {
        resetModules()
        moveRunning = false
    }


    module.jump = function () {
        const position = render.getPosition()        
        if(position != gluedTo) {return}
    
        const {from, to} = gluedTo == 'low'? {from: lowestValue, to: highestValue} : {from: highestValue, to: lowestValue}
        
        toss.reset()
        render.looseRef()
        render.refer(from) 

        if(!moveRunning){
            moveRunning = true
            module.onStartMove()    
        }            
        
        toss.tossDifferent('jumpToMiddle', from, to)

    }


    module.switch = function () {
        resetModules()
    
        const {from, to} = gluedTo == 'low'? {from: lowestValue, to: highestValue} : {from: highestValue, to: lowestValue}

        render.refer(from) 

        if(!moveRunning) {          
            moveRunning = true
            module.onStartMove()
        }

        toss.tossDifferent('jumpToEnd', from, to)
    }

    module.moveAlreadyStarted = ({startEvent}) => {
        listen.moveStartEvent(startEvent)
    }

    module.onStartMove = () => {}

    module.onEndMove = () => {}


    return module







    function tossForMe () {
        if(toss.running){return}

        const acelDir = gluedTo == 'low'? -1: 1
        toss.toss(acelDir)
    }



    function end (position) {
        toss.reset()
        render.looseRef()

        if(position == 'low'){
            moveRunning = false
            gluedTo = 'low'
            module.onEndMove(positiveMaxValue? 'zero': 'max')
        }
        else if(position == 'high'){
            moveRunning = false
            gluedTo = 'high'
            module.onEndMove(positiveMaxValue? 'max': 'zero')
        }


    }

    
    function resetModules () {
        listen.skipThisTouch()

        if(toss.running) {
            toss.reset()
        }
        
        if(render.referenced) {
            render.looseRef()
        }
    }

}


