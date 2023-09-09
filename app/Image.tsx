import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";

// NextImage に Chakra の style props を渡せるようにしたコンポーネント
// https://github.com/chakra-ui/chakra-ui/issues/7261#issuecomment-1397441949
export const Image = chakra(NextImage, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});
