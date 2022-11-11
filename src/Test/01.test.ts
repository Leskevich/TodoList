import React from 'react';


test('add Post',()=>{
    const newTextPost='new post'
    const posts =[
        {id: 1, textPost: 'post1', like: 4}
    ]
    const addPost = (text:string,id:number) =>{
        let newPost = {id:id,textPost:text,like:7}
        posts.push(newPost)
    }
    addPost(newTextPost,4)
    expect(posts.length).toBe(2)
    expect(posts[1].id).toBe(4)
    expect(posts[1].textPost).toBe('new post')
})