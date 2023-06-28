import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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

    it("renders new comment form", () => {
        render(<CommentsContainer postComments={postComments} commentAdded={0} setCommentAdded={setCommentAdded} />);

        const commentForm = screen.getByTestId("commentForm");

        expect(commentForm).toBeInTheDocument();
    });
});

