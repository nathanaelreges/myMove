_['tools/myMove/init.js'] = function getMyMove (renderFun, opts = {}) {
    
    const initToss = _['tools/myMove/toss.js']
    const initRender = _['tools/myMove/render.js']

   
    const positiveMaxValue = opts.maxValue > 0
    const startAtMax = opts.startAt == 'max'
    
    
    const startValue = startAtMax? opts.maxValue: 0
    const highestValue = positiveMaxValue? opts.maxValue: 0;
    const lowestValue = positiveMaxValue? 0: opts.maxValue;
    let gluedTo = startAtMax? positiveMaxValue? 'high': 'low': positiveMaxValue? 'low': 'high'
    
    const module = {}
   


    const render = initRender({highestValue, lowestValue, startValue, startAt: gluedTo})

    const toss = initToss(opts.adjustAcel)

    toss.listeners = {
        move (rawValue) {
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








    module.userMove = function (rawValue) {
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
    }

    module.endMove = function () { 
        const position = render.getPosition()

        if(position == 'mid'){
            tossForMe()
        }
        else {
            end(position)
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
            module.listeners.endMove(positiveMaxValue? 'reachedMin': 'reachedMax')
            gluedTo = 'low'
        }
        else if(position == 'high'){
            module.listeners.endMove(positiveMaxValue? 'reachedMax': 'reachedMin')
            gluedTo = 'high'
        }

        resetModules()
    }

    
    function resetModules () {
        render.looseRef()
        toss.reset()
    }

}
