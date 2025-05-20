import OptionItem from './OptionItem';

const AnswerOptions = ({ answereOptions, category, handleAddOption, handleOptionChange, handleCorrectAnswerChange }) => {
  //console.log(answereOptions);
  
  return (
    <div className="p-6 my-2">
      <p className="font-semibold text-lg text-blue-700">Answere Options</p>

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
      <button className='font-semibold text-lg p-1 bg-white text-sky-600 border border-blue-500 rounded'
       type="button" onClick={handleAddOption}>
        Add Option
      </button>
    </div>
  );
};

export default AnswerOptions;
