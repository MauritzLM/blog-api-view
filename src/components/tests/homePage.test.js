import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "../sidebar";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/homePage";

// test rendering of home page
const recentPosts = [{ _id: 1, title: "Post 1", body: "first paragraph \n second paragraph" },
{ _id: 2, title: "Post 2", body: "first paragraph \n second paragraph" },
{ _id: 3, title: "Post 3", body: "first paragraph \n second paragraph" }];

describe("rendering of home page", () => {
    it("home page render two most recent posts", () => {
        render(<MemoryRouter><Home recentPosts={recentPosts} /></MemoryRouter>);

        const headings = screen.getAllByRole("heading");

        expect(headings[1]).toHaveTextContent("Post 1");
        expect(headings[2]).toHaveTextContent("Post 2");

        // expect(screen.queryByText("Post 3")).not.toBeInTheDocument();
    });
});