import * as React from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { SearchResultsProps } from "../../../assets/types";


export const SearchResults: React.FC<SearchResultsProps> = ({
    isLoading, users, getUsers, hasMorePages, isError
}) => {
    const spinner = <div className="d-flex justify-content-center mt-5 mb-5"><Spinner/></div>;

    if (isLoading) return spinner;

    if (!users?.length && !isError) return <p className="text-center">No usernames match the search query.</p>;

    return (
        <InfiniteScroll
            dataLength={users.length}
            next={getUsers}
            hasMore={hasMorePages}
            loader={spinner}
        >
            <ListGroup className="mb-5">
                {!!users.length && users.map(({ login }) => (
                    <ListGroup.Item key={login}>
                        <NavLink to={`users/${login}`}>
                            {login}
                        </NavLink>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </InfiniteScroll>
    );
}
