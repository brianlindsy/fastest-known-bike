import { connect, styled } from "frontity";
import Link from "./link";
import Navigation from "./navigation/navigation";
import MobileMenuButton from "./mobile/menu-button";
import MobileMenuModal from "./mobile/menu-modal";
import logo from './../assets/fkb-logo.png';
import UserHeader from "./user-header";


const Header = ({state}) => {
  const { title, description } = state.frontity;
  const { headerBg } = state.theme.colors;

  const name = state.auth.user.name;

  const isMobile = state.isMobile;

  return (
    <PageHeader bg={headerBg} id="site-header">
      <HeaderInner>
        <TitleWrapper>
          <Logo src={logo}></Logo>

          {/* Heading and Description of the site */}
          <TitleGroup>
            <SiteTitle>
              <StyledLink link="/">{title}</StyledLink>
            </SiteTitle>
            <SiteDescription>{description}</SiteDescription>
          </TitleGroup>

          {/* Mobile menu button and modal */}
          <MobileMenuButton />
          <MobileMenuModal />
        </TitleWrapper>

        {
        !isMobile &&
          <HeaderNavigationWrapper>
            {/* Desktop navigation links */}
            <Navigation />
            <UserHeader />
          </HeaderNavigationWrapper>
        }
      </HeaderInner>
    </PageHeader>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Logo = styled.img`
  height: 100px;
  width: 100px;
`;

const TitleGroup = styled.div`
  @media (min-width: 1000px) {
    align-items: baseline;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: -1rem 0 0 -2.4rem;
  }
`;

const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
  text-align: center;
  width: 100%;
  padding: 0.5rem;

  @media (min-width: 1000px) {
    width: auto;
    margin-right: 4rem;
    max-width: 50%;
    padding: 0;
    text-align: left;
  }
`;

const PageHeader = styled.header`
  z-index: 1;
  background: ${(props) => props.bg};
  position: relative;
`;

const HeaderInner = styled.div`
  align-items: start;
  display: flex;
  justify-content: space-between;
  max-width: 180rem;
  padding: 0.5rem;
  z-index: 100;
`;

const SiteTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 600;
  line-height: 1;
  margin: 0;

  @media (min-width: 1000px) {
    margin: 1rem 0 0 2.4rem;
  }
  @media (min-width: 700px) {
    font-size: 2.4rem;
    font-weight: 700;
  }
`;

const SiteDescription = styled.div`
  margin: 0;
  margin-top: 1rem;
  color: #6d6d6d;
  font-size: 1.8rem;
  font-weight: 500;
  display: none;
  letter-spacing: -0.0311em;
  transition: all 0.15s linear;

  @media (min-width: 1000px) {
    margin: 1rem 0 0 2.4rem;
  }

  @media (min-width: 700px) {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderNavigationWrapper = styled.div`
  display: none;

  @media (min-width: 1000px) {
    align-items: center;
    text-align: center;
    display: flex;
    margin-top: 2rem;
  }
`;
