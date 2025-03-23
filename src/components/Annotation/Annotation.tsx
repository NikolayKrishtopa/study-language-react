import "./Annotation.scss";
import { IAnnotationProps } from "./Annotation.props";

const Annotation = ({ prefixText, mainText }: IAnnotationProps) => {
  return (
    <div className="annotaion">
      <p className="annotaion__prefix-text">{prefixText}</p>
      <p className="annotaion__main-text">{mainText}</p>
    </div>
  );
};

export default Annotation;
