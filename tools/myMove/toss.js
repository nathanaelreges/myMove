_['tools/myMove/toss.js'] = function getToss (adjustAcel) { 
    const module = {}

    let endTossLoop = undefined
    let saveTime = undefined
    let saveVelo = undefined
    let saveValue = undefined
    let saveAcel = 0.001 * adjustAcel
    


    module.toss = (acelDir) => {
        let time = saveTime
        let value = saveValue
        let velo = saveVelo
        let acel = saveAcel * acelDir
        
        if(Date.now() - time > 200) {
            //If the user has stopped moving
            velo = 0
            time = Date.now()
        }
        
        tossIt(time, value, velo, acel)
    }

    module.reset = () => {
        clearMesure()

        if(!module.running) return

        module.running = false

        if(module.jumpToEndRunning) {
            module.jumpToEndRunning = false
        }

        endTossLoop()
        endTossLoop = undefined
        
    }

    module.running = false
    module.jumpToEndRunning = false



    module.mesure = (value) => {
        const firstTimeMesure = saveValue === undefined
        
        const nowTime = Date.now()
        const nowValue = value
        let nowVelo = firstTimeMesure? 0 : (nowValue - saveValue) / (nowTime - saveTime)
    
        saveTime = nowTime 
        saveValue = nowValue        
        saveVelo = nowVelo         
    }
    
    


    module.tossDifferent = (wich, from, to) => {
        let tossTo = undefined
        if(wich == 'jumpToMiddle') {
            tossTo = 'tomiddle'
        }
        else
        if(wich == 'jumpToEnd') {
            tossTo = 'toend' 
            module.jumpToEndRunning = true
        }


        const {value, velo, acel} = calculateToss(tossTo, from, to)
        const time = Date.now()
        requestAnimationFrame(()=>{
            tossIt(time, value, velo, acel)
        })
    }


    return module


    function clearMesure () {
        saveTime = saveVelo = saveValue = undefined
    }

    function calculateToss (str, from, to) {
        const value = from
        let acel = saveAcel
        let velo = undefined
        

        //First calculate as it was a positive toss, from a smaller value to a bigger value

        //On a positive toss the acel needs to be negative
        acel *= -1 
        
        //On a positive toss the delta value needs to be positive
        deltaValue = from > to? from - to: to - from
        

        if(str == 'tomiddle') {
            deltaValue = deltaValue / 3
            //velo = - 2 * acel * deltaValue
            //velo = Math.sqrt(-2*acel*deltaValue)


            velo = 2*deltaValue/230
            acel = -1*velo/230
        }
        else
        if(str == 'toend') {
            /*
            velo = 2*deltaValue/230
            acel = -1*velo/230
            */

            velo = (deltaValue/150) - (acel*150/2) 
        }
        
        //Now we convert tha acel and velo to represent the real direction that the object is going
        acel = Math.abs(acel)
        velo = Math.abs(velo)
        
        if(from > to) {
            velo *= -1
        }
        else{
            acel *= -1  
        }

        return {value, velo, acel}
    }

    function tossIt (time, value, velo, acel) {
        endTossLoop = toss(time, value, velo, acel)
        module.running = true
        clearMesure()
    }
    



    function toss (time, value, velo, acel) { 
        let endToss = false
        
        requestAnimationFrame(()=>{
            _toss(time, value, velo, acel)
        })
        
        return ()=> endToss = true


        function _toss (time, value, velo, acel) { 
            if(endToss) return

            const nowTime = Date.now()
            const deltaTime = nowTime - time
            const newValue = value + velo * deltaTime + (acel * deltaTime * deltaTime) / 2
            
            module.listeners.move(newValue)
            requestAnimationFrame(()=>{
                _toss(time, value, velo, acel)
            })
            
        }                        
    }
}
