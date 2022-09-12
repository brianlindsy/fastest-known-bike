import { connect, css, Global, Head, styled } from "frontity";
import Switch from "@frontity/components/switch";
import Footer from "./footer";
import globalStyles from "./styles/global-styles";
import FontFaces from "./styles/font-faces";
import Header from "./header";
import Archive from "./archive";
import Loading from "./loading";
import Post from "./post";
import SkipLink from "./styles/skip-link";
import MetaTitle from "./page-meta-title";
import PageError from "./page-error";
import Routes from './routes.js';
import SubmitRoute from "./submit-route";
import SubmitFKB from './submit-fkb';
import Route from './route';
import Script from "../../../../script";
import FKBList from "./fkb-list";
import { Amplify, Auth } from 'aws-amplify';
import {awsExports} from './aws-exports';
import {useEffect} from 'react';
import { Hub } from 'aws-amplify';
import authStyle from '@aws-amplify/ui-react/dist/styles.css';
import {fixCss} from '../../helpers/css'

const fixedCSS = fixCss(authStyle);

Amplify.configure(awsExports);

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state, actions }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  const {setIsAuthenticated} = actions.auth;
  const {setUserFullName, setUserId, setUserEmail} = actions.auth;

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
        location.reload();
        break;
      case 'signUp':
        location.reload();
        break;
      case 'signOut':
        location.reload();
        break;
    }
  });

  const checkUser = async () => {
    await Auth.currentAuthenticatedUser().then((response) => {
      setUserFullName(response.attributes.name);
      setUserId(response.attributes.username);
      setUserEmail(response.attributes.email);
      setIsAuthenticated(true);
    }).catch((error) => {
      setUserFullName('');
      setUserId('');
      setUserEmail('');
      setIsAuthenticated(false);
    })
  };

  useEffect(() => {
    checkUser();
  }, [setIsAuthenticated])
  

  return (
    <>
      {/* Add global styles for the whole site, like body or a's or font-faces. 
        Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles(state.theme.colors)} />
      <Global styles={css(fixedCSS)} />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></Script>
      <FontFaces />

      {/* Add some metatags to the <head> of the HTML. */}
      <MetaTitle />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous"></link>
      </Head>

      {/* Accessibility: Provides ability to skip to main content */}
      <SkipLink as="a" href="#main">
        Skip to main content
      </SkipLink>

      <div style={{ minHeight: "calc(100vh - 190px)" }}>
        {/* Add the header of the site. */}
        <Header />

        {/* Add the main section. It renders a different component depending
        on the type of URL we are in. */}
        <Main id="main">
          <Switch>
            <Loading when={data.isFetching} />
            <Archive when={data.isArchive} />
            <Post when={data.isPostType} />
            <Routes when={data.isRoutes} />
            <Route when={data.isRoute} />
            <SubmitRoute when={data.isSubmitRoute} />
            <SubmitFKB when={data.isSubmitTime} />
            <FKBList when={data.isFastestKnownBike} />
            <PageError when={data.isError} />
          </Switch>
        </Main>
      </div>

      <Footer />
    </>
  );
};

export default connect(Theme);

const Main = styled.main`
  display: block;
`;
