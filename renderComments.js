import { comments } from "./vars.js";
import { initEventListener, addCommentListener } from "./main.js";

// Отрисовка комментариев (Рендер функция)
const renderComments = (commentsObject) => {
    const commentsHtml = commentsObject
        .map((comment, index) => {
            return `<li class="comment" data-index = "${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div  class="likes">
              <span class="likes-counter">${comment.likeCount}</span>
              <button data-like=${comment.like} data-index = "${index}" class="${comment.likeClass}"></button>
            </div>
          </div>
        </li>`
        })
        .join("");


    comments.innerHTML = commentsHtml;

    initEventListener();
    addCommentListener();

}

export default renderComments;