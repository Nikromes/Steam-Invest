let investmentList = document.querySelector('.card-list-wrapper')
let inputForm = document.querySelector('.db-add-form')
let addLinkButton = document.querySelector('.db-add-form__add-link')
let investmentsAddButton = document.querySelector('.header-buttons__add')
let modalWindow = document.querySelector('.modal-window-wrapper')
let addInvestmentImageInput = document.querySelector('.db-add-form__image-input')
let addInvestmentImageButton = document.querySelector('.image-input__button')
let investmentsRemoveButton = document.querySelector('.header-buttons__remove')
let loginTitle = document.getElementById('login')
let logoutTitle = document.getElementById('logout')
let modalLogin = document.querySelector('.modal-login-wrapper')
let modalRegistrationLink = document.querySelector('.modal-login__form__registration')
let modalLoginLink = document.querySelector('.modal-registration__form__registration')
let modalRegistration = document.querySelector('.modal-registration-wrapper')
let registrationForm = document.querySelector('.modal-registration__form')
let loginForm = document.querySelector('.modal-login__form')
let headerButtons = document.querySelector('.header-buttons')
const adminItems = document.querySelectorAll('.admin')

modalRegistrationLink.addEventListener('click', () => {
    modalLogin.classList.remove('modal-window--active')
    window.removeEventListener('click', windowHandler)

    modalRegistration.classList.add('modal-window--active')
    window.addEventListener('click', windowHandler)
})

modalLoginLink.addEventListener('click', () => {
    modalRegistration.classList.remove('modal-window--active')
    window.removeEventListener('click', windowHandler)

    modalLogin.classList.add('modal-window--active')
    window.addEventListener('click', windowHandler)
})

loginTitle.addEventListener('click', () => {
    modalLogin.classList.add('modal-window--active')
    window.addEventListener('click', windowHandler)
})

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin
            // console.log(user.admin)
            if (user.admin) {
                adminItems.forEach(item => {
                    item.style.display = 'flex'
                })
            }
        })

        let logoutMessage = document.querySelectorAll('.logout-message-wrapper')
        if (logoutMessage.length) {
            logoutMessage[0].style.display = 'none'
        }

        logoutTitle.style.display = 'block'
        loginTitle.style.display = 'none'

        console.log('user logged in: ', user.email)

        //real-time listener
        //db.collection('').orderBy('date', 'desc')
        db.collection('investments').orderBy('publicationDate').onSnapshot(snapshot => {
            let changes = snapshot.docChanges()
            changes.forEach(change => {
                if (change.type === 'added') {
                    renderInvesment(change.doc)
                } else if (change.type === 'removed') {
                    let li = investmentList.querySelector(`[data-id="${change.doc.id}"]`)
                    investmentList.removeChild(li)
                }
            })
        })
    } else {
        logoutTitle.style.display = 'none'
        loginTitle.style.display = 'block'
        let logoutMessage = `
            <div class="logout-message-wrapper">
                <span class="logout-message">Войдите в аккаунт, что бы увидеть информацию</span>
            </div>
        `
        investmentList.insertAdjacentHTML('afterBegin', logoutMessage);
    }
})

// login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = loginForm.mail.value
    const password = loginForm.pass.value
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset()
        modalLogin.classList.remove('modal-window--active')
        window.removeEventListener('click', windowHandler)
    })
})

// logout
async function logout() {
    await auth.signOut()
    location.reload()
}
logoutTitle.addEventListener('click', logout)

// sign up the user
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = registrationForm.mail.value
    const password = registrationForm.pass.value
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user)
        registrationForm.reset()
        modalRegistration.classList.remove('modal-window--active')
        window.removeEventListener('click', windowHandler)
    })
})

addLinkButton.addEventListener('click', () => {
    let linkInputBlock = inputLinkHtml()
    let linksWrapper = inputForm.querySelector('.db-add-form__add-links-wrapper')
    linksWrapper.insertAdjacentHTML('afterend', linkInputBlock)

    let removeLinkButton = document.querySelector('.new-link-button')
    removeLinkButton.addEventListener('click', () => {
        let linkBlock = removeLinkButton.parentElement
        linkBlock.parentElement.removeChild(linkBlock)
    })

})
function windowHandler(e) {
    // console.log('windowHandler активирован')
    if (e.target.classList.contains('modal-window--active')) {
        e.target.classList.remove('modal-window--active')
        window.removeEventListener('click', windowHandler)
    }
}

investmentsAddButton.addEventListener('click', () => {
    modalWindow.classList.add('modal-window--active')
    window.addEventListener('click', windowHandler)
})

addInvestmentImageInput.addEventListener('change', () => {
    if (addInvestmentImageInput.files[0]) {
        let imageFileName = addInvestmentImageInput.files[0].name

        if (imageFileName.length < 20) {
            addInvestmentImageButton.innerText = imageFileName
        } else {
            imageFileName = imageFileName.slice(0, 20) + '...'
            addInvestmentImageButton.innerText = imageFileName
        }
    }
})

investmentsRemoveButton.addEventListener('click', () => {
    let removeButtons = document.querySelectorAll('.item-right__close-btn')
    removeButtons.forEach(item => {
        if (!item.innerText) {
            item.classList.toggle('close-btn--active')
        } else {
            item.classList.toggle('close-btn--active')
        }
    })
})

function renderInvesment(doc) {
    let title = doc.data().title
    let description = doc.data().description
    let rating = doc.data().rating
    let durability = doc.data().durability
    let target = doc.data().target
    let image = doc.data().image
    let publicationDate = doc.data().publicationDate
    let itemsLinks = doc.data().links

    let linksString = ''
    function addLinks(linksObject) {
        if (linksObject) {
            for (let key in linksObject) {
                linksString += `<a class="links__item" href="${linksObject[key]}" target='_blank'>${key}</a>`
            }
        }
    }
    addLinks(itemsLinks)

    let block = cardHtml(doc.id, image, rating, durability, target, publicationDate, title, description, linksString)
    investmentList.insertAdjacentHTML('afterBegin', block);

    //deleting data from firestore
    let removeBtn = document.querySelector(`[data-id="${doc.id}"] .item-right__close-btn`)
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation()

        let id, imageSrc
        if (e.target.parentElement.parentElement.getAttribute('data-id')) {
            id = e.target.parentElement.parentElement.getAttribute('data-id')
            imageSrc = e.target.parentElement.parentElement.querySelector('img').src
        } else if (e.target.parentElement.parentElement.parentElement.getAttribute('data-id')) {
            id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id')
            imageSrc = e.target.parentElement.parentElement.parentElement.querySelector('img').src
        } else {
            id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id')
            imageSrc = e.target.parentElement.parentElement.parentElement.parentElement.querySelector('img').src
        }
        db.collection('investments').doc(id).delete()

        //deleting from storage
        if (imageSrc !== hiddenCaseImage) {
            let thisRef = storage.refFromURL(`${imageSrc}`)
            thisRef.delete(thisRef.name)
        }
    })

    // let favoriteStar = document.querySelector('.item__favorite-star')
    // favoriteStar.addEventListener('click', () => {
    //     favoriteStar.classList.toggle('item__favorite-star--active')
    // })
}

// saving data
async function savingData(e) {
    e.preventDefault()

    let linkspermission = true
    let allLinkInputs = inputForm.querySelectorAll('.link-input')
    allLinkInputs.forEach((input) => {
        if (!input.value) {
            linkspermission = false
            input.classList.add('wrong-input')
        } else {
            input.classList.remove('wrong-input')
        }
    })

    if (inputForm.title.value && inputForm.description.value && linkspermission) {
        inputForm.title.classList.remove('wrong-input')
        inputForm.description.classList.remove('wrong-input')

        if (!inputForm.rating.value) {
            inputForm.rating.value = '-'
        }
        if (!inputForm.durability.value) {
            inputForm.durability.value = '-'
        }
        if (!inputForm.target.value) {
            inputForm.target.value = '-'
        }

        let itemsLinks = {}
        let linksTitle = inputForm.querySelectorAll('.db-add-form__link-input-name')
        let linksUrl = inputForm.querySelectorAll('.db-add-form__link-input-url')

        if (linksTitle.length !== 0) {
            for (let i = 0; i < linksTitle.length; i++) {
                itemsLinks[linksTitle[i].value] = linksUrl[i].value
            }
        }

        let image = inputForm.image.files[0]
        let url
        if (image) {
            let date = Date.now()
            let thisRef = storageRefInvestments.child(`${date}`)
            await thisRef.put(image)
            url = await storageRefInvestments.child(`${date}`).getDownloadURL()

        } else {
            url = hiddenCaseImage
        }

        db.collection('investments').add({
            title: inputForm.title.value,
            description: inputForm.description.value,
            rating: inputForm.rating.value,
            durability: inputForm.durability.value,
            target: inputForm.target.value,
            image: url,
            links: itemsLinks,
            publicationDate: new Date().toLocaleDateString('ru', { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        })

        modalWindow.classList.remove('modal-window--active')
        window.removeEventListener('click', windowHandler)

        inputForm.reset()
        addInvestmentImageButton.innerText = 'Картинка'
    } else {
        if (!inputForm.title.value) {
            inputForm.title.classList.add('wrong-input')
        } else {
            inputForm.title.classList.remove('wrong-input')
        }
        if (!inputForm.description.value) {
            inputForm.description.classList.add('wrong-input')
        } else {
            inputForm.description.classList.remove('wrong-input')
        }
    }
}

inputForm.addEventListener('submit', savingData)

let roleManagementButton = document.getElementById('role-management')
let modalRoleWrapper = document.querySelector('.modal-role-wrapper')
roleManagementButton.addEventListener('click', () => {
    modalRoleWrapper.classList.add('modal-window--active')
    window.addEventListener('click', windowHandler)
})

// add admin cloud functions
const modalRole = document.querySelector('.modal-role__form')
modalRole['admin-role'].addEventListener('click', (e) => {
    e.preventDefault()
    const modalRoleMail = modalRole.mail.value
    const addNewRole = functions.httpsCallable('addAdminRole')
    addNewRole({ email: modalRoleMail }).then(res => {
        console.log(res)
    })
})
modalRole['elite-role'].addEventListener('click', (e) => {
    e.preventDefault()
    const modalRoleMail = modalRole.mail.value
    const addNewRole = functions.httpsCallable('addEliteRole')
    addNewRole({ email: modalRoleMail }).then(res => {
        console.log(res)
    })
})