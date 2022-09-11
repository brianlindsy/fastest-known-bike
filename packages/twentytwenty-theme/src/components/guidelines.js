import { styled, connect } from "frontity";
import SectionContainer from "./styles/section-container";

const description = (
  <>
    The guidelines for submitting routes and times is coming soon!
  </>
);

// The Error page component
const Guidelines = ({ state }) => {

  const title = "Guidelines";

  return (
    <Container size="thin">
      <EntryTitle>{title}</EntryTitle>
      <IntroText>{description}</IntroText>
    </Container>
  );
};

export default connect(Guidelines);

export const EntryTitle = styled.h1`
  margin: 0;

  @media (min-width: 700px) {
    font-size: 6.4rem !important;
  }

  @media (min-width: 1200px) {
    font-size: 8.4rem !important;
  }
`;

const IntroText = styled.div`
  margin-top: 2rem;
  line-height: 1.5;

  @media (min-width: 700px) {
    font-size: 2rem;
    margin-top: 2.5rem;
  }
`;

const Container = styled(SectionContainer)`
  text-align: center;
  padding-top: 8rem;
`;
