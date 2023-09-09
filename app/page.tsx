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
  IconButton,
  Spacer,
  Spinner,
  VStack,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { Image } from "./Image";
import { SettingsIcon } from "@chakra-ui/icons";
import { SettingModal } from "./setting-modal";
import { useEffect, useState } from "react";
import { Setting, loadSetting } from "./setting";
import { Cube, cubes } from "./cubes";

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
    setCube(randomPick(enabledCubes));
  }, [setting, setEnabledCubes, setCube]);

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
              onClick={() => {
                setCube(randomPick(enabledCubes, cube.id));
              }}
            >
              Random Pick
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
