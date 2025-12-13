import { InputOTP, InputOTPSlot } from "@/components/ui/core/input-otp";

export default function BasicInputOtp() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTP>
  );
}
