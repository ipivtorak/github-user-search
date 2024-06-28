import * as React from "react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { Card, Button, Spinner } from "react-bootstrap";

import { UserProfile } from "../../assets/types";
import { FETCH_USER_URL, INITIAL_USER_PROFILE } from "../../assets/constants";

export const User: React.FC = () => {
    const { username } = useParams();
    const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = (): void => {
        setIsLoading(true);
        fetch(`${FETCH_USER_URL}${username}`)
            .then(response => response.json())
            .then(response => {
                if (response.login) setUser(response);
                else throw new Error();
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    };

    if (isLoading) return <Spinner/>;

    const { avatar_url, name, login, company, followers, following, email, blog } = user;

    return <>
        {isError
            ? <p className="text-center pb-4">Something went wrong.</p>
            : <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src={avatar_url} />
                <Card.Body>
                    <Card.Title className="text-center mb-4">{login}</Card.Title>
                    <Card.Subtitle className="text-center mb-3 text-muted">{name}</Card.Subtitle>
                    <div className="d-flex justify-content-around mb-3">
                        <div className="mr-5">Followers: {followers}</div>
                        <div>Following: {following}</div>
                    </div>
                    <div>Email: {email}</div>
                    <div>Company: {company}</div>
                    <div>Blog: {blog}</div>
                </Card.Body>
            </Card>
        }
        <NavLink to="/">
            <Button variant="primary" className="d-block mt-3 mx-auto">
                Back to search
            </Button>
        </NavLink>
    </>;
};
