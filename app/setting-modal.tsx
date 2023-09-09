"use client";

import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { loadSetting, saveSetting } from "./setting";
import { cubes, f2lCubes, ollCubes, pllCubes } from "./cubes";

const cubeSchema = z.object({ id: z.string(), enabled: z.boolean() });
const formSchema = z.object({
  f2l: z.array(cubeSchema),
  oll: z.array(cubeSchema),
  pll: z.array(cubeSchema),
});

type FieldValues = z.infer<typeof formSchema>;

export const SettingModal = ({
  onChange,
  ...delegated
}: Omit<ModalProps, "children"> & {
  onChange: (newSetting: Setting) => void;
}) => {
  const setting = loadSetting();

  const { register, handleSubmit, control, watch, setValue } =
    useForm<FieldValues>({
      resolver: zodResolver(formSchema),
      defaultValues: setting,
    });

  const f2l = watch("f2l");
  const f2lAllChecked = f2l.every((cube) => cube.enabled);
  const f2lIsIndeterminated =
    f2l.some((cube) => cube.enabled) && !f2lAllChecked;

  const oll = watch("oll");
  const ollAllChecked = oll.every((cube) => cube.enabled);
  const ollIsIndeterminated =
    oll.some((cube) => cube.enabled) && !ollAllChecked;

  const pll = watch("pll");
  const pllAllChecked = pll.every((cube) => cube.enabled);
  const pllIsIndeterminated =
    pll.some((cube) => cube.enabled) && !pllAllChecked;

  const onSubmit = handleSubmit((data) => {
    saveSetting(data);
    onChange(data);
    delegated.onClose();
  });

  return (
    <Modal {...delegated}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Setting</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="setting" noValidate onSubmit={onSubmit}>
            <Stack spacing="6" divider={<StackDivider />}>
              {/* F2L */}
              <Stack>
                <Checkbox
                  isChecked={f2lAllChecked}
                  isIndeterminate={f2lIsIndeterminated}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    f2lCubes.forEach((cube, index) => {
                      setValue(`f2l.${index}.enabled`, checked);
                    });
                  }}
                >
                  <Heading fontSize="lg">F2L</Heading>
                </Checkbox>
                <SimpleGrid columns={4} spacing="1">
                  {f2lCubes.map((cube, index) => (
                    <Box key={cube.id} position="relative">
                      <AspectRatio ratio={547 / 142}>
                        <Image
                          src={cube.imagePath.cubeWithMove}
                          alt={cube.id}
                        />
                      </AspectRatio>
                      <Controller
                        control={control}
                        name={`f2l.${index}.enabled` as const}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Checkbox
                            isChecked={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            position="absolute"
                            top="1"
                            left="1"
                          />
                        )}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>

              {/* OLL */}
              <Stack>
                <Checkbox
                  isChecked={ollAllChecked}
                  isIndeterminate={ollIsIndeterminated}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    ollCubes.forEach((cube, index) => {
                      setValue(`oll.${index}.enabled`, checked);
                    });
                  }}
                >
                  <Heading fontSize="lg">OLL</Heading>
                </Checkbox>
                <SimpleGrid columns={4} spacing="1">
                  {ollCubes.map((cube, index) => (
                    <Box key={cube.id} position="relative">
                      <AspectRatio ratio={547 / 142}>
                        <Image
                          src={cube.imagePath.cubeWithMove}
                          alt={cube.id}
                        />
                      </AspectRatio>
                      <Controller
                        control={control}
                        name={`oll.${index}.enabled` as const}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Checkbox
                            isChecked={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            position="absolute"
                            top="1"
                            left="1"
                          />
                        )}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>

              {/* PLL */}
              <Stack>
                <Checkbox
                  isChecked={pllAllChecked}
                  isIndeterminate={pllIsIndeterminated}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    pllCubes.forEach((cube, index) => {
                      setValue(`pll.${index}.enabled`, checked);
                    });
                  }}
                >
                  <Heading fontSize="lg">PLL</Heading>
                </Checkbox>
                <SimpleGrid columns={4} spacing="1">
                  {pllCubes.map((cube, index) => (
                    <Box key={cube.id} position="relative">
                      <AspectRatio ratio={547 / 142}>
                        <Image
                          src={cube.imagePath.cubeWithMove}
                          alt={cube.id}
                        />
                      </AspectRatio>
                      <Controller
                        control={control}
                        name={`pll.${index}.enabled` as const}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Checkbox
                            isChecked={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            position="absolute"
                            top="1"
                            left="1"
                          />
                        )}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button variant="ghost" onClick={delegated.onClose}>
              Close
            </Button>
            <Button type="submit" form="setting" colorScheme="blue">
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
