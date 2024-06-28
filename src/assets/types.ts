export type User = {
    login: string
};

export type UserProfile = {
    avatar_url: string,
    name: string,
    login: string,
    company: string,
    followers: string,
    following: string,
    email: string,
    blog: string
};

export type SearchResultsProps = {
    isLoading: boolean,
    users: User[],
    getUsers: () => void,
    hasMorePages: boolean,
    isError: boolean
};
