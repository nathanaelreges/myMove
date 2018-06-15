_['pages/modal.js'] = function getModal () {
    const initMyMove = _['tools/myMove/init.js']
    const newEle = _['tools/myLib.js'].newEle
    const listenActions = _['tools/myLib.js'].listenActions

    const module = {}







    const thisPageEle = newEle(`<div class="modal_box page">  
        <style>
            .modal_box {
                will-change: opacity;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(0,0,0,0.6)
            }

                .modal {
                    display: inline-flex;
                    flex-direction: column;
                                        
                    box-shadow: 1px 2px 7px 0px rgba(0,0,0,0.7);
                    background-color: white;
                    border-radius: 5px;
                    max-width: 85%;
                
                    will-change: transform; 
                }
                
                    .modal_text {
                        pointer-events: none;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                        padding: 45px;

                        color: black;
                        font-size: 1.3rem;
                        font-weight: 300;
                        text-align: center;
                    }

                    .modal_butbox{
                        pointer-events: none;
                        display: flex;
                        justify-content: space-evenly;
                        padding-bottom: 9px;

                    }
                    
                        .modal_but {
                            pointer-events: auto;
                            background: mediumseagreen;
                            padding: 6px 20px;
                            flex-grow: 0;
                            color: white;
                            border-radius: 21px;
                        }

                    /**/

                /**/

            /**/
        </style>
        
        <div class="modal" data-action="jump">
            <div class="modal_text">Pull me down</div>
            
            <div class="modal_butbox">
                <div class="modal_but" data-action="close">OK</div>
                <div class="modal_but" data-action="close">Sair</div>
            </div>
        </div>
        
    </div>`)
    
    
    const modalEle = thisPageEle.querySelector('.modal')

    listenActions(thisPageEle, {
        close () {
            moveModule.switch()
        },
        jump () {
            moveModule.jump()
        }
    })






    const maxValue = window.innerHeight 

    const moveModule = initMyMove(renderMove, maxValue, modalEle, {adjustAcel: 3})
    
    moveModule.onEndMove = (position) => {
        if(position === 'max') {
            end()
        }
    }


    




    module.ele = thisPageEle

    return module




    
    function end () {
        thisPageEle.remove()
    }


    function renderMove (moveValue) { 
        const scaleValue = 1.5 - (moveValue/maxValue + 0.5)
        modalEle.style.transform = `scale(${scaleValue})`
        
        const opacityValue = 1 - moveValue/maxValue
        thisPageEle.style.opacity = opacityValue
    }


}