import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Post from "../../pages/postPage";

// setup
import { mockPosts } from "./mocks/utils";

// page renders correctly
// mock fetch request and update state
describe("rendering of post", () => {
    it("page renders with correct post", async () => {
        window.scrollTo = jest.fn();
        render(<MemoryRouter><Post recentPosts={mockPosts} /></MemoryRouter>);

        const title = await screen.findByTestId("title");

        await waitFor(() => expect(title).toHaveTextContent("Blog Post 1"));
    });
});