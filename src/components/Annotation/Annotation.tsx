import s from "./Annotation.module.scss";
import { IAnnotationProps } from "./Annotation.props";

const Annotation = ({ prefixText, mainText }: IAnnotationProps) => {
  return (
    <div className={s.annotaion}>
      <p className={s.prefixText}>{prefixText}</p>
      <p className={s.mainText}>{mainText}</p>
    </div>
  );
};

export default Annotation;
