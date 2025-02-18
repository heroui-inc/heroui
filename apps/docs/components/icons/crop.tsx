import {IconSvgProps} from "@/types";

export const CropMinimalistic = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-label="Minimalistic Crop"
    focusable="false"
    height={size || height}
    viewBox="0 0 20 20"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M4.16699 1.04169C4.51217 1.04169 4.79199 1.32151 4.79199 1.66669V9.16669C4.79199 10.7557 4.79332 11.8846 4.90846 12.741C5.02118 13.5794 5.23257 14.0624 5.58524 14.4151C5.93792 14.7678 6.42096 14.9792 7.25937 15.0919C8.11575 15.207 9.24464 15.2084 10.8337 15.2084H18.3337C18.6788 15.2084 18.9587 15.4882 18.9587 15.8334C18.9587 16.1785 18.6788 16.4584 18.3337 16.4584H16.4587V18.3334C16.4587 18.6785 16.1788 18.9584 15.8337 18.9584C15.4885 18.9584 15.2087 18.6785 15.2087 18.3334V16.4584H10.7867C9.25518 16.4584 8.04215 16.4584 7.09281 16.3307C6.11579 16.1994 5.325 15.9226 4.70136 15.299C4.07773 14.6754 3.80096 13.8846 3.6696 12.9075C3.54197 11.9582 3.54198 10.7452 3.54199 9.2137L3.54199 4.79169H1.66699C1.32181 4.79169 1.04199 4.51187 1.04199 4.16669C1.04199 3.82151 1.32181 3.54169 1.66699 3.54169H3.54199V1.66669C3.54199 1.32151 3.82181 1.04169 4.16699 1.04169ZM12.7413 4.90815C11.8849 4.79301 10.756 4.79169 9.16699 4.79169H6.66699C6.32181 4.79169 6.04199 4.51187 6.04199 4.16669C6.04199 3.82151 6.32181 3.54169 6.66699 3.54169L9.21401 3.54169C10.7455 3.54167 11.9585 3.54166 12.9078 3.6693C13.8849 3.80066 14.6757 4.07742 15.2993 4.70106C15.9229 5.32469 16.1997 6.11548 16.331 7.0925C16.4587 8.04185 16.4587 9.25488 16.4587 10.7863V13.3334C16.4587 13.6785 16.1788 13.9584 15.8337 13.9584C15.4885 13.9584 15.2087 13.6785 15.2087 13.3334V10.8334C15.2087 9.24434 15.2073 8.11545 15.0922 7.25906C14.9795 6.42065 14.7681 5.93761 14.4154 5.58494C14.0627 5.23226 13.5797 5.02087 12.7413 4.90815Z"
      fill="#A1A1AA"
      fillRule="evenodd"
    />
  </svg>
);

export const Crop = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-label="Crop"
    focusable="false"
    height={size || height}
    viewBox="0 0 20 20"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M4.16699 1.04163C4.51217 1.04163 4.79199 1.32145 4.79199 1.66663V9.16663C4.79199 10.7556 4.79332 11.8845 4.90846 12.7409C5.02118 13.5793 5.23257 14.0624 5.58524 14.415C5.93792 14.7677 6.42096 14.9791 7.25937 15.0918C8.11575 15.207 9.24464 15.2083 10.8337 15.2083H18.3337C18.6788 15.2083 18.9587 15.4881 18.9587 15.8333C18.9587 16.1785 18.6788 16.4583 18.3337 16.4583H16.4587V18.3333C16.4587 18.6785 16.1788 18.9583 15.8337 18.9583C15.4885 18.9583 15.2087 18.6785 15.2087 18.3333V16.4583H10.7867C9.25518 16.4583 8.04215 16.4583 7.09281 16.3307C6.11579 16.1993 5.325 15.9226 4.70136 15.2989C4.07773 14.6753 3.80096 13.8845 3.6696 12.9075C3.54197 11.9581 3.54198 10.7451 3.54199 9.21364L3.54199 4.79163H1.66699C1.32181 4.79163 1.04199 4.5118 1.04199 4.16663C1.04199 3.82145 1.32181 3.54163 1.66699 3.54163H3.54199V1.66663C3.54199 1.32145 3.82181 1.04163 4.16699 1.04163ZM12.7413 4.90809C11.8849 4.79295 10.756 4.79163 9.16699 4.79163H6.66699C6.32181 4.79163 6.04199 4.5118 6.04199 4.16663C6.04199 3.82145 6.32181 3.54163 6.66699 3.54163L9.21401 3.54163C10.7455 3.54161 11.9585 3.5416 12.9078 3.66924C13.8849 3.80059 14.6757 4.07736 15.2993 4.701C15.9229 5.32463 16.1997 6.11542 16.331 7.09244C16.4587 8.04179 16.4587 9.25482 16.4587 10.7863V13.3333C16.4587 13.6785 16.1788 13.9583 15.8337 13.9583C15.4885 13.9583 15.2087 13.6785 15.2087 13.3333V10.8333C15.2087 9.24428 15.2073 8.11539 15.0922 7.259C14.9795 6.42059 14.7681 5.93755 14.4154 5.58488C14.0627 5.2322 13.5797 5.02081 12.7413 4.90809ZM9.54252 6.45829H10.4581C11.0122 6.45826 11.4896 6.45823 11.8719 6.50963C12.2816 6.56471 12.6743 6.68893 12.9928 7.00747C13.3114 7.32601 13.4356 7.71873 13.4907 8.12842C13.5421 8.51071 13.542 8.9881 13.542 9.54215V10.4578C13.542 11.0118 13.5421 11.4892 13.4907 11.8715C13.4356 12.2812 13.3114 12.6739 12.9928 12.9925C12.6743 13.311 12.2816 13.4352 11.8719 13.4903C11.4896 13.5417 11.0122 13.5417 10.4581 13.5416H9.54252C8.98846 13.5417 8.51108 13.5417 8.12879 13.4903C7.71909 13.4352 7.32637 13.311 7.00783 12.9925C6.68929 12.6739 6.56508 12.2812 6.51 11.8715C6.4586 11.4892 6.45863 11.0118 6.45866 10.4578V9.54215C6.45863 8.9881 6.4586 8.51071 6.51 8.12842C6.56508 7.71873 6.68929 7.32601 7.00783 7.00747C7.32637 6.68893 7.71909 6.56471 8.12879 6.50963C8.51108 6.45823 8.98846 6.45826 9.54252 6.45829ZM8.29535 7.74848C8.02426 7.78493 7.93929 7.84377 7.89172 7.89135C7.84414 7.93893 7.7853 8.0239 7.74885 8.29498C7.70999 8.58405 7.70866 8.97637 7.70866 9.58329V10.4166C7.70866 11.0236 7.70999 11.4159 7.74885 11.7049C7.7853 11.976 7.84414 12.061 7.89172 12.1086C7.93929 12.1561 8.02426 12.215 8.29535 12.2514C8.58442 12.2903 8.97674 12.2916 9.58366 12.2916H10.417C11.0239 12.2916 11.4162 12.2903 11.7053 12.2514C11.9764 12.215 12.0614 12.1561 12.1089 12.1086C12.1565 12.061 12.2154 11.976 12.2518 11.7049C12.2907 11.4159 12.292 11.0236 12.292 10.4166V9.58329C12.292 8.97637 12.2907 8.58405 12.2518 8.29498C12.2154 8.0239 12.1565 7.93893 12.1089 7.89135C12.0614 7.84377 11.9764 7.78493 11.7053 7.74848C11.4162 7.70962 11.0239 7.70829 10.417 7.70829H9.58366C8.97673 7.70829 8.58441 7.70962 8.29535 7.74848Z"
      fill="#A1A1AA"
      fillRule="evenodd"
    />
  </svg>
);
