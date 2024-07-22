import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Form() {
  const [questionAnswerSet, setQuestionAnswerSet] = useState([]);
  const [index, setIndex] = useState(0);
  const [formName, setFormName] = useState("");

  useEffect(() => {}, [questionAnswerSet]);

  const handleAnswerOptionChange = (e, index) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        qASet = {
          ...qASet,
          answerType: e.target.value,
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const submitHandler = (e) => {
    axios
      .post("http://localhost:5000/submitForm", questionAnswerSet)
      .then((res) => console.log(res));
  };

  const addNewQuestionAnswerSet = () => {
    setIndex((prevIndex) => prevIndex + 1);
    setQuestionAnswerSet([
      ...questionAnswerSet,
      {
        type: "question",
        index: index,
        answerType: "TextBox",
        options: [],
        selectedValue: "",
        question: "",
        name: formName,
      },
    ]);
  };

  const handleRadioAnswer = (e, index, optionIndex) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        const mappedArray = qASet.options.map((eachOption, index) => {
          if (index === optionIndex) {
            eachOption = { ...eachOption, checked: true };
          } else {
            eachOption = { ...eachOption, checked: false };
          }
          return eachOption;
        });
        qASet = {
          ...qASet,
          options: mappedArray,
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const handleRadioTextAnswer = (e, index, optionIndex) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        const mappedArray = qASet.options.map((eachOption, index) => {
          if (index === optionIndex) {
            eachOption = { ...eachOption, value: e.target.value };
          }
          return eachOption;
        });

        qASet = {
          ...qASet,
          options: mappedArray,
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const handleCheckedAnswer = (e, index, optionIndex) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        const mappedArray = qASet.options.map((eachOption, index) => {
          if (index === optionIndex) {
            eachOption = { ...eachOption, checked: true };
          }
          return eachOption;
        });

        qASet = {
          ...qASet,
          options: mappedArray,
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const handleQuestionSet = (e, index) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        qASet = {
          ...qASet,
          question: e.target.value,
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const addRadioOption = (index) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        qASet = {
          ...qASet,
          options: [...qASet.options, { checked: false, value: "" }],
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };
  return (
    <div className="app-container">
      <h1>Let us create a form!</h1>
      <label> Form Name: </label>
      <input
        type="text"
        required
        onChange={(e) => setFormName(e.target.value)}
        className="input-class"
      ></input>
      {questionAnswerSet &&
        questionAnswerSet.map((questionAnswerSet, index) => (
          <div className="question-container">
            <input
              name={index}
              type="text"
              placeholder="Type a question..."
              onChange={(e) => handleQuestionSet(e, index)}
            />
            <select
              value={questionAnswerSet.answerType}
              onChange={(e) => handleAnswerOptionChange(e, index)}
            >
              <option name="paragraph">Paragraph</option>
              <option name="text">TextBox</option>
              <option name="radio">Radio</option>
              <option name="checked">Checked</option>
            </select>
            <div className="answer-container width text-center mx-auto my-10">
              {questionAnswerSet.answerType === "TextBox" ? (
                <input
                  type="text"
                  className="answer-textbox"
                  placeholder="Enter your answer..."
                  disabled={true}
                />
              ) : questionAnswerSet.answerType === "Paragraph" ? (
                <textarea disabled={true}></textarea>
              ) : questionAnswerSet.answerType === "Radio" ? (
                <div>
                  {questionAnswerSet.options &&
                    questionAnswerSet.options.map((eachOption, optionIndex) => {
                      return (
                        <>
                          <div class="input-group col-md-4">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input
                                  type="radio"
                                  aria-label="Radio button for following text input"
                                  checked={eachOption.checked}
                                  disabled={true}
                                  onChange={(e) =>
                                    handleRadioAnswer(e, index, optionIndex)
                                  }
                                />
                              </div>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Text input with radio button"
                              value={eachOption.value}
                              onChange={(e) =>
                                handleRadioTextAnswer(e, index, optionIndex)
                              }
                            />
                          </div>
                        </>
                      );
                    })}
                  <button
                    className="submit-button mb-10"
                    onClick={() => addRadioOption(index)}
                  >
                    Add option
                  </button>
                </div>
              ) : questionAnswerSet.answerType === "Checked" ? (
                <div>
                  {questionAnswerSet.options &&
                    questionAnswerSet.options.map((eachOption, optionIndex) => {
                      return (
                        <>
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input
                                  type="checkbox"
                                  aria-label="Checkbox for following text input"
                                  checked={eachOption.checked}
                                  disabled={true}
                                  onChange={(e) =>
                                    handleCheckedAnswer(e, index, optionIndex)
                                  }
                                />
                              </div>
                            </div>
                            <input
                              type="text"
                              class="form-control"
                              aria-label="Text input with checkbox"
                              value={eachOption.value}
                              onChange={(e) =>
                                handleRadioTextAnswer(e, index, optionIndex)
                              }
                            />
                          </div>
                        </>
                      );
                    })}
                  <button
                    className="submit-button mb-10"
                    onClick={() => addRadioOption(index)}
                  >
                    Add option
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      <button
        className="new-question"
        onClick={() => addNewQuestionAnswerSet()}
      >
        Click to add new question.
      </button>
      <Link to="/">
        <button className="submit-button" onClick={() => submitHandler()}>
          Submit
        </button>
      </Link>
    </div>
  );
}

export default Form;
