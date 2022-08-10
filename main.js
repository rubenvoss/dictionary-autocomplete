// url function that takes a search query and return the right url for the le wagon api
const url = (query) => {
  return `https://wagon-dictionary.herokuapp.com/autocomplete/${query}`;
};

// ////// make api data into html tags ///////
// if there is a list item, this function deletes all list items
const deleteAllListItems = () => {
  const listItems = document.getElementById("results");
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
};


// function adds a new List Item to the <ul> in the index.html file
const addListItem = (newItemText) => {
  // finds results list
  const resultsList = document.getElementById("results");
  // makes a new list item
  const listItem = document.createElement('li');
  // adds the text to the list item
  listItem.innerText = newItemText;
  // adds the list item to the bottom of the list
  resultsList.appendChild(listItem);
};

// global search query
const searchInputField = document.getElementById("search");

// get input with every keyup
searchInputField.addEventListener("keyup", () => {
  // this function deletes all old list items
  deleteAllListItems();
  // this is the search query:
  const query = searchInputField.value;

  // ////////// fetch data from api /////////////
  // for every letter, access api and fetch data
  fetch(url(query))
    .then(response => response.json())
    .then((data) => {
      // /// put all functions in here, because this gets executed last
      // data.words fetches an array of words
      const arrayOfWords = data.words;
      // ////// make api data into html tags ///////
      // example words array
      // add all array elements to ul
      arrayOfWords.forEach(addListItem);
    });
});
