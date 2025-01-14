import s from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header__round}>
        <p className="header__title">Study language</p>
      </div>
    </header>
  );
};
