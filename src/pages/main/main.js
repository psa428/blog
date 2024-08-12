import { useServerRequest } from "../../hooks";
import { Pagination, PostCard } from "./components";
import { useMemo, useEffect, useState } from "react";
import { PAGINATION_LIMIT } from "../../bff/constants";
import { debounce, getLastPageFromLinks } from "./utils";
import { Search } from "./components";
import styled from "styled-components";


const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const requestServer = useServerRequest();
    const [shouldSearch, setShouldSearch] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');

    useEffect(() => {
        
            requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(({ res: {posts, links }}) => {
                setPosts(posts);
                setLastPage(getLastPageFromLinks(links));
            });    
    }, [requestServer, page, shouldSearch]);

    const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);;
   
    const onSearch = ({ target}) => {
       setSearchPhrase(target.value) ;
       startDelayedSearch(!shouldSearch);
    }

    return (
        <div className={className}>
            <div className="posts-and-search">
                <Search searchPhrase={searchPhrase} onChange={onSearch} />
                {posts.length ? <div className="post-list">

                
                    {posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => <PostCard 
                        key={id}
                        id={id}
                        title={title}
                        imageUrl={imageUrl}
                        publishedAt={publishedAt}
                        commentsCount={commentsCount}
                    
                    />)}
                </div>  
                : <div className="no-posts-found">Статьи не найдены</div>}
            </div>
            {lastPage > 1 && posts.length > 0 && (  
                 <Pagination page={page} lastPage={lastPage} setPage={setPage}/>
            )}
        </div>
        

    );
   

};

export const Main = styled(MainContainer) `

    
        display:    flex;
        flex-direction: column;
        justify-content:    space-between;
        

    & .post-list {
        display:    flex;
        flex-wrap:  wrap;
        padding:    20px;
    }

    & .no-post-found {
        font-size:  18px;
        margin-top: 40px;
        text-align: center;
    }
`;