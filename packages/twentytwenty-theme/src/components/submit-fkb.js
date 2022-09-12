import {connect, styled} from "frontity";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from "react";
import '@aws-amplify/ui-react/dist/styles.css';
import AuthScreen from "./auth-screen";

const SubmitFKB = ({state}) => {

    const routesUrl =  "https://lge10j93qj.execute-api.us-east-1.amazonaws.com/test/routes";
    const attemptsUrl =  "https://lge10j93qj.execute-api.us-east-1.amazonaws.com/test/attempts";

    const [routeName, setRouteName] = useState('');
    const [gender, setGender] = useState('');
    const [report, setReport] = useState('');
    const [routeLink, setRouteLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [routes, setRoutes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const name = state.auth.user.name;
    const id = state.auth.user.id;
    const email = state.auth.user.email;
    const isAuthenticated = state.auth.isAuthenticated;

    const onChangeRouteName = event => setRouteName(event.target.value);
    const onChangeReport = event => setReport(event.target.value);
    const onChangeRouteLink = event => setRouteLink(event.target.value);
    const onChangeGender = event => setGender(event.target.value);
    const onChangeStartDate = event => setStartDate(event.target.value);
    const onChangeEndDate = event => setEndDate(event.target.value);
    const onChangeTotalTime = event => setTotalTime(event.target.value);

    const successfulFormSubmit = () => {
      setIsLoading(false);
      setSuccess(true);
      setRouteName('');
      setReport('');
      setRouteLink('');
      setGender('');
      setStartDate('');
      setEndDate('');
      setTotalTime('');
    }

    useEffect(() => {
        fetch(routesUrl).then((response) => {
            response.json().then((routesData) => {
                const routeObj = routesData.Items.filter((route) => route.approved === true);
                setRoutes(routeObj);
            })
        });
    }, []);

    const onSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const putObj = {
        routeName,
        name,
        totalTime,
        id,
        email,
        gender,
        report,
        routeLink,
        startDate,
        endDate,
        approved: false
      };

      const response = await fetch(attemptsUrl, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(putObj),
      });
      
      if(response.ok){
        successfulFormSubmit();
      } else {
        setIsLoading(false);
        setError(true);
      }
    }

    return(
      <>
      {error && <Alert onClose={() => setError(false)} dismissible key={'danger'} variant={'danger'}>Something went wrong with attempt submission, please contact fastestknownbikes@gmail.com.</Alert>}
      {success && <Alert onClose={() => setSuccess(false)} dismissible key={'success'} variant={'success'}> Successfully submitted the route attempt!</Alert>}
      {isLoading && <Spinner />}
      {isAuthenticated ?
        (<FormContainer>
        <Header>Submit a FKB</Header>
          <Form>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>Route</Form.Label>
              <Form.Select aria-label="Default select example" onChange={onChangeRouteName}>
                <option>Choose a route</option>
                {routes.map((route) => (
                    <option>{route.routeName}</option>
                ))}
              </Form.Select>
              <Form.Text>Don't see your route? Go to 'Submit a route' above</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>Gender</Form.Label>
              <Form.Select aria-label="Default select example" onChange={onChangeGender}>
                <option>Choose a gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>Total Elapsed Time</Form.Label>
              <Form.Control type="text" onChange={onChangeTotalTime} />
              <Form.Text>Total Elapsed Time from Start to Finish</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>Start date of attempt</Form.Label>
              <Form.Control type="date" onChange={onChangeStartDate} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>End date of attempt</Form.Label>
              <Form.Control type="date" onChange={onChangeEndDate} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>Route Attempt Report</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={onChangeReport} />
              <Form.Text>How did it go?</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label>Link to public post</Form.Label>
              <Form.Control type="text" placeholder="For example: https://www.strava.com/activities/7656765310"  onChange={onChangeRouteLink} />
              <Form.Text>Link to public strava, garmin etc... activity post</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </FormContainer>)
        : <AuthScreen />
      }
      </>
    );
};

const Header = styled.h2`
  align-items: center;
`;

const FormContainer = styled.div`
  width: 90%;
  margin: auto;
`;

export default connect(SubmitFKB);

