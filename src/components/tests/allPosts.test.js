import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AllPosts from "../../pages/allPostsPage";

import { mockPosts } from "./mocks/utils";

describe("rendering of allposts", () => {
    it("renders page correctly", async () => {
        render(<MemoryRouter><AllPosts /></MemoryRouter>);

        const listItems = await screen.findAllByRole("listitem");

        expect(listItems).toHaveLength(mockPosts.length);
    });
});