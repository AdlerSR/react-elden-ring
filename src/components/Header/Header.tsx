import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

import Logo from '../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <Flex
      w="100%"
      position="fixed"
      zIndex={999}
      p="10px 120px"
      borderBottom="solid 0.2px #CBA868"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image src={Logo} />
      <Flex w="190px" justifyContent="space-between" alignItems="center">
        <Text
          fontWeight="regular"
          fontFamily="Raleway"
          fontSize="md"
          color="#FFFFFF"
        >
          About
        </Text>
        <Text
          fontWeight="semibold"
          fontFamily="Raleway"
          fontSize="md"
          color="#CBA868"
        >
          Bosses
        </Text>
        <FaBars color="#FFFFFF" size={24} />
      </Flex>
    </Flex>
  );
};

export default Header;
