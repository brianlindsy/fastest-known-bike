import {connect, styled} from "frontity";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";

const Attempts = () => {

    const attemptsUrl =  "https://lge10j93qj.execute-api.us-east-1.amazonaws.com/test/attempts";

    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        fetch(attemptsUrl).then((response) => {
            response.json().then((attemptData) => {
                const attemptObj = attemptData.Items.filter((attempt) => attempt.approved === true);
                setAttempts(attemptObj);
            })
        });
    }, []);

    return(
        <RoutesContainer>
            <Header>Fastest Known Bikes</Header>
            <StyledTable striped bordered hover>
                <thead>
                    <tr>
                    <th>Route Name</th>
                    <th>Biker</th>
                    <th>Gender</th>
                    <th>Total Time</th>
                    <th>Started At</th>
                    <th>Ended At</th>
                    <th>Route Link</th>
                    </tr>
                </thead>
                <tbody>
                {attempts.map((attempt) => (
                    <tr>
                        <td>{attempt.routeName}</td>
                        <td>{attempt.name}</td>
                        <td>{attempt.gender}</td>
                        <td>{attempt.totalTime}</td>
                        <td>{attempt.startDate}</td>
                        <td>{attempt.endDate}</td>
                        <td>{attempt.attemptPostLink}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
        </RoutesContainer>
    );
};

const Header = styled.h2`
`;

const RoutesContainer = styled.div`
    width: 75%;
    margin: auto;
`;

const StyledTable = styled(Table)`
`;

export default connect(Attempts);

