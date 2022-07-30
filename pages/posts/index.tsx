import React, { MouseEventHandler, useEffect, useState } from 'react'
import {Table, Button} from 'react-bootstrap';
import Link from 'next/link';

import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'

import { PostProps } from '../../types/general';
import { useModal } from '../../context/ModalContext'
import MyModal from '../../components/Modal';

// export async function getStaticProps() {
//     console.log('getStaticProps() rendering...')
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
//     const data = await response.json();

//     return {
//         props: {
//             posts: data
//         }
//     }
// }

const Posts = ({ posts } : { posts: PostProps[]}) => {

    const [data, setData] = useState<PostProps[]>([
        {
            id: '',
            title: '',
            body: ''
        }
    ])
    const { openModal, closeModal, postData, handleSetPostData, createPost, setCreatePost } = useModal();

    const handleAddPost = () => {
        openModal()
        setCreatePost(true)
    }
    const removePost = async (post : PostProps) => {
        const { id } = post;
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });
            const newData = data?.filter(item => item.id !== id);
            setData(newData);
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(createPost) {
            // create post
            const length = data?.length;
            const id = data[length - 1].id + 1;
            fetch(`https://jsonplaceholder.typicode.com/posts`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: postData.title,
                        body: postData.body,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
            })
                .then(res => {
                    console.log(res);
                    const newPost = {
                        id,
                        title: postData.title,
                        body: postData.body
                    }
                    setData([...data, newPost]);
                    closeModal();

                })
                .catch(err => {
                    console.log(err)
                })
            
        } else {
            // edit post
            const { id } = postData;
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: postData.id,
                        title: postData.title,
                        body: postData.body
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                const newData = data?.map(item => {
                    if(item.id === postData.id) {
                        item.title = postData.title;
                        item.body = postData.body;
                    }
                    return item
                })
                setData(newData)
                closeModal()
                handleSetPostData({
                    id: '',
                    title: '',
                    body: ''
                })
            } catch (error) {
                console.log(error)
                handleSetPostData({
                    id: '',
                    title: '',
                    body: ''
                })
            }
        }
        handleSetPostData({
            id: '',
            title: '',
            body: ''
        })
    }

    const handleEdit = (post:PostProps) => {
        openModal()
        handleSetPostData(post);
        setCreatePost(false)

    }

    // useEffect(() => {
    //     setData(posts)
    // }, [posts])
    useEffect(() => {
        function getPosts() {
            fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => {console.log(err)})
        }

        getPosts()
    }, [])

    return (
        <div>
            <MyModal onSubmit={onSubmit} />
            <h1>Posts</h1>
            <Button onClick={handleAddPost} style={{margin: '10px 0'}} variant="primary">Add a post</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Title</th>
                        <th>body</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(post => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body?.slice(0, 40)}...</td>
                                    <td className='icons__wrapper'>
                                    <Link  href={{
                                        pathname: `posts/${post.id}`,
                                        query: {
                                            id: post.id,
                                            title: post.title,
                                            body: post.body
                                        }
                                    }} >
                                        <div className='icons__item'>
                                            <FiExternalLink />
                                        </div>
                                    </Link>

                                        <div onClick={() => {removePost(post)}} className='icons__item'>
                                            <AiOutlineDelete />
                                        </div>
                                        <div onClick={() => {handleEdit(post)}} className='icons__item'>
                                            <AiOutlineEdit />
                                        </div>
                                    </td>
                                </tr>
                        ))
                    }
                </tbody>
                </Table>
        </div>
    )
}

export default Posts;


