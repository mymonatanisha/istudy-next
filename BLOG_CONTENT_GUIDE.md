# Blog content upload guide

Use this checklist when you are ready to upload your own blog posts.

## 1. Add the blog image

1. Put the image file in `public/assets/images/blog/`.
2. Use a short lowercase file name, for example `my-first-post.webp`.
3. Prefer `.webp` images so the page stays fast.

## 2. Import the image

Open `src/data/blog-data.ts` and add an import near the other blog image imports:

```ts
import myFirstPostImg from "../../public/assets/images/blog/my-first-post.webp";
```

## 3. Add your post object

Add a new object inside the `blogData` array. Give every new post a unique `id` that is not already used:

```ts
{
    id: 43,
    badge: "App Development Course",
    image: myFirstPostImg,
    title: "Your Blog Title",
    authorName: "Your Name",
    date: "Aug 13, 2026",
    comments: 0,
    description: "A short summary shown on blog cards.",
    isPublished: true
}
```

## 4. Hide or publish posts

- Set `isPublished: true` or leave it out to show a post.
- Set `isPublished: false` to hide a post from the public blog detail page.

## 5. Check the blog in the app

1. Start the site with `npm run dev`.
2. Open `/blog` from the new Blog menu option.
3. Open the individual blog details URL, for example `/blog/blog-details/43`.

## 6. Deploy

After confirming the post locally, commit the image and `src/data/blog-data.ts`, then deploy the site using your normal hosting workflow.
