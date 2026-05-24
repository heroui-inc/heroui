import type {Metadata} from "next";
import type {FC} from "react";

import {NATIVE_APP} from "@/config/native-app";
import {siteConfig} from "@/config/site";

export const dynamic = "force-static";
const EFFECTIVE_DATE = "May 21, 2026";
const CONTACT_EMAIL: string = siteConfig.supportEmail;

export const metadata: Metadata = {
  description: [
    "Privacy policy for the ",
    NATIVE_APP.NAME,
    " mobile app — how the app handles personal data, analytics, deep links, and authentication.",
  ].join(""),
  title: ["Privacy Policy", NATIVE_APP.NAME, "HeroUI"].join(" | "),
};

const PrivacyPolicyPage: FC = () => {
  return (
    <div className="prose mx-auto max-w-3xl px-4 py-24">
      <h1>Privacy Policy</h1>
      <p>Effective Date: {EFFECTIVE_DATE}</p>

      <p>
        {[
          "The ",
          NATIVE_APP.NAME,
          " app (the “App”) is an interactive showcase that lets developers and designers preview, explore, and interact with the components, blocks, and patterns shipped by the HeroUI Native UI library. It is designed as a reference and evaluation tool to help teams adopt HeroUI Native in their own React Native applications.",
        ].join("")}
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        {[
          "We do not collect, store, or share any personal data. The ",
          NATIVE_APP.NAME,
          " app does not require an account, does not track user behaviour, and does not send usage statistics, crash reports, or analytics data to HeroUI or any third party.",
        ].join("")}
      </p>

      <h2>2. Authentication</h2>
      <p>
        No authentication mechanisms are currently implemented. If authentication is added in the
        future, this Privacy Policy will be updated to reflect that change.
      </p>

      <h2>3. Deep Links and Universal Links</h2>
      <p>
        {[
          "The ",
          NATIVE_APP.NAME,
          " app handles Universal Links and custom-scheme deep links that point at component previews on the HeroUI documentation site. When the App opens a deep link, the destination URL is resolved entirely on-device by the App’s native intent handler — the link target is never transmitted to a HeroUI-operated server or any third-party tracking service.",
        ].join("")}
      </p>

      <h2>4. Data Usage and Sharing</h2>
      <p>Since we do not collect any data, we do not share any data with third parties.</p>

      <h2>5. Permissions</h2>
      <p>
        {[
          "The ",
          NATIVE_APP.NAME,
          " app does not request access to the camera, microphone, contacts, location, photo library, or any other sensitive device capability. If a future component preview requires a specific permission, the operating system will prompt you at the moment that preview is opened, and you may decline without losing access to the rest of the App.",
        ].join("")}
      </p>

      <h2>6. Children’s Privacy</h2>
      <p>
        {[
          "The ",
          NATIVE_APP.NAME,
          " app is a developer tool intended for a general audience and is not directed at children under the age of 13. We do not knowingly collect any personal information from anyone, including children.",
        ].join("")}
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        {[
          "We may update this Privacy Policy as the ",
          NATIVE_APP.NAME,
          " app evolves. When we do, we will revise the “Effective Date” at the top of this page. For significant changes, we may also surface additional notice within the App itself.",
        ].join("")}
      </p>

      <h2>8. Contact</h2>
      <p>
        {[
          "If you have any questions about this Privacy Policy or the ",
          NATIVE_APP.NAME,
          " app, please contact us at: ",
        ].join("")}
        <a href={["mailto:", CONTACT_EMAIL].join("")}>{CONTACT_EMAIL}</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
