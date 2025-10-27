"use client";

import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function ValidateCheckboxGroup() {
  return (
    <Form onSubmit={() => {}} className="space-y-4">
      <CheckboxGroup
        isRequired
        label="Privacy Settings"
        description="Choose what information you want to share publicly."
      >
        <Checkbox
          value="showEmail"
          label="Show my email address"
          description="Allow others to see your email on your profile."
        />
        <Checkbox
          value="showPhone"
          label="Show my phone number"
          description="Make your phone number visible to friends."
        />
        <Checkbox
          value="showPosts"
          label="Show my posts publicly"
          description="Anyone can see your posts, even if they’re not your friends."
        />
        <Checkbox
          value="showFriends"
          label="Show my friends list"
          description="Display your friends list on your profile."
        />
      </CheckboxGroup>

      <Button type="submit">
        <Save />
        Save
      </Button>
    </Form>
  );
}
