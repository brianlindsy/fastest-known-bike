import {connect, styled} from "frontity";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useState, useRef } from "react";
import Alert from 'react-bootstrap/Alert';
import { v4 as uuidv4 } from 'uuid';
import AuthScreen from "./auth-screen";

const SubmitRoute = ({state}) => {
    const isAuthenticated = state.auth.isAuthenticated;

    const name = state.auth.user.name;
    const id = state.auth.user.id;
    const email = state.auth.user.email;

    const routesUrl =  "https://lge10j93qj.execute-api.us-east-1.amazonaws.com/test/routes";
    const getSignedUrl =  "https://lge10j93qj.execute-api.us-east-1.amazonaws.com/test/getSignedUrl";

    const [routeName, setRouteName] = useState('');
    const [routeLocation, setRouteLocation] = useState('');
    const [routeDistance, setRouteDistance] = useState('');
    const [routeDescription, setRouteDescription] = useState('');
    const [roadChecked, setRoadChecked] = useState(false);
    const [gravelChecked, setGravelChecked] = useState(false);
    const [technicalChecked, setTechnicalChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState();
    const ref = useRef();

    const onChangeRouteName = event => setRouteName(event.target.value);
    const onChangeRouteLocation = event => setRouteLocation(event.target.value);
    const onChangeRouteDistance = event => setRouteDistance(event.target.value);
    const onChangeRouteDescription = event => setRouteDescription(event.target.value);
    const onChangeRoadChecked = event => setRoadChecked(event.target.checked);
    const onChangeGravelChecked = event => setGravelChecked(event.target.checked);
    const onChangeTechnicalChecked = event => setTechnicalChecked(event.target.checked);
    
    const s3FileName = uuidv4() + '.gpx';

    const successfulFormSubmit = () => {
      setIsLoading(false);
      setSuccess(true);
      setRouteName('');
      setRouteDistance('');
      setRouteLocation('');
      setRouteDescription('');
      setRoadChecked(false);
      setGravelChecked(false);
      setTechnicalChecked(false);
      ref.current.value = "";
      setFile();
    }

    const putRoute = async () => {
      let terrain = [];
      if(roadChecked){
        terrain.push('road');
      }
      if(gravelChecked){
        terrain.push('gravel');
      }
      if(technicalChecked){
        terrain.push('technical');
      }
      const terrainStr = terrain.join();
      const putObj = {
        routeName: routeName,
        routeLocation: routeLocation,
        routeDistance: routeDistance,
        routeDescription: routeDescription,
        terrain: terrainStr,
        s3FileName,
        createdByName: name,
        createdById: id,
        createdByEmail: email,
        approved: false
      };

      console.log(putObj);
      await fetch(routesUrl, {
        method: 'PUT',
        body: JSON.stringify(putObj),
      }).then((response) => {
        if(response.ok){
          successfulFormSubmit();
        } else {
          setIsLoading(false);
          setError(true);
        }
      }).catch((error) => {
        setIsLoading(false);
        setError(true);
      });
    }

    const onSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      const uploadUrl = await getS3UploadUrl();

      const uploadComplete = await uploadRouteToS3(uploadUrl);

      if(uploadComplete){
        await putRoute();
      }
    }

    const handleFile = (file) => {
      setFile(file[0]);
    };

    const uploadRouteToS3 = async (uploadUrl) => {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          "Content-Type": "application/gpx+xml"
        }
      });

      if(response.ok){
        return true;
      } else {
        setIsLoading(false);
        setError(true);
        return false;
      }
    };

    const getS3UploadUrl = async () => {
      const getSignedUrlBody = {
        fileName: s3FileName
      };
      const response = await fetch(getSignedUrl, {
        method: 'POST',
        body: JSON.stringify(getSignedUrlBody),
        mode: 'cors',
      });
      const body = await response.json();
      return Object.values(body)[0];
    }

    return(
      <>
      {error && <Alert onClose={() => setError(false)} dismissible key={'danger'} variant={'danger'}>Something went wrong with route submission, please contact fastestknownbikes@gmail.com.</Alert>}
      {success && <Alert onClose={() => setSuccess(false)} dismissible key={'success'} variant={'success'}> Successfully submitted the route!</Alert>}
      {isLoading && <Spinner />}
      {isAuthenticated ?
        (<FormContainer>
            <Header>Submit a route</Header>
            <SubHeader>Please read the Guidelines before submitting a route!</SubHeader>
              <Form>
                <Form.Group className="mb-3" controlId="formRouteName">
                  <Form.Label>Route name</Form.Label>
                  <Form.Control type="text" value={routeName} placeholder="Route name" onChange={onChangeRouteName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRouteLocation">
                  <Form.Label>Route Location</Form.Label>
                  <Form.Control type="text" value={routeLocation} placeholder="Flagstaff, AZ" onChange={onChangeRouteLocation} />
                  <Form.Text>Enter the City, State of the starting point, i.e. Flagstaff, AZ</Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Terrain Types (Check all that apply)</Form.Label>
                  <Form.Check 
                    type={'checkbox'}
                    id={'checkbox-road'}
                    label={'Road'}
                    checked={roadChecked}
                    onChange={onChangeRoadChecked}
                  />
                  <Form.Check 
                    type={'checkbox'}
                    id={'checkbox-gravel'}
                    label={'Gravel'}
                    checked={gravelChecked}
                    onChange={onChangeGravelChecked}
                  />
                  <Form.Check 
                    type={'checkbox'}
                    id={'checkbox-technical'}
                    label={'Technical'}
                    checked={technicalChecked}
                    onChange={onChangeTechnicalChecked}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRouteDistance">
                  <Form.Label>Distance</Form.Label>
                  <Form.Control type="text" value={routeDistance} placeholder="Distance" onChange={onChangeRouteDistance} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" value={routeDescription} rows={3} onChange={onChangeRouteDescription} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload the GPX file of the route</Form.Label>
                  <Form.Control type="file" ref={ref} onChange={(e) => handleFile(e.target.files)} />
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

const SubHeader = styled.h5`
  align-items: center;
`;

const FormContainer = styled.div`
  width: 50%;
  margin: auto;
`;

export default connect(SubmitRoute);

