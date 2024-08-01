import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../components";
import { Comment } from './components';
import { useServerRequest } from '../../../../hooks';
import styled from "styled-components";
import { selectUserId } from "../../../../selectors";
import { addCommentAsync } from "../../../../actions";


const CommentsContainer = ({ className, comments, postId }) => {
    const [newComment, setNewComment] = useState('');
    const userId = useSelector(selectUserId);
    const dispatch =  useDispatch();
    const requestServer = useServerRequest();

    const onNewCommentAdd = (userId, postId, content) => {
        dispatch(addCommentAsync(requestServer, userId, postId, content));
        setNewComment('');
    
};

    return (
        <div className={className}>
            <div className="new-comment">
                <textarea name="comment" value={newComment} placeholder="Комментарий..." 
                    onChange={({ target }) => setNewComment(target.value)}
                ></textarea>
                <Icon
                    id="fa-paper-plane-o"
                    margin="0 7px 0 0"
                    size="18px"
                    onClick={() => onNewCommentAdd(userId, postId, newComment)}
                />   
            </div> 
            <div className="comments">
                {comments.map(({ id, author, content, publishedAt }) => (
                    <Comment 
                        key={id}
                        postId={postId}
                        id={id}
                        author={author}
                        content={content}
                        publishedAt={publishedAt}
                    />
                
                ))}
            </div>
               
        </div>
    )    
};


export const Comments = styled(CommentsContainer)`
    
    width:  580px;
    margin: 0 auto;

    & .new-comment  {
        display:    flex;
        width:  100%;
        margin: 20px 0 10px;
    }

    & .new-comment textarea {
        width:  550%;
        height: 120px;
        font-size:  18px;
        resize: none;
    }
`;