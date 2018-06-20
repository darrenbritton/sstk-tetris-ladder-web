import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
  height: 100vh;
  background: url("/background.png");
`;

const ButtonIcon = styled.img`
  position: relative;
  margin-left: 11px;
  width: 18px;
  height: 18px;
`;

const TiltedBox = styled(Box)`
    transform: rotate(-15deg);
`;

const HeroText = styled.p`
    font-family: 'Montserrat';
    height: 3.5em;
    font-size: 4em;
    text-align: center;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-image: url(/animation.gif);
`;

class LoggedOut extends Component {
  render() {
    return (
      <Wrapper>
        <Flex flexDirection="column">
          <TiltedBox m="auto" mt="25vh">
            <HeroText>Shutterstock<br/>Tetris</HeroText>
          </TiltedBox>
          <Box m="auto" mt="4vh">
            <Button href="/login" variant="raised" color="primary">
              Login With <ButtonIcon src="/googleLogo.svg" />
            </Button>
          </Box>
        </Flex>
      </Wrapper>
    );
  }
}

export default LoggedOut;
