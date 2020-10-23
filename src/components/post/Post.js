import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';

// path="/posts/:id" in src/routing/Routes.js
const Post = (props) => {
  const { post, loading } = useSelector(state => state.post)
  const dispatch = useDispatch()

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  if (loading || post === null) {
    return <Spinner />
  }

  return (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      
      <PostItem post={post} showActions={false} />

      <CommentForm postId={post._id} />

      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  )
};

export default Post;
