import { useEffect, useLayoutEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostContent } from "./components/post-content/post-content";
import { Comments } from "./components";
import { useServerRequest } from "../../hooks";
import { RESET_POST_DATA } from "../../actions";
import { loadPostAsync } from "../../actions/load-post-async";
import { selectPost } from "../../selectors";
import styled from "styled-components";
import { PostForm } from "./components/post-form/post-form";


const PostContainer = ({ className }) => {
    
    const dispatch = useDispatch();
    const params = useParams();
    const isEditing = useMatch('/post/:id/edit');
    const isCreating = useMatch('/post');
    const requestServer = useServerRequest();

    const post =  useSelector(selectPost);


    useLayoutEffect(() => {
        
        if (isCreating) {
            return;
        }

        dispatch(RESET_POST_DATA);

    }, [dispatch, isCreating]);
    

    
    

    useEffect(() => {
        dispatch(loadPostAsync(requestServer, params.id));
    }, [dispatch, requestServer, params.id, isCreating]);
    
    return (
        <div className={className}>
            {isCreating || isEditing ? (
                <PostForm post={post} />
            ) : (
                <>
                    <PostContent post={post} /> 
                    <Comments comments={post.comments} postId={post.id}/>
                </>
            )};
            
            
        </div>

    );
};

export const Post = styled(PostContainer)`
    margin: 40px 0;
    padding:    0 80px;

`;
