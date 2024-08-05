import { useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostContent } from "./components/post-content/post-content";
import { Comments } from "./components";
import { useServerRequest } from "../../hooks";
import { loadPostAsync } from "../../actions/load-post-async";
import { selectPost } from "../../selectors";
import styled from "styled-components";
import { PostForm } from "./components/post-form/post-form";


const PostContainer = ({ className }) => {
    
    const dispatch = useDispatch();
    const params = useParams();
    const isEditing = useMatch('/post/:id/edit');
    const requestServer = useServerRequest();
    const post = useSelector(selectPost);

    
    

    useEffect(() => {
        dispatch(loadPostAsync(requestServer, params.id));
    }, [dispatch, requestServer, params.id]);
    
    return (
        <div className={className}>
            {isEditing ? (
                <PostForm post={post} />
            ) : (
                <>
                    <PostContent post={post} /> 
                    <Comments comments={post.comments} postId={post.id}/>
                </>
            )};
            
            
        </div>

    )
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding:    0 80px;

`;
