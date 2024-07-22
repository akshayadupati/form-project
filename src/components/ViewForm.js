import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { data } from "../mockData.js";

function ViewForm() {
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [answerOption, setAnswerOption] = useState("TextBox");
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

  // const submitHandler = (e) => {
  //   axios
  //     .get("http://localhost:5000/register")
  //     .then((res) => console.log("inside submit handler", res));
  // };

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
            />
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
                  onChange={(e) => handleCheckBoxAnswer(e, index)}
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
        <button className="submit-button">Go to main page</button>
      </Link>
    </div>
  );
}

export default ViewForm;
