"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Heading,
  IconButton,
  Kbd,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { Image } from "./Image";
import { QuestionOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import { SettingModal } from "./setting-modal";
import { useCallback, useEffect, useState } from "react";
import { Setting, loadSetting } from "./setting";
import { Cube, cubes } from "./cubes";
import { useKeyboard } from "./use-keyboard";

const randomPick = (cubes: Cube[], currentCubeId?: string) => {
  const cubeCandidates = cubes.filter((cube) => cube.id !== currentCubeId);

  if (cubeCandidates.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * cubeCandidates.length);
  return cubeCandidates[index];
};

const Home = () => {
  const [setting, setSetting] = useState<Setting | null>(null);
  const [enabledCubes, setEnabledCubes] = useState<Cube[] | null>(null);
  const [cube, setCube] = useState<Cube | null>(null);
  const settingDisclosure = useDisclosure();
  const [isShowAlgorithm, setIsShowAlgorithm] = useBoolean();

  const updateCube = useCallback(
    (enabledCubes: Cube[] | null, currentCube: Cube | null) => {
      if (enabledCubes) {
        setCube(randomPick(enabledCubes, currentCube?.id));
      }
    },
    [setCube]
  );

  useKeyboard({
    onKeyDown: (e) => {
      if (e.key === "r") {
        updateCube(enabledCubes, cube);
      }
      if (e.key === "a") {
        setIsShowAlgorithm.on();
      }
      if (e.key === "s") {
        settingDisclosure.onOpen();
      }
    },
  });

  useEffect(() => {
    const setting = loadSetting();
    setSetting(setting);
  }, []);

  useEffect(() => {
    if (!setting) {
      return;
    }
    const enabledCubes = [...setting.f2l, ...setting.oll, ...setting.pll]
      .filter((cube) => cube.enabled)
      .map((cube) => cubes.find((c) => c.id === cube.id)!);
    setEnabledCubes(enabledCubes);
    updateCube(enabledCubes, cube);
  }, [setting, setEnabledCubes, updateCube]);

  useEffect(() => {
    setIsShowAlgorithm.off();
  }, [cube, setIsShowAlgorithm]);

  if (!enabledCubes) {
    return (
      <VStack padding="8">
        <Center height="200px">
          <Spinner color="blue.500" />
        </Center>
      </VStack>
    );
  }

  return (
    <VStack padding="8">
      <HStack width="full">
        <Spacer />
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="Hint"
              icon={<QuestionOutlineIcon />}
              variant="ghost"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody padding="6">
              <Stack>
                <Heading fontSize="lg">Keyboard shortcuts</Heading>
                {[
                  { key: "R", description: "Pick at random" },
                  { key: "A", description: "Show the algorithm" },
                  { key: "S", description: "Open the setting" },
                ].map((shortcut) => (
                  <HStack key={shortcut.key}>
                    <Kbd>{shortcut.key}</Kbd>
                    <Text>{shortcut.description}</Text>
                  </HStack>
                ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <IconButton
          aria-label="Setting"
          icon={<SettingsIcon />}
          variant="ghost"
          onClick={settingDisclosure.onOpen}
        />
        <SettingModal
          isOpen={settingDisclosure.isOpen}
          onClose={settingDisclosure.onClose}
          onChange={setSetting}
          size="5xl"
        />
      </HStack>

      {cube ? (
        <VStack spacing="8">
          <Image
            src={cube.imagePath.cube}
            alt="Cube"
            width="114"
            height="121"
          />
          <ButtonGroup>
            <Button
              colorScheme="blue"
              isDisabled={enabledCubes.length < 2}
              onClick={() => updateCube(enabledCubes, cube)}
            >
              Pick at random
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              isDisabled={isShowAlgorithm}
              onClick={setIsShowAlgorithm.on}
            >
              Forgot the algorithm?
            </Button>
          </ButtonGroup>
          {isShowAlgorithm && (
            <Image
              src={cube.imagePath.cubeWithAlgorithm}
              alt="Cube with algorithm"
              width="547"
              height="142"
            />
          )}
        </VStack>
      ) : (
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="xl"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            There is no valid pattern!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Please select valid patterns in the settings.
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  );
};

export default Home;
