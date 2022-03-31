import React from 'react';
import {
  Box,
  BoxProps,
  Stack,
  TextProps,
  Text,
  Flex,
  Badge,
  HStack,
  Image,
} from '@chakra-ui/react';
import { motion, Variants, useTransform, MotionValue } from 'framer-motion';

import Noise from '../../assets/noise.png';
import Rune from '../../assets/rune.png';

import Award from '../Icons/Award';

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
        bgImage={`radial-gradient(circle, rgba(9,12,17,0.4) 0%, rgba(9,12,17,1) 100%),url(${Noise}), url(${char.backgroundImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Flex alignItems="center" h="100%" w="100%" p="140px 120px">
          <Stack spacing={4}>
            <Stack w="xl">
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
            <HStack spacing={2}>
              {char.drops.map((drop) => (
                <Flex
                  alignItems="center"
                  p="4px 12px"
                  bgColor="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(100px)"
                  borderRadius="4px"
                >
                  {drop.type === 'rune' ? (
                    <Image src={Rune} w="24px" />
                  ) : (
                    <Award />
                  )}
                  <Text
                    color="#9E9E9F"
                    fontWeight="regular"
                    fontFamily="Raleway"
                    fontSize="md"
                    ml={2}
                  >
                    {drop.name}
                  </Text>
                </Flex>
              ))}
            </HStack>
          </Stack>
        </Flex>
      </MotionBox>
    </MotionBox>
  );
});

export default Section;
