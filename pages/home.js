_['pages/home.js'] = function getHome () {
    const newEle = _['tools/myLib.js'].newEle
    const listenActions = _['tools/myLib.js'].listenActions

    const module = {}






    const thisPageEle = newEle(`<div class="home_box page">  
        <style>
            .home_box {
                
            }

            .footer {
                width:100%;
                position: fixed;
                bottom: 0;
                background: white;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                padding: 7px;
            }

                .footer_but {
                    background: mediumseagreen;
                    padding: 6px 10px;
                    flex-grow: 0;
                    color: white;
                    border-radius: 21px;
                }
                
            /**/
        
            </style>
        
        <div class="footer">
            <div class="footer_but" data-action="openPhoto">Open Photo</div>
            <div class="footer_but" data-action="openModal">Open Modal</div>
        </div>
        
    </div>`)

    listenActions(thisPageEle, {
        openPhoto () {
            module.onAddPage('photo')
        },
        openModal () {
            module.onAddPage('modal')    
        }
    })




    module.ele = thisPageEle

    module.onAddPage = () => {}


    return module






}