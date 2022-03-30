import React from 'react';
import { Box, BoxProps, Stack, TextProps, Text, Flex } from '@chakra-ui/react';
import { motion, Variants, useTransform, MotionValue } from 'framer-motion';

import Noise from '../../assets/noise.png';

const MotionBox = motion<BoxProps>(Box);
const MotionText = motion<Omit<TextProps, 'transition'>>(Text);

const textVariants: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
  },
};

const Section = React.forwardRef<
  HTMLElement,
  {
    char: any;
    elementHeight: number;
    index: number;
    scroll: MotionValue<number>;
  }
>(({ elementHeight, index, scroll, char }, ref) => {
  const y = useTransform(
    scroll,
    [elementHeight * (index + 1) - elementHeight, elementHeight * (index + 1)],
    ['0vh', '100vh'],
  );

  return (
    <MotionBox
      w="100%"
      h="100vh"
      scrollSnapAlign="center"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.5 }}
      ref={ref}
      zIndex={index + 1}
      position="relative"
    >
      <MotionBox
        bg="blue"
        w="100%"
        h="100%"
        p={4}
        color="white"
        style={{ y }}
        bgImage={`radial-gradient(circle, rgba(9,12,17,0.2) 0%, rgba(9,12,17,1) 100%),url(${Noise}), url(${char.backgroundImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Flex alignItems="center" h="100%" p="140px 120px">
          <Stack spacing={3} w="xl">
            <MotionText
              variants={textVariants}
              transition={{ duration: 1 }}
              fontWeight="extrabold"
              fontFamily="Raleway"
              fontSize="9xl"
            >
              {char.name}
            </MotionText>
            <MotionText
              variants={textVariants}
              transition={{ duration: 1, delay: 0.5 }}
              fontWeight="regular"
              fontFamily="Raleway"
              fontSize="lg"
            >
              {char.description}
            </MotionText>
          </Stack>
        </Flex>
      </MotionBox>
    </MotionBox>
  );
});

export default Section;
