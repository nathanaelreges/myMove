_['tools/myMove/init.js'] = function getMyMove (renderFun, opts = {}) {
    
    const initToss = _['tools/myMove/toss.js']
    const initRender = _['tools/myMove/render.js']
    const initUserMove = _['tools/myMove/userMove.js']

   
    const positiveMaxValue = opts.maxValue > 0
    
    
    const startValue = 0
    const highestValue = positiveMaxValue? opts.maxValue: 0;
    const lowestValue = positiveMaxValue? 0: opts.maxValue;
    let gluedTo = positiveMaxValue? 'low': 'high'
    let moving = false
    
    const module = {}
   


    const render = initRender({highestValue, lowestValue, startValue, startAt: gluedTo})

    const toss = initToss(opts.adjustAcel)

    toss.listeners = {
        move (rawValue) {
            if(!moving){
                moving = true
                module.onStartMove()
            }

            if(!render.referenced) {
                render.refer(rawValue)    
                return
            }

            const renderedValue = render.move(rawValue)
            renderFun(renderedValue)
            
            const position = render.getPosition()        
            if(position != 'mid'){
                end(position)
            }
        }
    }





    const userMove = initUserMove(opts.eleToListen)

    userMove.listeners = {
        userMove (rawValue) {
            if(!moving){
                moving = true
                module.onStartMove()
            }
            
            if(toss.runing) {
                resetModules()
            }
    
            if(!render.referenced) {
                render.refer(rawValue)    
            }
            else {
                const renderedValue = render.move(rawValue)
                renderFun(renderedValue)
            }
    
            toss.mesure(rawValue)
        },
        endMove () { 
            const position = render.getPosition()

            if(position == 'mid'){
                tossForMe()
            }
            else {
                end(position)
            }
        }
    }





    module.cancelMove = function () {
       resetModules()        
    }


    module.jump = function () {
        especialToss('jump')
    }

    module.switch = function () {
        especialToss('switch')
    }

    module.onStartMove = () => {}

    module.onEndMove = () => {}


    return module








    function especialToss (wich) {
        if(toss.runing){return}
        
        const position = render.getPosition()
        
        if(position == 'mid'){
            tossForMe()
        }
        else {
            resetModules()
            const {from, to} = gluedTo == 'low'? {from: lowestValue, to: highestValue} : {from: highestValue, to: lowestValue}
            
            toss.tossDifferent(wich, from, to)
        }
    }



    function tossForMe () {
        if(toss.runing){return}

        const acelDir = gluedTo == 'low'? -1: 1
        toss.toss(acelDir)
    }



    function end (position) {
        if(position == 'low'){
            module.onEndMove(positiveMaxValue? 'zero': 'max')
            moving = false
            gluedTo = 'low'
        }
        else if(position == 'high'){
            module.onEndMove(positiveMaxValue? 'max': 'zero')
            moving = false
            gluedTo = 'high'
        }

        resetModules()
    }

    
    function resetModules () {
        render.looseRef()
        toss.reset()
    }

}
