import formatTime from "./renderTime.js";
import renderComments from "./renderComments.js";
import {
    PLACEHOLDER_NAME, PLACEHOLDER_COMMENT,
    PLACEHOLDER_NAME__ERROR, PLACEHOLDER_COMMENT__ERROR,
    inputName, inputComment, button, formText, buttonRemove,
    comments, arrayValue
} from "./vars.js";

function getCommentsFromAPI() {
    return fetch(
        "https://wedev-api.sky.pro/api/v1/:Alex-grishchenko_hw8/comments",
        {
            method: "GET",
        }).then((response) => {
            if (response.status === 500) {
                alert('Сервер сломался, попробуй позже')
            } else {
                return response.json();
            }
        })

}

function postCommentsFromAPI() {
    return fetch("https://wedev-api.sky.pro/api/v1/:Alex-grishchenko_hw8/comments", {
        method: "POST",
        body: JSON.stringify({
            "text": inputComment.value,
            "name": inputName.value,
        }),
    }).then((response) => {
        if (response.status === 400) {
            alert('Имя и комментарий не должны  быть короче трёх символов')
            inputName.value = textName;
            inputComment.value = textComment;
        } else if (response.status === 500) {
            alert('Сервер сломался, попробуй позже')
            inputName.value = textName;
            inputComment.value = textComment;
        } else {
            return response.json();
        }
    })
}

    export { getCommentsFromAPI, postCommentsFromAPI };