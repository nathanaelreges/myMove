(function () {
    const getModalPage = _['pages/modal.js']
    const getPhotoPage = _['pages/photo.js']
    const getHomePage = _['pages/home.js']



    const homePage = getHomePage()

    document.body.appendChild(homePage.ele)



    

    homePage.onAddPage = (str) => {
        let page = undefined

        if(str == 'modal') {
            page = getModalPage()
        }
        else
        if(str == 'photo') {
            page = getPhotoPage()
        }

        document.body.appendChild(page.ele)
    }

   

})()