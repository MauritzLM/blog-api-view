import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CommentsContainer from "../commentsContainer";

// setup
import { mockPosts } from "./mocks/utils";
const postComments = mockPosts[0].comments;
const setCommentAdded = jest.fn();

describe("rendering of comments container component", () => {
    it("renders all comments", async () => {
        render(<CommentsContainer postComments={postComments} commentAdded={0} setCommentAdded={setCommentAdded} />);

        const commentList = await screen.findAllByTestId("comment");

        expect(commentList).toHaveLength(postComments.length);
    });

    it("renders new comment form when showform prop is true", () => {
        render(<CommentsContainer postComments={postComments} commentAdded={0} setCommentAdded={setCommentAdded} showForm={true} />);

        const commentForm = screen.getByTestId("commentForm");

        expect(commentForm).toBeInTheDocument();
    });

    it("does not render form when showform prop is false", () => {
        render(<CommentsContainer postComments={postComments} commentAdded={0} setCommentAdded={setCommentAdded} showForm={false} />);

        expect(screen.queryByTestId("commentForm")).not.toBeInTheDocument();
    });

    it("clicking on show form button calls function", async () => {
        const handleShowForm = jest.fn();
        render(<CommentsContainer postComments={postComments} commentAdded={0} setCommentAdded={setCommentAdded} showForm={false} handleShowForm={handleShowForm} />);

        const showFormButton = screen.getByTestId("showform");

        fireEvent.click(showFormButton);

        expect(handleShowForm).toHaveBeenCalled();
    });

    it("clicking on hide form button calls function", () => {
        const handleHideForm = jest.fn();
        render(<CommentsContainer postComments={postComments} commentAdded={0} setCommentAdded={setCommentAdded} showForm={true} handleHideForm={handleHideForm} />);

        const hideFormButton = screen.getByTestId("hideform");

        fireEvent.click(hideFormButton);

        expect(handleHideForm).toHaveBeenCalled();
    });
});

