"use strict";
var _a;
const buttons = document.querySelectorAll(".rating button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => {
            btn.classList.remove("selected");
        });
        button.classList.add("selected");
    });
});
let rating = 0;
let reviewText = "";
const ratingButtons = document.querySelectorAll(".rating button");
ratingButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const ratingButton = e.target;
        if (ratingButton.textContent) {
            rating = parseInt(ratingButton.textContent);
        }
    });
});
const reviewTextarea = document.getElementById("review-textarea");
const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", () => {
    reviewText = reviewTextarea.value;
    if (rating > 0 && reviewText !== "") {
        const feedbackHTML = `
      <div class="feedback">
        <span>Rating: ${rating}</span>
        <p>${reviewText}</p>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      </div>
    `;
        const feedbackContainer = document.getElementById("feedback-container");
        if (feedbackContainer) {
            feedbackContainer.innerHTML += feedbackHTML;
        }
        reviewTextarea.value = "";
        rating = 0;
    }
});
// xoa
(_a = document
    .getElementById("feedback-container")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    var _a, _b, _c, _d, _e, _f;
    if (e.target instanceof HTMLButtonElement &&
        e.target.classList.contains("edit-button")) {
        const feedback = e.target.closest(".feedback");
        if (feedback) {
            const ratingInput = document.createElement("input");
            ratingInput.type = "number";
            ratingInput.min = "1";
            ratingInput.max = "10";
            const ratingText = (_a = feedback.querySelector("span")) === null || _a === void 0 ? void 0 : _a.textContent;
            if (ratingText) {
                ratingInput.value = ratingText.split(": ")[1];
            }
            (_b = feedback.querySelector("span")) === null || _b === void 0 ? void 0 : _b.replaceWith(ratingInput);
            const reviewTextarea = document.createElement("textarea");
            let reviewText = (_c = feedback.querySelector("p")) === null || _c === void 0 ? void 0 : _c.textContent;
            if (reviewText) {
                reviewTextarea.value = reviewText;
            }
            (_d = feedback.querySelector("p")) === null || _d === void 0 ? void 0 : _d.replaceWith(reviewTextarea);
            const sendButton = document.createElement("button");
            sendButton.textContent = "Send";
            sendButton.addEventListener("click", () => {
                rating = parseInt(ratingInput.value);
                reviewText = reviewTextarea.value;
                feedback.innerHTML = `
          <span>Rating: ${rating}</span>
          <p>${reviewText}</p>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        `;
            });
            feedback.appendChild(sendButton);
            (_e = feedback.querySelector(".edit-button")) === null || _e === void 0 ? void 0 : _e.remove();
            (_f = feedback.querySelector(".delete-button")) === null || _f === void 0 ? void 0 : _f.remove();
        }
    }
    else if (e.target instanceof HTMLButtonElement &&
        e.target.classList.contains("delete-button")) {
        e.preventDefault();
        const feedback = e.target.closest(".feedback");
        if (feedback) {
            if (confirm("Xóa không cu?")) {
                feedback.remove();
            }
        }
    }
});
