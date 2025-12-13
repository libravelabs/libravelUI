"use client";

import { CipherText } from "@/components/ui/motion/cipher-text";

export default function CustomConfigCipherText() {
  return (
    <CipherText duration={2.5} speed={0.05} chars="▒░▓█<>/\\_-=+*#%@">
      Decoding Sequence Initialized
    </CipherText>
  );
}
