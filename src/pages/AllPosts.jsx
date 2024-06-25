import React, { useState } from 'react'
import { useEffect, useCallback } from 'react'
import service from '../appwrite/config';
import { Container,PostCard } from '../components';


function AllPosts() {
    const [posts, setPosts] = useState();
    useEffect({}, []);
    service.getPosts([]).then(posts => {
        if (posts) {
            setPosts(posts);
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                {
                    posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                             <PostCard {...post} />
                        </div>
                    ))
                }
            </Container>
        </div>
    )

}

export default AllPosts