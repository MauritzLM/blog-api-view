import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CommentForm from "../commentForm";

const setCommentAdded = jest.fn();

describe("form functionality", () => {

    it("form input values", async () => {
        render(<CommentForm id={5} commentAdded={0} setCommentAdded={setCommentAdded} />);

        const authorInput = screen.getByTestId("author");
        const bodyInput = screen.getByTestId("body");
        const questionInput = screen.getByTestId("question");

        fireEvent.change(authorInput, { target: { value: "mo" } });
        fireEvent.change(bodyInput, { target: { value: "This is my comment" } });
        fireEvent.change(questionInput, { target: { value: "4" } });

        expect(authorInput).toHaveValue("mo");
        expect(bodyInput).toHaveValue("This is my comment");
        expect(questionInput).toHaveValue("4");
    });

    // it("submitting form with errors", async () => {

    //     render(<CommentForm id={5} commentAdded={0} setCommentAdded={setCommentAdded} />);

    //     const button = screen.getByTestId("submit");

    //     fireEvent.click(button);

    //     const errors = await screen.findAllByTestId("errormsg");

    //     expect(errors[0]).toHaveTextContent("please enter a name")
    //     expect(errors[1]).toHaveTextContent("please provide a comment")
    //     expect(errors[2]).toHaveTextContent("wrong answer")

    // });
});