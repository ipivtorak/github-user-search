import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

import { SearchResults } from './searchResults';
import { User } from '../../assets/types';
import { SEARCH_USERS_URL, USERS_PER_PAGE } from "../../assets/constants";


let timerId: ReturnType<typeof setTimeout>;

export const Root: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMorePages, setHasMorePages] = useState<boolean>(true);

    useEffect(() => {
        getUsers();
    }, [username]);

    const getUsers = (): void => {
        if (!username) return;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fetch(`${SEARCH_USERS_URL}?${
                new URLSearchParams({
                    per_page: USERS_PER_PAGE,
                    q: username,
                    page: String(page)
                })
            }`)
                .then(response => response.json())
                .then(({ items, total_count }) => {
                    if (total_count > users.length + items.length) {
                        setHasMorePages(true);
                        setPage(page + 1);
                    } else {
                        setHasMorePages(false);
                    }
                    setUsers([...users, ...items]);
                })
                .catch(() => {
                    setIsError(true);
                    setHasMorePages(false);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 1000);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUsername(e.target.value.trim());
        setPage(1);
        setUsers([]);
        setIsLoading(true);
        setIsError(false);
    };

    return (
        <div style={{ height: '90vh' }}>
            <InputGroup className="mb-3" size="lg">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                    value={username}
                />
            </InputGroup>
            {username && <SearchResults {...{ isLoading, users, getUsers, hasMorePages, isError }} />}
            {isError && <p className="text-center pb-4">Something went wrong. Please try again later</p>}
        </div>
    );
};
