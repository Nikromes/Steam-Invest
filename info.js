// Ссылка на картинку, которая ставится, если своя картинка не указана при добавлении новой карточки
const hiddenCaseImage = 'https://firebasestorage.googleapis.com/v0/b/fir-project-e6880.appspot.com/o/projectImages%2Fhiden-case.png?alt=media&token=1ca21dd2-b7a1-4152-953b-3a542387f0bb'

// html карточки
const cardHtml = (id, image, rating, durability, target, publicationDate, title, description, linksString) => {
    return `<li class="card-list__item" data-id="${id}">
        <!--    <div class="item__favorite-star">
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.9229 1.84439L20.4893 9.53635C20.8275 10.55 21.7726 11.2366 22.8411 11.245L30.9497 11.3089C32.3907 11.3203 32.9882 13.1592 31.8291 14.0154L25.3066 18.8332C24.4471 19.468 24.0862 20.579 24.4083 21.5979L26.8533 29.3293C27.2878 30.7033 25.7235 31.8398 24.551 31.002L17.9535 26.2876C17.0841 25.6663 15.9159 25.6663 15.0465 26.2876L8.449 31.002C7.27651 31.8398 5.71221 30.7033 6.14672 29.3293L8.59166 21.5979C8.91385 20.579 8.55287 19.468 7.69335 18.8332L1.17093 14.0154C0.0117784 13.1592 0.609285 11.3203 2.05033 11.3089L10.1589 11.245C11.2274 11.2366 12.1725 10.55 12.5107 9.53635L15.0771 1.84439C15.5332 0.477386 17.4668 0.477386 17.9229 1.84439Z"
                            fill="#272C3B" stroke="#A4A4A4" />
                    </svg>
                </div> -->
                <div class="card-list__item-left">
                    <div class="item__img">
                        <img class="item__img-img" src="${image}" alt="item image">
                    </div>  
                <!--    <div class="item__time-to-end">
                        178/180 <div>дней</div>
                    </div> -->
                </div>
                <div class="card-list__item-right">
                    <div class="item-right__content">
                        <div class="item-right__parameters">
                            <div class="item-right__parameters-stats">
                                <div class="parameters-stats__item parameters-stats__rating">${rating}</div>
                                <div class="parameters-stats__item parameters-stats__time">${durability}</div>
                                <div class="parameters-stats__item parameters-stats__profit">${target}</div>
                            </div>
                            <div class="item-right__parameters-date">${publicationDate}</div>
                        </div>
                        <div class="item-right__text">
                            <div class="content__title">${title}</div>
                            <div class="content__text">${description}</div>
                        </div>
                        <div class="item-right__links">
                            ${linksString}
                        </div>
                    <!--<div class="item-right__images">  
                            <div class="images__item">
                                <img src="./images/screen-1.jpg" alt="image">
                            </div>
                            <div class="images__item">
                                <img src="./images/screen-2.jpg" alt="image">
                            </div>
                        </div> -->
                    </div>
                    <div class="item-right__close-btn">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10.9287" y="7.07111" width="25" height="5" rx="2.5" transform="rotate(45 10.9287 7.07111)" fill="#C4C4C4"/>
                        <rect x="28.6064" y="10.6066" width="25" height="5" rx="2.5" transform="rotate(135 28.6064 10.6066)" fill="#C4C4C4"/>
                        </svg>
                    </div>
                </div>
            </li>`
}

// html при нажатии добавлении новой ссылки в форму
const inputLinkHtml = () => {
    return `<div class="new-link-wrapper">
                <div class="new-link-inputs">
                    <input class="db-add-form__link-input-name add-input link-input" name="linkName" type="text" placeholder="Название">
                    <input class="db-add-form__link-input-url add-input link-input" name="linkUrl" type="text" placeholder="Ссылка">
                </div>
                <div class="new-link-button buttons">x</div>
            </div>`
}