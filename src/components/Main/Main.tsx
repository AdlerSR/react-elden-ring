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

const bosses = [
  {
    name: 'Malenia',
    description:
      'Born as a twin to Miquella, Malenia is known as the most powerful of the Empyreans. Wielding a prosthetic arm and leg, Malenia is located in Elphael, Brace of the Haligtree.',
    backgroundImage: Malenia,
    drops: [
      { name: '480,000 runes', type: 'rune' },
      { name: `Malenia's Great Rune`, type: 'item' },
      { name: 'Remembrance of the Rot Goddess', type: 'item' },
    ],
  },
  {
    name: 'Radahn',
    description: `Starscourge Radahn is a massive and destructive demigod located in Caelid, where he can be accessed from Redmane Castle after using the Grand Lift of Dectus or progressing far enough in Ranni's questline.`,
    backgroundImage: Radhan,
    drops: [
      { name: '70,000 runes', type: 'rune' },
      { name: `Radahn's Great Rune`, type: 'item' },
      { name: 'Remembrance of the Starscourge', type: 'item' },
    ],
  },
  {
    name: 'Rennala',
    description:
      'Rennala, Queen of the Full Moon is one of the demigods that players may have to defeat in order to advance the story forward. She is found in the Academy of Raya Lucaria.',
    backgroundImage: Rennala,
    drops: [
      { name: '40,000  runes', type: 'rune' },
      { name: 'Great Rune of the Unborn', type: 'item' },
      { name: 'Remembrance of the Full Moon Queen', type: 'item' },
    ],
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
        {bosses.map((boss, index) => (
          <Section
            key={boss.name}
            boss={boss}
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
