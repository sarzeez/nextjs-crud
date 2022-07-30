import { Card, Button} from 'react-bootstrap';
import { useRouter } from 'next/router'
import { PostProps } from '../../types/general'
import { GetStaticProps } from 'next';

function Post() {

    const router = useRouter();
    const post = router.query;
    // if(router.isFallback) {
    //     return <h1>Loading...</h1>
    // }

    return (
        <Card>
            <Card.Header>Post {post.id}</Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                    {post.body}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default Post;

// export async function getStaticPaths() {

//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await response.json();

//     const paths = data.map(post => {
//         return {
//             params: {
//                 postId: `${post.id}`
//             }
//         }
//     })

//     return {
//         paths: [
//             {
//                 params: { postId: '1' }
//             },
//             {
//                 params: { postId: '2' }
//             },
//             {
//                 params: { postId: '3' }
//             }
//         ],
//         fallback: true
//     }
// }

// export const getStaticProps: GetStaticProps = async(context) => {
//     const { params } = context;
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.postId}`);
//     const data = await response.json();

//     return {
//         props: {
//             post: data
//         }
//     }
// }