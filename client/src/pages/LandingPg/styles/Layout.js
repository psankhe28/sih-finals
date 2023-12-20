import styled from "styled-components";

export const OuterLayout = styled.section`

  padding: 1rem 8rem;
  @media screen and (max-width: 1347px) {
    padding: 2rem 4rem;
  }
  @media screen and (max-width: 1186px) {
    padding: 2rem 2rem;
  }
  @media screen and (max-width: 990px) {
    padding: 2rem 1rem;
  }
`;



export const InnerLayout = styled.section`
  padding: 2rem 0;
`;
