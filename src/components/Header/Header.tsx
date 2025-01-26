import s from "./Header.module.scss";
import burgerIcon from "../../../public/img/icons/burger.svg";
import IHeaderProps from "./Header.props";
import cn from "classnames";

export const Header = ({
  onClickHandler,
  isMenuShown,
  showMenuBtn,
}: IHeaderProps) => {
  return (
    <header className={s.header}>
      {showMenuBtn && (
        <button onClick={onClickHandler} className={s.header__menuBtn}>
          <img
            src={burgerIcon}
            alt="кнопка меню"
            className={cn(s.headerBtnImage, {
              [s.headerBtnImageActivated]: isMenuShown,
            })}
          />
        </button>
      )}
      <div className={s.header__round}>
        <p className={s.header__title}>Study language</p>
      </div>
    </header>
  );
};
