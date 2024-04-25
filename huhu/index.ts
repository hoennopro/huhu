const buttons = document.querySelectorAll<HTMLButtonElement>(".rating button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
  });
});
let rating: number = 0;
let reviewText: string = "";

const ratingButtons = document.querySelectorAll(".rating button");
ratingButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const ratingButton = e.target as HTMLButtonElement;
    if (ratingButton.textContent) {
      rating = parseInt(ratingButton.textContent);
    }
  });
});

const reviewTextarea = document.getElementById(
  "review-textarea"
) as HTMLTextAreaElement;
const sendButton = document.getElementById("send-button") as HTMLButtonElement;

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
document
  .getElementById("feedback-container")
  ?.addEventListener("click", (e) => {
    if (
      e.target instanceof HTMLButtonElement &&
      e.target.classList.contains("edit-button")
    ) {
      const feedback = e.target.closest(".feedback");
      if (feedback) {
        const ratingInput = document.createElement("input");
        ratingInput.type = "number";
        ratingInput.min = "1";
        ratingInput.max = "10";
        const ratingText = feedback.querySelector("span")?.textContent;
        if (ratingText) {
          ratingInput.value = ratingText.split(": ")[1];
        }
        feedback.querySelector("span")?.replaceWith(ratingInput);

        const reviewTextarea = document.createElement("textarea");
        let reviewText = feedback.querySelector("p")?.textContent;
        if (reviewText) {
          reviewTextarea.value = reviewText;
        }
        feedback.querySelector("p")?.replaceWith(reviewTextarea);

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

        feedback.querySelector(".edit-button")?.remove();
        feedback.querySelector(".delete-button")?.remove();
      }
    } else if (
      e.target instanceof HTMLButtonElement &&
      e.target.classList.contains("delete-button")
    ) {
      e.preventDefault();
      const feedback = e.target.closest(".feedback");
      if (feedback) {
        if (confirm("Xóa không cu?")) {
          feedback.remove();
        }
      }
    }
  });
