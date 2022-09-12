import { Authenticator } from '@aws-amplify/ui-react';
import {styled, connect} from "frontity";
import React from 'react';

const AuthScreen = ({state}) => {
    return (
        <StyledAuthScreen>
            <h5>{'Please sign in or create an account to submit a route or FKB.'}</h5>
            <Authenticator signUpAttributes={['email', 'name']} />
        </StyledAuthScreen>
    );
}

const StyledAuthScreen = styled.div`
    width: 75%;
    height: 50%;
    margin: auto;
`;

export default connect(AuthScreen);