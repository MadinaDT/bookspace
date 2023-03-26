import "./style.scss";

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const topBooksRow = document.getElementById("topBooksRow");

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value;

  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyA-tAGFb2O_AQt0xrVcKj9H3fJDWcSPO_Q`;

  try {
    const response = await fetch(
      url,
      { credentials: "same-origin" },
      { mode: "cors" }
    );

    topBooksRow.style.display = "none";

    const responseData = await response.json();

    searchResults.innerHTML = "";

    for (let i = 0; i < responseData.items.length; i++) {
      const item = responseData.items[i];
      const bookTitle = item.volumeInfo.title;
      const bookAuthors = item.volumeInfo.authors;
      const bookThumbnail = item.volumeInfo.imageLinks?.thumbnail || "";
      const bookDescription = item.volumeInfo.description;
      const bookDescriptionShort = bookDescription
        ? bookDescription.slice(0, 200) + "..."
        : "";

      const bookInfo =
        "<div class='book-container'>" +
        "<div class='thumbnail-container'><img src ='" +
        bookThumbnail +
        "'></div>" +
        "<div class='info-container'>" +
        "<h3>" +
        bookTitle +
        "</h3>" +
        "<p>" +
        (bookAuthors ? bookAuthors.join(", ") : "") +
        "</p>" +
        "<p>" +
        bookDescriptionShort +
        "</p>" +
        "<a href='" +
        item.volumeInfo.previewLink +
        "' target='_blank'> Preview on Google Books </a>" +
        "<button class='add-to-favorites-btn favoriteButton'>Add to favorites</button>" +
        "</div>" +
        "</div>";
      searchResults.innerHTML += bookInfo;
    }

    const favoriteButtons = document.querySelectorAll(".favoriteButton");
    favoriteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        addToFavorites(index);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

function addToFavorites(index) {
  const favoriteBookList = document.getElementById("favoriteBooksList");
  const favoriteBook = document.createElement("li");
  favoriteBook.classList.add("favorite-book");

  const bookTitleElement = document.querySelector(
    `.book-container:nth-of-type(${index + 1}) .info-container h3`
  );

  const bookTitle = bookTitleElement.textContent;
  favoriteBook.innerHTML = bookTitle;

  /////////////rating

  const starsContainer = document.createElement("div");
  starsContainer.classList.add("stars-container");
  favoriteBook.appendChild(starsContainer);

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    star.dataset.value = i;
    starsContainer.appendChild(star);

    star.addEventListener("mouseover", () => {
      star.classList.remove("fa-star-o");
      star.classList.add("fa-star");
    });

    star.addEventListener("mouseout", () => {
      star.classList.add("fa-star-o");
    });
  }

  starsContainer.addEventListener("click", (event) => {
    const star = event.target;
    const rating = star.dataset.value;

    if (rating) {
      const ratingElement = favoriteBook.querySelector(".rating");

      if (ratingElement) {
        ratingElement.textContent = `Rating: ${rating}/5`;
      } else {
        const ratingElement = document.createElement("p");
        ratingElement.classList.add("rating");
        ratingElement.innerText = `Rating: ${rating}/5`;
        favoriteBook.appendChild(ratingElement);
      }
    }
  });

  /////////// reviews

  const writeReviewButton = document.createElement("button");
  writeReviewButton.classList.add("write-review-button");
  writeReviewButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>`;

  writeReviewButton.addEventListener("click", () => {
    const reviewWindow = document.createElement("div");
    reviewWindow.classList.add("review-window");
    favoriteBook.appendChild(reviewWindow);

    const reviewTextarea = document.createElement("textarea");
    reviewTextarea.classList.add("review-textarea");
    reviewWindow.appendChild(reviewTextarea);

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.innerText = "Submit";
    reviewWindow.appendChild(submitButton);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.innerText = "Cancel";
    reviewWindow.appendChild(cancelButton);

    cancelButton.addEventListener("click", () => {
      favoriteBook.removeChild(reviewWindow);
    });

    submitButton.addEventListener("click", () => {
      const reviewText = reviewTextarea.value;
      console.log(reviewText);

      favoriteBook.removeChild(reviewWindow);
    });

    writeReviewButton.style.display = "inline-block";
    removeButton.style.display = "inline-block";
    starsContainer.style.display = "inline-block";
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
  </svg>`;
  removeButton.addEventListener("click", () => {
    favoriteBookList.removeChild(favoriteBook);
  });
  ///////////

  favoriteBookList.appendChild(favoriteBook);
  favoriteBook.appendChild(starsContainer);
  favoriteBook.appendChild(writeReviewButton);
  favoriteBook.appendChild(removeButton);
}

//////////////////////////////////////////////////////////////

const categoryDropdown = document.getElementById("categorySelect");

categoryDropdown.addEventListener("change", async () => {
  const selectedCategory = categoryDropdown.value;

  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${selectedCategory}&key=
      AIzaSyA-tAGFb2O_AQt0xrVcKj9H3fJDWcSPO_Q`;

  try {
    const response = await fetch(
      url,
      { credentials: "same-origin" },
      { mode: "cors" }
    );

    topBooksRow.style.display = "none";

    const responseData = await response.json();

    searchResults.innerHTML = "";

    for (let i = 0; i < responseData.items.length; i++) {
      const item = responseData.items[i];
      const bookTitle = item.volumeInfo.title;
      const bookAuthors = item.volumeInfo.authors;
      const bookDescription = item.volumeInfo.description;
      const bookThumbnail = item.volumeInfo.imageLinks.thumbnail;

      const bookInfo =
        "<div class='book-container'>" +
        "<div class='thumbnail-container'><img src ='" +
        bookThumbnail +
        "'></div>" +
        "<div class='info-container'>" +
        "<h3>" +
        bookTitle +
        "</h3>" +
        "<p>" +
        (bookAuthors ? bookAuthors.join(", ") : "") +
        "</p>" +
        "<p>" +
        bookDescription +
        "</p>" +
        "<button class='add-to-favorites-btn favoriteButton'>Add to favorites</button>" +
        "</div>" +
        "</div>";
      searchResults.innerHTML += bookInfo;
    }
    const favoriteButtons = document.querySelectorAll(".favoriteButton");
    favoriteButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        addToFavorites(index);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

////////////// book club

const clubs = [];

const newClubForm = document.getElementById("newClubForm");
newClubForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const clubName = document.getElementById("clubName").value;
  const clubDescription = document.getElementById("clubDescription").value;
  const clubMembers = document.getElementById("clubMembers").value;
  const bookTitle = document.getElementById("bookTitle").value;

  const newClub = {
    name: clubName,
    description: clubDescription,
    members: clubMembers.split(","),
    book: bookTitle,
  };

  clubs.push(newClub);
  renderClubs();
});

const clubList = document.getElementById("clubList");

function renderClubs() {
  clubList.innerHTML = "";

  for (let i = 0; i < clubs.length; i++) {
    const club = clubs[i];
    const clubElement = document.createElement("div");
    clubElement.classList.add("club-element");

    const clubDetails = document.createElement("div");
    clubDetails.classList.add("club-details");

    const clubTitle = document.createElement("h3");
    clubTitle.innerText = "Club name: " + club.name;
    clubDetails.appendChild(clubTitle);

    const clubDescription = document.createElement("p");
    clubDescription.innerText = "Description: " + club.description;
    clubDetails.appendChild(clubDescription);

    const clubMembers = document.createElement("p");
    clubMembers.innerText = "Members: " + club.members.join(", ");
    clubDetails.appendChild(clubMembers);

    const clubBook = document.createElement("p");
    clubBook.innerText = "Book: " + club.book;
    clubDetails.appendChild(clubBook);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
    removeButton.addEventListener("click", function () {
      clubs.splice(i, 1);
      renderClubs();
    });

    clubElement.appendChild(clubDetails);
    clubElement.appendChild(removeButton);
    clubList.appendChild(clubElement);
  }
}

//////////////////////////// top books

$(document).ready(function () {
  $.get(
    "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=12&key=AIzaSyA-tAGFb2O_AQt0xrVcKj9H3fJDWcSPO_Q",
    function (response) {
      const books = response.items;
      const row = $("#topBooksRow");
      for (let i = 0; i < books.length; i++) {
        let book = books[i];
        let bookInfo = $(
          "<div class='col-md-2'><img src='" +
            book.volumeInfo.imageLinks.thumbnail +
            "'><p>" +
            book.volumeInfo.title +
            "</p></div>"
        );
        row.append(bookInfo);
      }
    }
  );
});
