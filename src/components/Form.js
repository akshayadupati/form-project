import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Form() {
  // const [users, setUsers] = useState(null);
  // const [username, setUsername] = useState(null);
  // const [email, setEmail] = useState(null);
  const [answerOption, setAnswerOption] = useState("TextBox");
  const [questionAnswerSet, setQuestionAnswerSet] = useState([]);
  const [index, setIndex] = useState(0);
  const [formName, setFormName] = useState("");

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {}, [questionAnswerSet]);
  // const getData = () => {
  //   axios.get("http://localhost:5000/users").then((res) => setUsers(res));
  // };

  // const handleNameChange = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value, e.target);
  // };

  const handleAnswerOptionChange = (e, index) => {
    setAnswerOption(e.target.value);
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

  const submitHandler = (e) => {
    axios
      .post("http://localhost:5000/submitForm", questionAnswerSet)
      .then((res) => console.log(res));
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
        question: "",
        name: formName,
      },
    ]);
  };

  const handleRadioAnswer = (e, index) => {
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

  const handleDropDownAnswer = (e, index) => {
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

  return (
    <div className="app-container">
      <h1>Let us create a form!</h1>
      <input
        type="text"
        required={true}
        onChange={(e) => setFormName(e.target.value)}
      ></input>
      <button
        className="new-question"
        onClick={() => addNewQuestionAnswerSet()}
      >
        Click to add new question.
      </button>
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
              value={answerOption}
              onChange={(e) => handleAnswerOptionChange(e, index)}
            >
              <option name="paragraph">Paragraph</option>
              <option name="text">TextBox</option>
              <option name="radio">Radio</option>
              <option name="drop-down">Drop Down</option>
            </select>
            <div className="answer-container">
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
                  {questionAnswerSet.options.map((eachOption, optionIndex) => {
                    return (
                      <>
                        <input
                          type="radio"
                          id={`q${index}o${optionIndex}`}
                          value={eachOption}
                          name={`radio-button-${index}`}
                          onChange={(e) => handleRadioAnswer(e, index)}
                          disabled={true}
                        />
                        <label htmlFor={`q${index}o${optionIndex}`}>
                          {eachOption}
                        </label>
                      </>
                    );
                  })}
                </div>
              ) : questionAnswerSet.answerType === "Drop Down" ? (
                <select
                  value={questionAnswerSet.selectedValue}
                  onChange={(e) => handleDropDownAnswer(e, index)}
                >
                  <option>Please choose one option</option>
                  {questionAnswerSet.options.map((eachOption, index) => {
                    return <option key={index}>{eachOption}</option>;
                  })}
                </select>
              ) : null}
            </div>
          </div>
        ))}
      <Link to="/">
        <button className="submit-button" onClick={() => submitHandler()}>
          Submit
        </button>
      </Link>
    </div>
  );
}

export default Form;
