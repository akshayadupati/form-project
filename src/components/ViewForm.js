import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewForm() {
  const [questionAnswerSet, setQuestionAnswerSet] = useState([]);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const urlParams = useParams();

  useEffect(() => {}, [questionAnswerSet]);
  const getData = () => {
    const requestObject = {
      id: urlParams,
    };
    axios.post("http://localhost:5000/find", requestObject).then((res) => {
      setData(res.data.formData);
    });
  };

  const handleAnswerOptionChange = (e, index) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        qASet = {
          ...qASet,
          answerType: e.target.value,
          options: ["Option1", "Option2"],
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const getOptionValue = (index) => {
    const filteredValue = questionAnswerSet.filter(
      (eachSet) => eachSet.index === index
    );
    return filteredValue.answerType;
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
      },
    ]);
  };

  const addRadioOption = (index) => {
    console.log(questionAnswerSet);
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        qASet = {
          ...qASet,
          options: [...qASet.options, { checked: false, value: "" }],
        };
      }
      return qASet;
    });
    console.log(changedQuestionAnswerSet);
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const handleRadioAnswer = (e, index, optionIndex) => {
    console.log(e, index, optionIndex, questionAnswerSet, "insideee");
    const changedQuestionAnswerSet = data.map((qASet) => {
      if (index === qASet.index) {
        const mappedArray = qASet.options.map((eachOption, index) => {
          if (index === optionIndex) {
            console.log("lala", e.target.value, eachOption);
            eachOption = { ...eachOption, checked: true };
          } else {
            eachOption = { ...eachOption, checked: false };
          }
          return eachOption;
        });

        console.log("mapp", mappedArray);
        qASet = {
          ...qASet,
          options: mappedArray,
        };
      }
      return qASet;
    });
    console.log(changedQuestionAnswerSet);
    setData(changedQuestionAnswerSet);
  };

  const handleCheckBoxAnswer = (e, index) => {
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        qASet = {
          ...qASet,
          selectedValue: e.target.value,
        };
      }
      return qASet;
    });
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const handleRadioTextAnswer = (e, index, optionIndex) => {
    console.log(e, index, optionIndex, questionAnswerSet, "insideee");
    const changedQuestionAnswerSet = questionAnswerSet.map((qASet) => {
      if (index === qASet.index) {
        const mappedArray = qASet.options.map((eachOption, index) => {
          if (index === optionIndex) {
            console.log("lala", e.target.value, eachOption);
            eachOption = { ...eachOption, value: e.target.value };
          }
          return eachOption;
        });

        console.log("mapp", mappedArray);
        qASet = {
          ...qASet,
          options: mappedArray,
        };
      }
      return qASet;
    });
    console.log(changedQuestionAnswerSet);
    setQuestionAnswerSet(changedQuestionAnswerSet);
  };

  const handleCheckedAnswer = (e, index, optionIndex) => {
    console.log(e, index, optionIndex, questionAnswerSet, "insideee");
    const changedQuestionAnswerSet = data.map((qASet) => {
      if (index === qASet.index) {
        const mappedArray = qASet.options.map((eachOption, index) => {
          if (index === optionIndex) {
            console.log("lala", e.target.value, eachOption);
            eachOption = { ...eachOption, checked: true };
          }
          return eachOption;
        });

        console.log("mapp", mappedArray);
        qASet = {
          ...qASet,
          options: mappedArray,
        };
      }
      return qASet;
    });
    console.log(changedQuestionAnswerSet);
    setData(changedQuestionAnswerSet);
  };

  return (
    <div className="app-container">
      <h1>View form!</h1>
      {data &&
        data.map((questionAnswerSet, index) => (
          <div className="question-container" key={index}>
            <input
              name={index}
              type="text"
              placeholder="Type a question..."
              value={questionAnswerSet.question}
              disabled={true}
            />
            <div className="answer-container width text-center mx-auto my-10">
              {questionAnswerSet.answerType === "TextBox" ? (
                <input
                  type="text"
                  className="answer-textbox"
                  placeholder="Enter your answer..."
                />
              ) : questionAnswerSet.answerType === "Paragraph" ? (
                <textarea></textarea>
              ) : questionAnswerSet.answerType === "Radio" ? (
                <div>
                  {questionAnswerSet.options &&
                    questionAnswerSet.options.map((eachOption, optionIndex) => {
                      return (
                        <>
                          {console.log(optionIndex)}
                          <div class="input-group col-md-4">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input
                                  type="radio"
                                  aria-label="Radio button for following text input"
                                  checked={eachOption.checked}
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
                            />
                          </div>
                        </>
                      );
                    })}
                </div>
              ) : questionAnswerSet.answerType === "Checked" ? (
                <div>
                  {questionAnswerSet.options &&
                    questionAnswerSet.options.map((eachOption, optionIndex) => {
                      return (
                        <>
                          {console.log(optionIndex)}
                          <div class="input-group mb-3">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <input
                                  type="checkbox"
                                  aria-label="Checkbox for following text input"
                                  checked={eachOption.checked}
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
                </div>
              ) : null}
            </div>
          </div>
        ))}
      <Link to="/">
        <button className="submit-button">Go to main page</button>
      </Link>
    </div>
  );
}

export default ViewForm;
