import { Mode } from "../../models/models";
import vocaburaries from "../../vocaburaries/vocaburaries";
import { ButtonSwitcher } from "../ButtonSwitcher/ButtonSwitcher";
import { IMenuProps } from "./Menu.props";
import "./Menu.scss";
import copyright from "../../utils/copyright";

export const Menu = ({
  mode,
  currentVoc,
  swithCurrentVoc,
  switchMode,
}: IMenuProps) => {
  const isStudy =
    mode === Mode.EXAMINATION_QUESTION ||
    mode === Mode.EXAMINATION_ANSWER_CORRECT ||
    mode === Mode.EXAMINATION_ANSWER_INCORRECT;

  const isQuiz =
    mode === Mode.QUIZ_QUESTION ||
    mode === Mode.QUIZ_ANSWER_CORRECT ||
    mode === Mode.QUIZ_ANSWER_INCORRECT;

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
          {
            id: Mode.STUDY,
            text: copyright.modeName.study.ru,
            value: Mode.STUDY,
          },
          {
            id: Mode.EXAMINATION_QUESTION,
            text: copyright.modeName.exam.ru,
            value: Mode.EXAMINATION_QUESTION,
          },
          {
            id: Mode.QUIZ_QUESTION,
            text: copyright.modeName.quiz.ru,
            value: Mode.QUIZ_QUESTION,
          },
        ]}
        activeId={
          isStudy
            ? Mode.EXAMINATION_QUESTION
            : isQuiz
            ? Mode.QUIZ_QUESTION
            : Mode.STUDY
        }
        switchHandler={switchMode}
      />
    </div>
  );
};
