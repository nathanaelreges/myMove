_['tools/myMove/listen.js'] = function initListen (eleToListen, moveStartEvent) {

    const module = {}
    let pointerType = 'undefined'
    let syncEvents = 'startPhase'
    



    const listeners = {
        start (e) {
            if(syncEvents != 'startPhase') return            
            syncEvents = 'endPhase'
            
            const touchY = pointerType == 'mouse'? e.clientY: e.touches[0].pageY
            module.listeners.touchStart(touchY)
        },
        move (e) {
            if(syncEvents != 'endPhase') return
            
            const touchY = pointerType == 'mouse'? e.clientY: e.touches[0].pageY
            module.listeners.touchMove(touchY)
        },
        end () {
            if(syncEvents != 'endPhase') return
            syncEvents = 'startPhase'

            module.listeners.touchEnd()
        }
    }




    const handleEventListenersObj  = handleEventListeners(eleToListen, listeners, moveStartEvent)
    
    handleEventListenersObj.onPointerTypeDetected(x => {
        pointerType = x
    })


    module.skipThisTouch = () => {
        syncEvents = 'startPhase'
    }
    
    module.moveStartEvent = (event) => {
        handleEventListenersObj.externalStartEvent(event)
    }

    module.listening = true

    return module








    function handleEventListeners (ele, {start, move, end}) {
        const module = {}
        let onPointerTypeDetected = undefined
        let pointerType = undefined
        let externalStartEvent = undefined
    
        
        setCheckStartListeners(true)
        setTouchListeners(true)
        

        module.onPointerTypeDetected = x => onPointerTypeDetected = x
        
        module.externalStartEvent = event => {
            externalStartEvent = event
            checkStart(externalStartEvent)
        }

        return module
        
    
        function checkStart (e) {
            pointerType = e.constructor.name === 'MouseEvent' ? 'mouse' : 'touch'
            
            onPointerTypeDetected(pointerType)
            
            if(pointerType == 'mouse') {
                start(e)
                setTouchListeners(false)
                setMouseListenersPart1(true)
                setMouseListenersPart2(true)
            }
            else {
                if(externalStartEvent) {
                    start(externalStartEvent)
                }
            }
            
            setCheckStartListeners(false)
        }
        
        
        function setCheckStartListeners (state) {
            if(state) {
                ele.addEventListener('mousedown', checkStart, {passive: true})
                ele.addEventListener('touchstart', checkStart, {passive: true})
            }
            else {
                ele.removeEventListener('mousedown', checkStart)
                ele.removeEventListener('touchstart', checkStart)
            }
        }
        
        
        
        function setTouchListeners (state) {
            if(state) {
                ele.addEventListener('touchstart' , start, {passive: true})
                ele.addEventListener('touchmove', move, {passive: true})
                ele.addEventListener('touchend', end, {passive: true})          
            }
            else {
                ele.removeEventListener('touchstart' , start)
                ele.removeEventListener('touchmove', move)
                ele.removeEventListener('touchend', end)    
            }
        }
        

    
        function setMouseListenersPart1 (state) {
            if(state){
                ele.addEventListener('mousedown', mouseStart, {passive: true})    
            }
            else {
                ele.removeEventListener('mousedown', mouseStart)
            }
        }

        function setMouseListenersPart2 (state) {
            if(state){
                document.body.addEventListener('mousemove', move, {passive: true})
                document.body.addEventListener('mouseup', mouseEnd, {passive: true})
                document.body.addEventListener('mouseleave', mouseEnd, {passive: true})
            }
            else {
                document.body.removeEventListener('mousemove', move)
                document.body.removeEventListener('mouseup', mouseEnd)
                document.body.removeEventListener('mouseleave', mouseEnd)
            }
        }

        
        function mouseStart (e) {
            setMouseListenersPart2(true)
            start(e)
        }
        function mouseEnd (e) {
            setMouseListenersPart2(false)
            end(e)
        }
    }
}

/*

function addMouseListenersPart3 () {
    document.body.addEventListener('mousemove', move, {passive: true})
    document.body.addEventListener('mouseup', mouseEnd, {passive: true})
    document.body.addEventListener('mouseleave', mouseEnd, {passive: true})

}

function removeMouseListenersPart2 () {
    document.body.removeEventListener('mousemove', move)
    document.body.removeEventListener('mouseup', mouseEnd)
    document.body.removeEventListener('mouseleave', mouseEnd)
}
*/