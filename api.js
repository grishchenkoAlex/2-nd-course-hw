import formatTime from "./renderTime.js";
import renderComments from "./renderComments.js";
// import {
//     PLACEHOLDER_NAME, PLACEHOLDER_COMMENT,
//     PLACEHOLDER_NAME__ERROR, PLACEHOLDER_COMMENT__ERROR,
//     inputName, inputComment, button, formText, buttonRemove,
//     comments, arrayValue
// } from "./vars.js";
// import {commentsObject} from "./main.js";
// let commentsObject;


const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/:Alex-grishchenko_hw7/comments",
    {
        method: "GET",
    }
).then((response) => {
    if (response.status === 500) {
        alert('Сервер сломался, попробуй позже')
    } else {
        return response.json();
    }
})
    .then((responseData) => {

        let commentsObject = responseData.comments.map(data => {
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
    .catch((error) => {
        console.error(error)
        alert('Кажется, у вас сломался интернет, попробуйте позже')
    })


    export {fetchPromise};