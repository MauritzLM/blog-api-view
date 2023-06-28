import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CommentCard from "../commentCard";

// setup
import { mockPosts } from "./mocks/utils";
const comment = mockPosts[0].comments[0];

describe("test rendering of comment card", () => {
    it("comment renders correctly", () => {
        render(<CommentCard comment={comment} />);

        expect(screen.getByText(/cool post!/i)).toBeInTheDocument();
    });
});