import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        userPoolId: 'us-east-1_ho4sBaclM',

        userPoolWebClientId: '1qhtla8oiclpbka9of833g1v14',
    }
});

// You can get the current config object
const currentConfig = Auth.configure();