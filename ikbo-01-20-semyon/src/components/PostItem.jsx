import React from 'react';
import Button from "./UI/button/Button";
import {useNavigate} from 'react-router-dom';

const PostItem = (props) => {
    const navigate = useNavigate();

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <Button onClick={() => navigate(`/posts/${props.post.id}`)}>Открыть</Button>
                <Button onClick={() => props.remove(props.post)}>Удалить</Button>
            </div>
        </div>
    );
};

export default PostItem;