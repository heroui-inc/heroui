import Toast from "./toast";
import {ToastProvider} from "./toast-provider";

// export types
export type {ToastProps} from "./toast";

// export hooks
export {useToast} from "./use-toast";
export {addToast, closeAll, closeToast, getToastQueue} from "./toast-provider";

// export component
export {Toast};
export {ToastProvider};
