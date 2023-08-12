import {
    PLACEHOLDER_NAME, PLACEHOLDER_COMMENT,
    PLACEHOLDER_NAME__ERROR, PLACEHOLDER_COMMENT__ERROR,
    inputName, inputComment, button, formText, buttonRemove,
    comments, arrayValue
} from "./vars.js";
import formatTime from "./renderTime.js";
import renderComments from "./renderComments.js";
import {fetchPromise} from "./api.js";

export {initEventListener, addCommentListener};

let commentsObject;
let CommentPreview = document.createElement('div');
CommentPreview.textContent = 'Комментарии загружаются';
comments.appendChild(CommentPreview)

// const fetchPromise = fetch(
//     "https://wedev-api.sky.pro/api/v1/:Alex-grishchenko_hw7/comments",
//     {
//         method: "GET",
//     }
// ).then((response) => {
//     if (response.status === 500) {
//         alert('Сервер сломался, попробуй позже')
//     } else {
//         return response.json();
//     }
// })
//     .then((responseData) => {

//         commentsObject = responseData.comments.map(data => {
//             return {
//                 name: data.author.name,
//                 date: formatTime(data.date),
//                 text: data.text,
//                 like: data.isLiked,
//                 likeCount: data.likes,
//                 likeClass: "like-button"
//             };
//         })
//         renderComments(commentsObject);
//     })
//     .catch((error) => {
//         console.error(error)
//         alert('Кажется, у вас сломался интернет, попробуйте позже')
//     })

function validateForm(arrayValue) {

    for (let i = 0; i < arrayValue.length; i++) {
        if (arrayValue[i].value == "") {
            if (i == 0) {
                inputName.classList.add('error');
                inputName.placeholder = PLACEHOLDER_NAME__ERROR;
            } else {
                inputComment.classList.add('error');
                inputComment.placeholder = PLACEHOLDER_COMMENT__ERROR;
            }
        }
    }
}


// Функционал простановки лайка
const initEventListener = () => {
    const likeButtonElement = document.querySelectorAll(".likes")
    const likeButtons = document.querySelectorAll(".like-button")

    for (const likeButton of likeButtons) {

        likeButton.addEventListener('click', (event) => {

            event.stopPropagation();

            const index = likeButton.dataset.index;

            if (commentsObject[index].like) {
                commentsObject[index].like = false;
                --commentsObject[index].likeCount;
                commentsObject[index].likeClass = "like-button"
            } else {
                commentsObject[index].like = true;
                ++commentsObject[index].likeCount;
                commentsObject[index].likeClass = "like-button -active-like"
            }
            renderComments(commentsObject);
        })
    }
}



// Функционал ответа на комментрарии
const addCommentListener = () => {

    const commentsElement = document.querySelectorAll(".comment");


    for (const commentElement of commentsElement) {

        commentElement.addEventListener('click', () => {

            const index = commentElement.dataset.index;
            inputComment.value = `% ${commentsObject[index].text}
          
  ${commentsObject[index].name}`;

        })
    }
}

// renderComments(commentsObject)


// Доп задание: Блокирование кнопки при незаполненных полях
for (let i = 0; i < arrayValue.length; i++) {
    arrayValue[i].addEventListener('input', function () {
        const allInputsFilled = Array.from(arrayValue).every(input => input.value.trim() !== '');
        if (allInputsFilled) {
            button.removeAttribute('disabled');
        } else {
            button.disabled = true;
        }
    });
}

let textName = '';
let textComment = '';

inputName.addEventListener('input', (event) => {
    textName = event.target.value;
})

inputComment.addEventListener('input', (event) => {
    textComment = event.target.value;
})


// срабатывание кода на click
button.addEventListener('click', (event) => {

    inputName.placeholder = PLACEHOLDER_NAME;
    inputComment.placeholder = PLACEHOLDER_NAME;
    inputName.classList.remove('error');
    inputComment.classList.remove('error');

    validateForm(arrayValue);

    if (!inputName.classList.contains('error') && !inputComment.classList.contains('error')) {

        let CommentAddPreview = document.createElement('div');
        CommentAddPreview.textContent = 'Комментарий добавляется';
        formText.parentNode.insertBefore(CommentAddPreview, formText);
        let parentElement = CommentAddPreview.parentNode;

        formText.classList.add('hide');
        fetch("https://wedev-api.sky.pro/api/v1/:Alex-grishchenko_hw7/comments", {
            method: "POST",
            body: JSON.stringify({
                "text": inputComment.value,
                "name": inputName.value,
                forceError: true
            }),
        }).then((response) => {
            if (response.status === 400) {
                alert('Имя и комментарий не должны  быть короче трёх символов')
                inputName.value = textName;
                inputComment.value = textComment;
                // console.log(inputContent())
            } else if (response.status === 500) {
                alert('Сервер сломался, попробуй позже')
                inputName.value = textName;
                inputComment.value = textComment;
            } else {
                return response.json();
            }
        })
            .then((responseData) => {
                return fetch("https://wedev-api.sky.pro/api/v1/:Alex-grishchenko_hw7/comments",
                    {
                        method: "GET",
                    });
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                commentsObject = responseData.comments.map(data => {
                    return {
                        name: data.author.name,
                        date: formatTime(data.date),
                        text: data.text,
                        like: data.isLiked,
                        likeCount: data.likes,
                        likeClass: "like-button"
                    };
                })

                renderComments(commentsObject);
            })
            .then(() => {
                parentElement.removeChild(CommentAddPreview);
                formText.classList.remove('hide');
            })
            .catch(() => {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            })

        inputName.value = "";
        inputComment.value = "";
    }
})

// Доп. задание: Добавление кнопки удаление последнего комментария
buttonRemove.addEventListener('click', (event) => {
    event.preventDefault();

    const lastChild = comments.lastElementChild;
    lastChild.remove();

})