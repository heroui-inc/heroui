import {ToastProvider} from "@heroui/toast";

export default function App({children}) {
  return <ToastProvider>{children}</ToastProvider>;
}
