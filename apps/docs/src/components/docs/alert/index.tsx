import { Playground } from "@/components/playground";
import { BasicAlert, BaseAlertCode } from "./basic-alert";
import { AlertVariants, VariantsAlertCode } from "./alert-variants";
import { CanClosedAlert, CanClosedAlertCode } from "./can-closed-alert";
import { ControlledAlert, ControlledAlertCode } from "./controlled-alert";
import { CustomBuildAlert, CustomBuildAlertCode } from "./custom-build-alert";

export function BasicAlertShowcase() {
  return <Playground preview={<BasicAlert />} code={BaseAlertCode} />;
}

export function VariantsAlertShowcase() {
  return <Playground preview={<AlertVariants />} code={VariantsAlertCode} />;
}

export function CanClosedAlertShowcase() {
  return <Playground preview={<CanClosedAlert />} code={CanClosedAlertCode} />;
}

export function ControlledAlertShowcase() {
  return (
    <Playground preview={<ControlledAlert />} code={ControlledAlertCode} />
  );
}

export function CustomBuildAlertShowcase() {
  return (
    <Playground preview={<CustomBuildAlert />} code={CustomBuildAlertCode} />
  );
}
