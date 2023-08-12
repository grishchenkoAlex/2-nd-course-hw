const PLACEHOLDER_NAME = "Введите ваше имя";
const PLACEHOLDER_COMMENT = "Введите ваш коментарий";
const PLACEHOLDER_NAME__ERROR = "Поле имени обязательно для заполнения";
const PLACEHOLDER_COMMENT__ERROR = "Поле комментария обязательно для заполнения";

const inputName = document.querySelector('.add-form-name');
const inputComment = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
const formText = document.querySelector('.add-form');
const buttonRemove = document.querySelector('.remove-form-button');
const comments = document.querySelector('.comments');
let arrayValue = [inputName, inputComment];


export {PLACEHOLDER_NAME, PLACEHOLDER_COMMENT,
       PLACEHOLDER_NAME__ERROR,PLACEHOLDER_COMMENT__ERROR,
       inputName, inputComment, button, formText, buttonRemove,
       comments, arrayValue}