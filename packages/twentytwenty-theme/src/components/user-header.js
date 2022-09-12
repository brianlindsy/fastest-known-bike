import {connect, styled} from "frontity";
import { Auth } from 'aws-amplify';
import Button from 'react-bootstrap/Button';

const UserHeader = ({state}) => {

    const name = state.auth.user.name;
    const isAuthenticated = state.auth.isAuthenticated;

    const onClickSignOut = () => {
        Auth.signOut();
    }

    return (
        <Wrapper>
            {isAuthenticated && "Hello " + name}
            {isAuthenticated && <Button onClick={onClickSignOut} href="/" variant="primary">Sign Out</Button>}
            {!isAuthenticated && <Button href="/submit-route/" variant="primary">Sign In</Button>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    @media (min-width: 1000px) {
        margin-left: 4rem;
    }
`;

export default connect(UserHeader);