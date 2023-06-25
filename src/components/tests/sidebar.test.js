import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "../sidebar";
import { MemoryRouter } from "react-router-dom";

const recentPosts = [{ _id: 1, title: "Post 1" }, { _id: 2, title: "Post 2" }, { _id: 3, title: "Post 3" }];

// renders list correctly
describe("component renders correctly", () => {
    it("list of recent posts gets rendered correctly", () => {
        render(<MemoryRouter><Sidebar recenPosts={recentPosts} /></MemoryRouter>);

        expect(screen.getAllByRole("listitem")).toHaveLength(3);
        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
        expect(screen.getByText("Post 3")).toBeInTheDocument();
    });
});