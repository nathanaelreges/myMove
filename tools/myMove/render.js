_['tools/myMove/render.js'] = function getRender ({highestValue, lowestValue, startValue, startAt}) {
    const module = {}

    let lastRawValue = undefined
    let lastValue = startValue
    let position = startAt



    module.move = function (rawValue) {
        if(!module.referenced){
            throw 'render not refered'
        }

        let moveValue = rawValue - lastRawValue
        let nowValue = lastValue + moveValue
               
        if(nowValue >= highestValue){
            nowValue = highestValue
            position = 'high'
        }
        else if(nowValue <= lowestValue){
            nowValue = lowestValue
            position = 'low'
        }
        else {
            position = 'mid'
        }

        lastValue = nowValue
        lastRawValue = rawValue
        
        return nowValue
    }


    module.refer = function (rawValue) {
        lastRawValue = rawValue
        module.referenced = true
    }

    module.looseRef = function () {
        lastRawValue = undefined
        module.referenced = false
    }

    module.referenced = false

    module.getPosition = function () { 
        return position
    }

    return module

}



//// trow(min, max) min vai ser o start e max vai min ou maz dependendo da direção do trow