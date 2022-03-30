import React from 'react';
import { ChakraProvider, Box, BoxProps } from '@chakra-ui/react';
import { motion, useElementScroll } from 'framer-motion';

import useWindowSize from '../../hooks/useWindowResize';

import Section from '../Section';
import Header from '../Header';

import Malenia from '../../assets/malenia.png';
import Radhan from '../../assets/radahn.png';
import Rennala from '../../assets/rennala.png';

export const MotionBox = motion<BoxProps>(Box);

const chars = [
  {
    name: 'Malenia',
    description:
      'Born as a twin to Miquella, Malenia is known as the most powerful of the Empyreans. Wielding a prosthetic arm and leg, Malenia is located in Elphael, Brace of the Haligtree.',
    backgroundImage: Malenia,
  },
  {
    name: 'Radahn',
    description:
      'Starscourge Radahn is a massive and destructive demigod located in Caelid, where he can be accessed from Redmane Castle after using the Grand Lift of Dectus or progressing far enough in Ranni&apos;s questline.',
    backgroundImage: Radhan,
  },
  {
    name: 'Rennala',
    description:
      'Rennala, Queen of the Full Moon is one of the demigods that players may have to defeat in order to advance the story forward. She is found in the Academy of Raya Lucaria.',
    backgroundImage: Rennala,
  },
];

const Main = () => {
  const [elementHeight, setElementHeight] = React.useState(0);

  const sectionsRef = React.useRef<HTMLElement[]>([]);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { scrollY } = useElementScroll(wrapperRef);

  const { height } = useWindowSize();

  React.useEffect(() => {
    setElementHeight(sectionsRef.current?.[0].offsetHeight);
  }, [height]);

  return (
    <ChakraProvider>
      <Box
        scrollSnapType="y mandatory"
        overflowY="scroll"
        h="100vh"
        ref={wrapperRef}
      >
        <Header />
        {chars.map((char, index) => (
          <Section
            key={char.name}
            char={char}
            elementHeight={elementHeight}
            index={index}
            scroll={scrollY}
            ref={(element: HTMLElement) =>
              (sectionsRef.current[index] = element)
            }
          />
        ))}
      </Box>
    </ChakraProvider>
  );
};

export default Main;
