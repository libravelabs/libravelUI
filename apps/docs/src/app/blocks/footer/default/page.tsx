import { AppFooter } from "./components/app-footer";

export default function FooterDefaultPage() {
  return (
    <>
      <div className="flex w-full h-full min-h-200">
        <h1 className="m-auto">Scroll to bottom</h1>
      </div>

      <AppFooter />
    </>
  );
}
