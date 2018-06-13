_['tools/myMoveListen.js'] = function initMyMoveListen (moveModule, eleToListen, classesToAvoid = []) {

    let pointerType = 'undefined'
    let syncEvents = 'startPhase'
    



    const listeners = {
        start (e) {
            if(syncEvents != 'startPhase') return
            

            if(classesToAvoid.length > 0) {
                const found = classesToAvoid.find(str => e.target.classList.contains(str))
                if(found != undefined) {
                    return
                }
            }
            


            syncEvents = 'endPhase'

            
            const touchY = pointerType == 'mouse'? e.clientY: e.touches[0].pageY
            moveModule.userMove(touchY)
        },
        move (e) {
            if(syncEvents != 'endPhase') return
            
            const touchY = pointerType == 'mouse'? e.clientY: e.touches[0].pageY
            moveModule.userMove(touchY)
        },
        end (e) {
            if(syncEvents != 'endPhase') return
            syncEvents = 'startPhase'
            
            moveModule.endMove()
        }
    }




    const handleEventListenersObj  = handleEventListeners(eleToListen, listeners)
    
    handleEventListenersObj.onPointerTypeDetected(x => {
        pointerType = x
    })






    function handleEventListeners (ele, {start, move, end}) {
        const module = {}
        let onPointerTypeDetected = undefined
    
        ele.addEventListener('mousedown', checkStart, {passive: true})
        ele.addEventListener('touchstart', checkStart, {passive: true})
    
        
        addTouchListeners()
        addMouseListeners()
        
        
        module.onPointerTypeDetected = x => onPointerTypeDetected = x
    
        return module
        
    
        function checkStart (e) {
            const pointerType = e.constructor.name === 'MouseEvent' ? 'mouse' : 'touch'
    
            onPointerTypeDetected(pointerType)
            
            if(pointerType == 'touch') {
                removeMouseListeners()
            } 
            else {
                removeTouchListeners()
                addMouseListenersPart2()
                ele.addEventListener('mousedown', addMouseListenersPart2, {passive: true})
            }
    
    
            ele.removeEventListener('mousedown', checkStart)
            ele.removeEventListener('touchstart', checkStart)
        }
        
    
        function addTouchListeners () {
            ele.addEventListener('touchstart' , start, {passive: true})
            ele.addEventListener('touchmove', move, {passive: true})
            ele.addEventListener('touchend', end, {passive: true})          
        }
        function removeTouchListeners () {
            ele.removeEventListener('touchstart' , start)
            ele.removeEventListener('touchmove', move)
            ele.removeEventListener('touchend', end)
            
        }
    
        function addMouseListeners () {
            ele.addEventListener('mousedown', start, {passive: true})
        }
        function removeMouseListeners () {
            ele.removeEventListener('mousedown', start)
        }
    
    
    
    
        function addMouseListenersPart2 () {
            document.body.addEventListener('mousemove', move, {passive: true})
            document.body.addEventListener('mouseup', mouseEnd, {passive: true})
            document.body.addEventListener('mouseleave', mouseEnd, {passive: true})
        }
    
        function removeMouseListenersPart2 () {
            document.body.removeEventListener('mousemove', move)
            document.body.removeEventListener('mouseup', mouseEnd)
            document.body.removeEventListener('mouseleave', mouseEnd)
        }
        
        function mouseEnd (e) {
            removeMouseListenersPart2()
            end(e)
        }
    }
}



