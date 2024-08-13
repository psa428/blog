import styled from "styled-components";
import { Icon } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import {  openModal, CLOSE_MODAL, removeCommentAsync } from "../../../../../../actions";
import { useServerRequest } from "../../../../../../hooks";
import { selectUserRole } from "../../../../../../selectors";
import { ROLE } from "../../../../../../bff/constants";



const CommentContainer = ({ className, postId, id , author, publishedAt, content }) => {

    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const userRole = useSelector(selectUserRole);

    const onCommentRemove = (id) => {
        dispatch(openModal({
            text:   'Удалить комментарий?',
            onConfirm:  () => {
                dispatch(removeCommentAsync(requestServer, postId, id));
                dispatch(CLOSE_MODAL)
            },

            onCancel:  () => dispatch(CLOSE_MODAL),
        }));
        
        
    };

    const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);
    
    return (
        <div className={className}>
            <div className="comment">
                <div className="information-panel">
                    <div className="author">
                        <Icon
                            id = "fa-user-circle-o"
                            size="18px"
                            margin="0 10px 0 10px"
                            onClick={() => {}}
                        />    
                        {author}
                    </div>
                    <div className="published-at">
                        <Icon
                            inactive={true}
                            id = "fa-calendar-o"
                            size="18px"
                            margin="0 10px 0 0"
                            onClick={() => {}}
                        /> 
                        {publishedAt}
                    </div> 
                </div>    
                <div className="comment-text">{content}</div>    
            </div>
            {isAdminOrModerator && (
                <Icon
                    id = "fa-trash-o"
                    size="21px"
                    margin="0 0 0 10px"
                    onClick={() => onCommentRemove(id)}
                />  
            )}
            
        </div>
    );
};


export const Comment = styled(CommentContainer)`

    display:    flex;
    width:  100%;
    margin-top: 10px;

    & .comment {
        width:  550px;
        padding: 5px 10px;
        border: 1px solid #000;
    }

    & .information-panel {
        display:    flex;
        justify-content:    space-between;
    }

    & .author {
        display:    flex;
    }

    & .published-at {
        display:   flex;
    }
`;