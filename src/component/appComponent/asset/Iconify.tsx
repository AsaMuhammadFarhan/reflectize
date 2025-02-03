import { Flex, FlexProps, ResponsiveValue } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const Iconify = ({
  icon,
  boxSize = "16px",
  ...rest
}: Omit<FlexProps, "boxSize"> & {
  icon: string;
  boxSize?: ResponsiveValue<string | number>;
}) => {
  return (
    <Flex
      flexShrink={rest.flexShrink ?? 0}
      fontSize={boxSize}
      boxSize={boxSize}
      {...rest}
    >
      <Icon icon={icon} />
    </Flex>
  )
}

export default Iconify;