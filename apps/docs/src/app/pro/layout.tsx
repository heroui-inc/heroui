import {Agentation} from "agentation";

import "./pro.css";

export default function ProLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="pro-page">{children}</div>
      {process.env.NODE_ENV === "development" && <Agentation />}
    </>
  );
}
