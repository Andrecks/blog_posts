from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Optional

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Post(BaseModel):
    title: str
    content: str
    author: str
    published: Optional[bool] = False


posts = [
    Post(title="First Post", content="This is my first post.", author="John Doe", published=True),
    Post(title="Second Post", content="This is my second post.", author="Jane Smith", published=False),
]

@app.get("/posts")
async def get_posts():
    return posts

@app.get("/posts/{post_id}")
async def get_post(post_id: int):
    for post in posts:
        if post.id == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.post("/posts")
async def create_post(post: Post):
    new_id = len(posts) + 1
    new_post = post.dict()
    new_post.update({"id": new_id})
    posts.append(new_post)
    return new_post

@app.put("/posts/{post_id}")
async def update_post(post_id: int, post: Post):
    for i, p in enumerate(posts):
        if p.id == post_id:
            posts[i] = post
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/posts/{post_id}")
async def delete_post(post_id: int):
    for i, post in enumerate(posts):
        if post.id == post_id:
            del posts[i]
            return {"message": "Post deleted"}
    raise HTTPException(status_code=404, detail="Post not found")
