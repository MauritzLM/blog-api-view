import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "../sidebar";
import { MemoryRouter } from "react-router-dom";

import { mockPosts } from "./mocks/utils";

// renders list correctly
describe("component renders correctly", () => {
    it("list of recent posts gets rendered correctly", () => {
        render(<MemoryRouter><Sidebar recentPosts={mockPosts} /></MemoryRouter>);

        expect(screen.getAllByRole("listitem")).toHaveLength(mockPosts.length);
        expect(screen.getByText("Blog Post 1")).toBeInTheDocument();
        expect(screen.getByText("Blog Post 2")).toBeInTheDocument();
        expect(screen.getByText("Blog Post 3")).toBeInTheDocument();
    });
});