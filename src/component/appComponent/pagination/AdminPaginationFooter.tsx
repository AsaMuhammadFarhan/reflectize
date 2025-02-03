import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Fragment } from "react";
import { pageDisplayedIndex } from "~/utils/pagination";
import Iconify from "../asset/Iconify";

const AdminPaginationFooter = ({
  pageIndex,
  maxPage,
  onChangePage,
  numberDisplayed,
  setNumberDisplayed,
  showBaris = true,
  nameOfList = "Row",
  minW,
  showBarisOptions = [5, 10, 20],
}: {
  pageIndex: number;
  maxPage: number;
  onChangePage: (to: number) => void;
  numberDisplayed: string;
  setNumberDisplayed: (max: string) => void;
  showBaris?: boolean;
  nameOfList?: string;
  minW?: string;
  showBarisOptions?: number[];
}) => {
  const displayedPageIndex = pageDisplayedIndex(pageIndex, maxPage);

  return (
    <Stack
      direction={["column", "column", "row"]}
      justify="space-between"
      alignItems="center"
      userSelect="none"
      spacing="16px"
    >
      {showBaris ? (
        <>
          <Flex alignItems="center" minW={minW}>
            <Text
              letterSpacing="0.25px"
              fontWeight={700}
              fontSize="14px"
              color="black"
              mr="16px"
            >
              Show:
            </Text>
            <Select
              onChange={(event) => {
                onChangePage(0);
                setNumberDisplayed(event.target.value);
              }}
              value={numberDisplayed}
              color="black"
              minW="140px"
              w="140px"
            >
              {showBarisOptions.map((opt) => (
                <option value={`${opt}`} key={`${opt}`}>
                  {opt} {nameOfList}
                </option>
              ))}
            </Select>
          </Flex>
        </>
      ) : (
        <></>
      )}

      <Flex
        direction="column"
        alignItems="end"
        width={["fit-content", "fit-content", "100%", "100%"]}
      >
        <Stack direction="row">
          <Button
            onClick={() => onChangePage(pageIndex - 1)}
            userSelect="none"
            minW="40px"
            p="8px"
          >
            <Iconify icon="bx:chevron-left" fontSize="18px" />
          </Button>
          {displayedPageIndex.map((page, index) => (
            <Fragment key={page}>
              <Button
                colorScheme={page === pageIndex ? "blackAlpha" : undefined}
                bgColor={page === pageIndex ? "black" : undefined}
                color={page === pageIndex ? "white" : "black"}
                onClick={() => onChangePage(page)}
                userSelect="none"
                minW="40px"
              >
                {page + 1}
              </Button>
              <Flex
                display={
                  displayedPageIndex[index + 1] !== page + 1 &&
                    page + 1 !== maxPage
                    ? "flex"
                    : "none"
                }
                bgColor="transparent"
                alignItems="center"
                fontWeight={600}
                userSelect="none"
                justify="center"
                fontSize="14px"
                rounded="full"
                color="black"
                w="40px"
                h="40px"
              >
                ...
              </Flex>
            </Fragment>
          ))}
          <Button
            onClick={() => onChangePage(pageIndex + 1)}
            userSelect="none"
            minW="40px"
            p="8px"
          >
            <Iconify icon="bx:chevron-right" fontSize="18px" />
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default AdminPaginationFooter;