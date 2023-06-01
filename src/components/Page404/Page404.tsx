import React from "react";

import page404 from "../../common/img/page404.png";
import s from "./styles.module.scss";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div className={s.page404}>
      <Link to={"/notes"} className={s.page404__link}>
        Back to tasks
      </Link>
      <img src={page404} alt="page404" />
    </div>
  );
};

