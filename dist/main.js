/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://february-14/./src/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\nconst searchButton = document.getElementById(\"searchButton\");\nconst searchInput = document.getElementById(\"searchInput\");\nconst searchResults = document.getElementById(\"searchResults\");\nconst topBooksRow = document.getElementById(\"topBooksRow\");\n\nsearchButton.addEventListener(\"click\", async () => {\n  const searchTerm = searchInput.value;\n\n  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyA-tAGFb2O_AQt0xrVcKj9H3fJDWcSPO_Q`;\n\n  try {\n    const response = await fetch(\n      url,\n      { credentials: \"same-origin\" },\n      { mode: \"cors\" }\n    );\n\n    topBooksRow.style.display = \"none\";\n\n    const responseData = await response.json();\n\n    searchResults.innerHTML = \"\";\n\n    for (let i = 0; i < responseData.items.length; i++) {\n      const item = responseData.items[i];\n      const bookTitle = item.volumeInfo.title;\n      const bookAuthors = item.volumeInfo.authors;\n      const bookThumbnail = item.volumeInfo.imageLinks?.thumbnail || \"\";\n      const bookDescription = item.volumeInfo.description;\n      const bookDescriptionShort = bookDescription\n        ? bookDescription.slice(0, 200) + \"...\"\n        : \"\";\n\n      const bookInfo =\n        \"<div class='book-container'>\" +\n        \"<div class='thumbnail-container'><img src ='\" +\n        bookThumbnail +\n        \"'></div>\" +\n        \"<div class='info-container'>\" +\n        \"<h3>\" +\n        bookTitle +\n        \"</h3>\" +\n        \"<p>\" +\n        (bookAuthors ? bookAuthors.join(\", \") : \"\") +\n        \"</p>\" +\n        \"<p>\" +\n        bookDescriptionShort +\n        \"</p>\" +\n        \"<a href='\" +\n        item.volumeInfo.previewLink +\n        \"' target='_blank'> Preview on Google Books </a>\" +\n        \"<button class='add-to-favorites-btn favoriteButton'>Add to favorites</button>\" +\n        \"</div>\" +\n        \"</div>\";\n      searchResults.innerHTML += bookInfo;\n    }\n\n    const favoriteButtons = document.querySelectorAll(\".favoriteButton\");\n    favoriteButtons.forEach((button, index) => {\n      button.addEventListener(\"click\", () => {\n        addToFavorites(index);\n      });\n    });\n  } catch (error) {\n    console.log(error);\n  }\n});\n\nfunction addToFavorites(index) {\n  const favoriteBookList = document.getElementById(\"favoriteBooksList\");\n  const favoriteBook = document.createElement(\"li\");\n  favoriteBook.classList.add(\"favorite-book\");\n\n  const bookTitleElement = document.querySelector(\n    `.book-container:nth-of-type(${index + 1}) .info-container h3`\n  );\n\n  const bookTitle = bookTitleElement.textContent;\n  favoriteBook.innerHTML = bookTitle;\n\n  /////////////rating\n\n  const starsContainer = document.createElement(\"div\");\n  starsContainer.classList.add(\"stars-container\");\n  favoriteBook.appendChild(starsContainer);\n\n  for (let i = 1; i <= 5; i++) {\n    const star = document.createElement(\"i\");\n    star.classList.add(\"fa\", \"fa-star\");\n    star.dataset.value = i;\n    starsContainer.appendChild(star);\n\n    star.addEventListener(\"mouseover\", () => {\n      star.classList.remove(\"fa-star-o\");\n      star.classList.add(\"fa-star\");\n    });\n\n    star.addEventListener(\"mouseout\", () => {\n      star.classList.add(\"fa-star-o\");\n    });\n  }\n\n  starsContainer.addEventListener(\"click\", (event) => {\n    const star = event.target;\n    const rating = star.dataset.value;\n\n    if (rating) {\n      const ratingElement = favoriteBook.querySelector(\".rating\");\n\n      if (ratingElement) {\n        ratingElement.textContent = `Rating: ${rating}/5`;\n      } else {\n        const ratingElement = document.createElement(\"p\");\n        ratingElement.classList.add(\"rating\");\n        ratingElement.innerText = `Rating: ${rating}/5`;\n        favoriteBook.appendChild(ratingElement);\n      }\n    }\n  });\n\n  /////////// reviews\n\n  const writeReviewButton = document.createElement(\"button\");\n  writeReviewButton.classList.add(\"write-review-button\");\n  writeReviewButton.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"30\" fill=\"currentColor\" class=\"bi bi-pen\" viewBox=\"0 0 16 16\">\n  <path d=\"m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z\"/>\n</svg>`;\n\n  writeReviewButton.addEventListener(\"click\", () => {\n    const reviewWindow = document.createElement(\"div\");\n    reviewWindow.classList.add(\"review-window\");\n    favoriteBook.appendChild(reviewWindow);\n\n    const reviewTextarea = document.createElement(\"textarea\");\n    reviewTextarea.classList.add(\"review-textarea\");\n    reviewWindow.appendChild(reviewTextarea);\n\n    const submitButton = document.createElement(\"button\");\n    submitButton.classList.add(\"submit-button\");\n    submitButton.innerText = \"Submit\";\n    reviewWindow.appendChild(submitButton);\n\n    const cancelButton = document.createElement(\"button\");\n    cancelButton.classList.add(\"cancel-button\");\n    cancelButton.innerText = \"Cancel\";\n    reviewWindow.appendChild(cancelButton);\n\n    cancelButton.addEventListener(\"click\", () => {\n      favoriteBook.removeChild(reviewWindow);\n    });\n\n    submitButton.addEventListener(\"click\", () => {\n      const reviewText = reviewTextarea.value;\n      console.log(reviewText);\n\n      favoriteBook.removeChild(reviewWindow);\n    });\n\n    writeReviewButton.style.display = \"inline-block\";\n    removeButton.style.display = \"inline-block\";\n    starsContainer.style.display = \"inline-block\";\n  });\n\n  const removeButton = document.createElement(\"button\");\n  removeButton.classList.add(\"remove-button\");\n  removeButton.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"30\" fill=\"white\" class=\"bi bi-trash3\" viewBox=\"0 0 16 16\">\n    <path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z\"/>\n  </svg>`;\n  removeButton.addEventListener(\"click\", () => {\n    favoriteBookList.removeChild(favoriteBook);\n  });\n  ///////////\n\n  favoriteBookList.appendChild(favoriteBook);\n  favoriteBook.appendChild(starsContainer);\n  favoriteBook.appendChild(writeReviewButton);\n  favoriteBook.appendChild(removeButton);\n}\n\n//////////////////////////////////////////////////////////////\n\nconst categoryDropdown = document.getElementById(\"categorySelect\");\n\ncategoryDropdown.addEventListener(\"change\", async () => {\n  const selectedCategory = categoryDropdown.value;\n\n  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${selectedCategory}&key=\n      AIzaSyA-tAGFb2O_AQt0xrVcKj9H3fJDWcSPO_Q`;\n\n  try {\n    const response = await fetch(\n      url,\n      { credentials: \"same-origin\" },\n      { mode: \"cors\" }\n    );\n\n    topBooksRow.style.display = \"none\";\n\n    const responseData = await response.json();\n\n    searchResults.innerHTML = \"\";\n\n    for (let i = 0; i < responseData.items.length; i++) {\n      const item = responseData.items[i];\n      const bookTitle = item.volumeInfo.title;\n      const bookAuthors = item.volumeInfo.authors;\n      const bookDescription = item.volumeInfo.description;\n      const bookThumbnail = item.volumeInfo.imageLinks.thumbnail;\n\n      const bookInfo =\n        \"<div class='book-container'>\" +\n        \"<div class='thumbnail-container'><img src ='\" +\n        bookThumbnail +\n        \"'></div>\" +\n        \"<div class='info-container'>\" +\n        \"<h3>\" +\n        bookTitle +\n        \"</h3>\" +\n        \"<p>\" +\n        (bookAuthors ? bookAuthors.join(\", \") : \"\") +\n        \"</p>\" +\n        \"<p>\" +\n        bookDescription +\n        \"</p>\" +\n        \"<button class='add-to-favorites-btn favoriteButton'>Add to favorites</button>\" +\n        \"</div>\" +\n        \"</div>\";\n      searchResults.innerHTML += bookInfo;\n    }\n    const favoriteButtons = document.querySelectorAll(\".favoriteButton\");\n    favoriteButtons.forEach((button, index) => {\n      button.addEventListener(\"click\", () => {\n        addToFavorites(index);\n      });\n    });\n  } catch (error) {\n    console.log(error);\n  }\n});\n\n////////////// book club\n\nconst clubs = [];\n\nconst newClubForm = document.getElementById(\"newClubForm\");\nnewClubForm.addEventListener(\"submit\", function (event) {\n  event.preventDefault();\n\n  const clubName = document.getElementById(\"clubName\").value;\n  const clubDescription = document.getElementById(\"clubDescription\").value;\n  const clubMembers = document.getElementById(\"clubMembers\").value;\n  const bookTitle = document.getElementById(\"bookTitle\").value;\n\n  const newClub = {\n    name: clubName,\n    description: clubDescription,\n    members: clubMembers.split(\",\"),\n    book: bookTitle,\n  };\n\n  clubs.push(newClub);\n  renderClubs();\n});\n\nconst clubList = document.getElementById(\"clubList\");\n\nfunction renderClubs() {\n  clubList.innerHTML = \"\";\n\n  for (let i = 0; i < clubs.length; i++) {\n    const club = clubs[i];\n    const clubElement = document.createElement(\"div\");\n    clubElement.classList.add(\"club-element\");\n\n    const clubDetails = document.createElement(\"div\");\n    clubDetails.classList.add(\"club-details\");\n\n    const clubTitle = document.createElement(\"h3\");\n    clubTitle.innerText = \"Club name: \" + club.name;\n    clubDetails.appendChild(clubTitle);\n\n    const clubDescription = document.createElement(\"p\");\n    clubDescription.innerText = \"Description: \" + club.description;\n    clubDetails.appendChild(clubDescription);\n\n    const clubMembers = document.createElement(\"p\");\n    clubMembers.innerText = \"Members: \" + club.members.join(\", \");\n    clubDetails.appendChild(clubMembers);\n\n    const clubBook = document.createElement(\"p\");\n    clubBook.innerText = \"Book: \" + club.book;\n    clubDetails.appendChild(clubBook);\n\n    const removeButton = document.createElement(\"button\");\n    removeButton.classList.add(\"remove-button\");\n    removeButton.innerHTML = \"<i class='fas fa-trash-alt'></i>\";\n    removeButton.addEventListener(\"click\", function () {\n      clubs.splice(i, 1);\n      renderClubs();\n    });\n\n    clubElement.appendChild(clubDetails);\n    clubElement.appendChild(removeButton);\n    clubList.appendChild(clubElement);\n  }\n}\n\n//////////////////////////// top books\n\n$(document).ready(function () {\n  $.get(\n    \"https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=12&key=AIzaSyA-tAGFb2O_AQt0xrVcKj9H3fJDWcSPO_Q\",\n    function (response) {\n      const books = response.items;\n      const row = $(\"#topBooksRow\");\n      for (let i = 0; i < books.length; i++) {\n        let book = books[i];\n        let bookInfo = $(\n          \"<div class='col-md-2'><img src='\" +\n            book.volumeInfo.imageLinks.thumbnail +\n            \"'><p>\" +\n            book.volumeInfo.title +\n            \"</p></div>\"\n        );\n        row.append(bookInfo);\n      }\n    }\n  );\n});\n\n\n//# sourceURL=webpack://february-14/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;