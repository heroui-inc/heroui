import {IconSvgProps} from "@/types";

export const MirrorLeft = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    focusable="false"
    height={size || height}
    viewBox="0 0 20 20"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M11.1174 2.50001C11.1174 2.15483 11.3972 1.87501 11.7424 1.87501H12.5018C12.8633 1.87501 13.2005 1.87501 13.5128 1.8777C13.858 1.88068 14.1354 2.1629 14.1324 2.50807C14.1294 2.85323 13.8472 3.13063 13.502 3.12765C13.1956 3.12501 12.8635 3.12501 12.5 3.12501H11.7424C11.3972 3.12501 11.1174 2.84518 11.1174 2.50001ZM15.3093 2.54551C15.4118 2.21588 15.762 2.03171 16.0917 2.13416C16.5211 2.26764 16.8934 2.47397 17.2097 2.7903C17.526 3.10662 17.7324 3.47886 17.8659 3.90836C17.9683 4.23798 17.7841 4.58824 17.4545 4.69069C17.1249 4.79313 16.7746 4.60896 16.6722 4.27933C16.589 4.01168 16.477 3.8254 16.3258 3.67418C16.1746 3.52296 15.9883 3.41102 15.7207 3.32784C15.391 3.22539 15.2069 2.87513 15.3093 2.54551ZM17.4919 5.86761C17.8371 5.86463 18.1193 6.14203 18.1223 6.48719C18.125 6.79951 18.125 7.13663 18.125 7.49809V8.63637C18.125 8.98155 17.8452 9.26137 17.5 9.26137C17.1548 9.26137 16.875 8.98155 16.875 8.63637V7.5C16.875 7.1365 16.875 6.80442 16.8724 6.49798C16.8694 6.15281 17.1468 5.87059 17.4919 5.86761ZM17.5 10.7386C17.8452 10.7386 18.125 11.0185 18.125 11.3636V12.5019C18.125 12.8634 18.125 13.2005 18.1223 13.5128C18.1193 13.858 17.8371 14.1354 17.4919 14.1324C17.1468 14.1294 16.8694 13.8472 16.8724 13.502C16.875 13.1956 16.875 12.8635 16.875 12.5V11.3636C16.875 11.0185 17.1548 10.7386 17.5 10.7386ZM17.4545 15.3093C17.7841 15.4118 17.9683 15.762 17.8659 16.0917C17.7324 16.5211 17.526 16.8934 17.2097 17.2097C16.8934 17.526 16.5211 17.7324 16.0917 17.8659C15.762 17.9683 15.4118 17.7841 15.3093 17.4545C15.2069 17.1249 15.391 16.7746 15.7207 16.6722C15.9883 16.589 16.1746 16.4771 16.3258 16.3258C16.477 16.1746 16.589 15.9883 16.6722 15.7207C16.7746 15.391 17.1249 15.2069 17.4545 15.3093ZM14.1324 17.4919C14.1354 17.8371 13.858 18.1193 13.5128 18.1223C13.2005 18.125 12.8634 18.125 12.5019 18.125H11.7424C11.3972 18.125 11.1174 17.8452 11.1174 17.5C11.1174 17.1548 11.3972 16.875 11.7424 16.875H12.5C12.8635 16.875 13.1956 16.875 13.502 16.8724C13.8472 16.8694 14.1294 17.1468 14.1324 17.4919Z"
      fill="#71717A"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M10 1.04167C10.3452 1.04167 10.625 1.32149 10.625 1.66667V18.3333C10.625 18.6785 10.3452 18.9583 10 18.9583C9.65482 18.9583 9.375 18.6785 9.375 18.3333V18.125H9.11966C7.58819 18.125 6.37516 18.125 5.42581 17.9974C4.4488 17.866 3.65801 17.5893 3.03437 16.9656C2.41073 16.342 2.13397 15.5512 2.00261 14.5742C1.87498 13.6248 1.87499 12.4118 1.875 10.8804V9.11966C1.87499 7.58819 1.87498 6.37516 2.00261 5.42582C2.13397 4.4488 2.41073 3.65801 3.03437 3.03437C3.65801 2.41074 4.4488 2.13397 5.42581 2.00262C6.37516 1.87498 7.58819 1.87499 9.11965 1.875L9.375 1.87501V1.66667C9.375 1.32149 9.65482 1.04167 10 1.04167ZM9.375 3.12501H9.16667C7.57765 3.12501 6.44876 3.12633 5.59237 3.24147C4.75397 3.35419 4.27093 3.56558 3.91825 3.91826C3.56558 4.27093 3.35419 4.75397 3.24147 5.59238C3.12633 6.44877 3.125 7.57766 3.125 9.16667V10.8333C3.125 12.4224 3.12633 13.5512 3.24147 14.4076C3.35419 15.246 3.56558 15.7291 3.91825 16.0818C4.27093 16.4344 4.75397 16.6458 5.59237 16.7585C6.44876 16.8737 7.57765 16.875 9.16667 16.875H9.375V3.12501Z"
      fill="#A1A1AA"
      fillRule="evenodd"
    />
  </svg>
);
