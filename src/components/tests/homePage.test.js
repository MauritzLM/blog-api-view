import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/homePage";

import { mockPosts } from "./mocks/utils";

// test rendering of home page

describe("rendering of home page", () => {
    it("home page render two most recent posts", () => {
        render(<MemoryRouter><Home recentPosts={mockPosts} /></MemoryRouter>);

        const headings = screen.getAllByRole("heading");

        expect(headings[1]).toHaveTextContent(/Blog Post 1/i);
        expect(headings[2]).toHaveTextContent(/Blog Post 2/i);

    });
});