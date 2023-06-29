
// mock array of posts
export const mockPosts = [{
    _id: 5,
    title: "Blog Post 1",
    author: "Gandalf",
    body: "I write to you on fith day of the year 3434. \n It has come to my attention...",
    published: true,
    comments: [{ _id: 101, author: "Mo", body: "Cool post!", timestamp: "2023-06-07T15:12:58.888+00:00" },
    { _id: 102, author: "Ryu", body: "this is good", timestamp: "2023-06-07T15:21:58.888+00:00" }],
    date: "2023-06-07T14:22:58.888+00:00"
}, {
    _id: 10,
    title: "Blog Post 2",
    author: "Elrond",
    body: "Stangers from distant lands, friends. \n You have been called here...",
    published: true,
    comments: [],
    date: "2023-06-08T14:25:58.888+00:00"
}, {
    _id: 15,
    title: "Blog Post 3",
    author: "Frodo",
    body: "I will take it \n Though I do not know the way",
    published: true,
    comments: [],
    date: "2023-06-08T14:25:58.888+00:00"
}];

// form errors
export const formErrors = {
    errors: [
        { path: "commentAuthor", msg: "please enter a name" },
        { path: "commentBody", msg: "please provide a comment" },
        { path: "securityQuestion", msg: "wrong answer" }
    ]
};