import { rest } from "msw";
import { mockPosts } from "./utils";

let id;

export const handlers = [
    // get one post
    rest.get(`http://localhost:3001/posts/${id}`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockPosts[0])
        );
    }),

    // get all posts
    rest.get('http://localhost:3001/posts', async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockPosts)
        );
    })
];