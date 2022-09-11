import {connect, styled} from "frontity";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import Link from "./link";

const Routes = () => {

    const routesUrl =  "https://lge10j93qj.execute-api.us-east-1.amazonaws.com/test/routes";

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        fetch(routesUrl).then((response) => {
            response.json().then((routesData) => {
                const routeObj = routesData.Items.filter((route) => route.approved === true);
                setRoutes(routeObj);
            })
        });
    }, []);

    return(
        <RoutesContainer>
            <Header>Routes</Header>
            <StyledTable striped bordered hover>
                <thead>
                    <tr>
                    <th>Route Name</th>
                    <th>Location</th>
                    <th>Created By</th>
                    <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                {routes.map((route) => (
                    <tr>
                        <td><Link link={"/routes/" + route.id}>{route.routeName}</Link></td>
                        <td>{route.location}</td>
                        <td>{route.createdByName}</td>
                        <td>{route.distance}</td>
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

export default connect(Routes);

