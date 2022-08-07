![Image description](https://i1.faceprep.in/ProGrad/prograd-logo.png)

# ProGrad Lab | REACT - PROBOOKS

## Learning Goals

In this exercise, the goal is to learn routing and forms in react:

- Axios,
- REST API,
- GET, POST, PUT & DELETE

## Getting started

1. Fork this repo
2. Clone this repo

Whenever you create a first significant change, you should make your first commit.

3. Follow these [guidelines to add, commit and push changes](https://github.com/FACEPrep-ProGrad/general-guidelines-labs-project-builders.git).

In the end of this document, you will find guidelines on how to submit the exercise.

## Instructions
In this lab we will try to work with API's in react. The main idea of this lab is to fetch details from external API, process it and display it. We have three components 
- HomeComponent
- SearchComponent
- BookComponent

The main theme behind the lab is to fetch book details and display it for reading. They can like it or dislike it after they have read it. So let's start building it.
```API DETAILS
api = "https://reactnd-books-api.udacity.com"
//token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
//headers
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
```

Kindly see the output:
![Image description](https://i1.faceprep.in/ProGrad/probook.gif)
### PROGRESSION 1 | GO FETCH AND COME BACK

Fetch the data from the above api and display it in homeComponent. The homeComponent consists of three `div`
- Read
- Like
- Dislike

Based on the user selection you need to move the books to read, like or dislike. You can refer sample output.

### PROGRESSION 2 | LOAD IT TO ME
Create a `+` Button to call the search component. When the user enters the book to be searched, fetch the book based on the search parameter and display it.

### PROGRESSION 3 | BOOK BOOK BOOK
The bookcomponent has a button with 4 options
- Read
- Like
- Dislike
- Delete

Based on the user selected value, render it in the home page and display it as per the selected value. Please refer the screenshot for reference.

### Bonus
Display at the bottom the count of books that are read,liked,disliked and deleted

## Submission

If you didn't add, commit and push the changes you made, this is the last call. :smile:

please share your github links with your Mentors. Your Mentor's will check up your work and provide feedback. 

## Summary

If you managed to do it, good job! :trophy:

We are proud of you!

Happy Coding ProGrad ❤️!

