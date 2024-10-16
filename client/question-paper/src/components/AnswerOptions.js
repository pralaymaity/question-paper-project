
import OptionItem from './OptionItem';
import "../style/answereOptions.css"

const AnswerOptions = ({ answereOptions, category, handleAddOption, handleOptionChange, handleCorrectAnswerChange }) => {
  //console.log(answereOptions);
  
  return (
    <div className="answereOptions">
      <h3>Answere Options</h3>
      {answereOptions.map((option, index) => (
        <OptionItem
          key={index}
          index={index}
          option={option}
          category={category}
          handleOptionChange={handleOptionChange}
          handleCorrectAnswerChange={handleCorrectAnswerChange}
        />
      ))}
      <button type="button" onClick={handleAddOption}>
        Add Option
      </button>
    </div>
  );
};

export default AnswerOptions;
