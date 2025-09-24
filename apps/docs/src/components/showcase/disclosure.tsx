import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from "@/components/ui/disclosure";

export function DisclosureBasic() {
  return (
    <Disclosure>
      <DisclosureTrigger>What’s included in the Pro plan?</DisclosureTrigger>
      <DisclosureContent>
        <p>
          The Pro plan includes unlimited projects, advanced analytics, priority
          support, and integrations with third-party tools like Slack and Google
          Drive.
        </p>
      </DisclosureContent>
    </Disclosure>
  );
}

export function DisclosureVariants() {
  return (
    <div className="space-y-6 w-full">
      <Disclosure>
        <DisclosureTrigger>
          What payment methods are accepted?
        </DisclosureTrigger>
        <DisclosureContent>
          <p>
            We accept all major credit cards, including Visa, MasterCard, and
            American Express. You can also pay using PayPal or bank transfer,
            depending on your region.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure variant="ghost">
        <DisclosureTrigger>Can I change my plan later?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            Yes, you can upgrade or downgrade your subscription at any time from
            your account settings. The changes will take effect immediately, and
            you’ll only be charged for the prorated amount.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure variant="outline">
        <DisclosureTrigger>Do you offer support?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            Absolutely. Our support team is available 24/7 via email and live
            chat. We also have a comprehensive knowledge base to help you
            troubleshoot common issues.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure variant="solid">
        <DisclosureTrigger>Is there a free trial available?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            Yes, we offer a 14-day free trial with full access to all features.
            No credit card is required to start the trial.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure variant="muted">
        <DisclosureTrigger>How do I cancel my subscription?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            You can cancel your subscription anytime from your billing settings.
            Once canceled, you’ll continue to have access until the end of your
            billing cycle.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure variant="separated">
        <DisclosureTrigger>Where is your company located?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            Our headquarters is located in 221b Baker Street, London. However,
            we operate remotely and serve customers from all over the world.
          </p>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}

export function DisclosureSizes() {
  return (
    <section className="space-y-6 w-full">
      <Disclosure size="sm" variant="outline">
        <DisclosureTrigger>What is your refund policy?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            We offer full refunds within 30 days of purchase. If you're not
            satisfied with the product, you can request a refund by contacting
            our support team.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure size="md" variant="outline">
        <DisclosureTrigger>How do I change my account email?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            To change your email, go to account settings, click on "Email", and
            follow the verification steps to update your address.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure size="lg" variant="outline">
        <DisclosureTrigger>
          Can I use this on multiple devices?
        </DisclosureTrigger>
        <DisclosureContent>
          <p>
            Yes, your subscription allows usage on up to 5 devices. Just log in
            using your account credentials and you're good to go.
          </p>
        </DisclosureContent>
      </Disclosure>

      <Disclosure size="xl" variant="outline">
        <DisclosureTrigger>Do you offer team billing?</DisclosureTrigger>
        <DisclosureContent>
          <p>
            We support team-based billing. You can invite team members, assign
            roles, and manage invoices all from your team dashboard.
          </p>
        </DisclosureContent>
      </Disclosure>
    </section>
  );
}
