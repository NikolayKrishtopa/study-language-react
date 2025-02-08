import { Mode } from "../../models/models";
import vocaburaries from "../../vocaburaries/vocaburaries";
import { ButtonSwitcher } from "../ButtonSwitcher/ButtonSwitcher";
import { IMenuProps } from "./Menu.props";
import "./Menu.scss";

export const Menu = ({
  mode,
  currentVoc,
  swithCurrentVoc,
  switchMode,
}: IMenuProps) => {
  return (
    <div className="menu">
      <p className="menu__title">Выберите изучаемый словарь</p>
      <ButtonSwitcher
        buttons={vocaburaries}
        activeId={currentVoc.id}
        additionalClass="button-switcher__button_type_voc"
        switchHandler={(arg: any) => {
          if (typeof arg !== "number") return;
          swithCurrentVoc(arg);
        }}
      />
      <ButtonSwitcher
        buttons={[
          { id: Mode.STUDY, text: "Изучение", value: Mode.STUDY },
          {
            id: Mode.EXAMINATION_QUESTION,
            text: "Опрос",
            value: Mode.EXAMINATION_QUESTION,
          },
          {
            id: Mode.QUIZ_QUESTION,
            text: "Тест",
            value: Mode.QUIZ_QUESTION,
          },
        ]}
        activeId={
          mode === Mode.EXAMINATION_QUESTION ||
          mode === Mode.EXAMINATION_ANSWER_CORRECT ||
          mode === Mode.EXAMINATION_ANSWER_INCORRECT
            ? Mode.EXAMINATION_QUESTION
            : mode === Mode.QUIZ_QUESTION ||
              mode === Mode.QUIZ_ANSWER_CORRECT ||
              mode === Mode.QUIZ_ANSWER_INCORRECT
            ? Mode.QUIZ_QUESTION
            : Mode.STUDY
        }
        switchHandler={switchMode}
      />
    </div>
  );
};
