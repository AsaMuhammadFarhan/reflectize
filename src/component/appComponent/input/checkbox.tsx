import { HStack, Stack, Text } from "@chakra-ui/react";
import Iconify from "../asset/Iconify";

export default function CustomCheckbox({
  isActive = false,
  onClick = () => { },
  title,
  description,
  icon,
}: {
  isActive?: boolean;
  onClick?: () => void;
  title: string;
  description?: string;
  icon?: string;
}) {

  return (
    <HStack
      boxShadow={isActive
        ? "inset 0px 0px 0px 2px black"
        : undefined
      }
      onClick={() => onClick()}
      borderRadius="10px"
      alignItems="start"
      userSelect="none"
      cursor="pointer"
      bgColor="white"
      p="20px"
    >
      {icon && (
        <Iconify
          boxSize="27px"
          icon={icon}
        />
      )}
      <Stack
        spacing="5px"
        w="100%"
      >
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        {description ? (
          <Text fontSize="sm" fontWeight="light">
            {description}
          </Text>
        ) : <></>}
      </Stack>
    </HStack>
  )
}