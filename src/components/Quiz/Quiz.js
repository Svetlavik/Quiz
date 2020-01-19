import React from "react";
import InfoQuestions from "./../Info/InfoQuestions.js";
import SingleQuestions from "./../Single/SingleQuestions.js";
import OpenQuestions from "./../Open/OpenQuestions.js";
import questions from "./../../questions.json";
import './Quiz.css';

const Types = {
  info: 'info',
  condition: 'condition',
  single: 'single',
  open: 'open',
}

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.conditionsResults = {};
    this.results = [];
    this.state = {
      curIndex: 0,
      question: questions[0],
    };
  }

  /**
   * определение вопроса, который нужно вывести, по типу
   * @param {object} question 
   */
  getQuestion(question) {
    switch (question.type) {
      case Types.single:
        return (
          <SingleQuestions
            key={question.id}
            question={question}
            onClick={(value) => this.nextQuestion(value)}
          ></SingleQuestions>
        );
      case Types.open:
        return (
          <OpenQuestions
            key={question.id}
            question={question}
            onClick={(value) => this.nextQuestion(value)}
          ></OpenQuestions>
        );
      default:
        return (
          <InfoQuestions
            question={question}
            onClick={() => this.checkRestart(question)}
          ></InfoQuestions>
        );
    }
  }

  restartQuiz() {
    this.results = [];
    this.conditionsResults = {};
    this.setState({
      curIndex: 0,
      question: questions[0]
    })
  }

  checkRestart(question) {
    if (question.restart) {
      this.restartQuiz();
    } else {
      this.nextQuestion();
    }
  }
  /**
   * перед переходом к следующему вопросу сохраняе результаты текущего вопроса и присаваем id для следующего
   * @param {string} value 
   */
  nextQuestion(value) {
    const id = this.state.curIndex;
    // Не надо записывать в результат вопросы типа Info
    if (value !== undefined) {
      this.saveResults(questions[id].id, value);
    }
    this.changeId(id);
  }
  /**
   * в сохраненном массиве ответов проверяем сответсвие условию для блока вопрсов с типом Condition
   * @param {object} condition 
   */
  checkCondition(condition) {
    let conditionComplete = false;
    const conditionQuestion = this.results.find((elem) => elem.id === condition.questionId);
    if (conditionQuestion) {
      if (condition.sign === 'equal') {
        conditionComplete = conditionQuestion.value === condition.value;
      } else {
        conditionComplete = conditionQuestion.value !== condition.value;
      }
    }

    return conditionComplete;
  }

  /**
   * Функция перехода к следующему вопросу
   * @param {string} id - Идентификатор вопроса
   */
  changeId(id) {
    let nextId = id + 1;
    let nextQuestion = questions[nextId];

    // Если вопросы закончились, надо показать финальный экран и отправить результат на сервер
    if (!nextQuestion) {
      nextQuestion = {
        type: Types.info,
        text: 'Спасибо, что прошли опрос!',
        restart: true
      };
      this.sendResultsOnServer();
    }

    // Если следующий вопрос типа Condition, необходимо записать результат в память и перейти к следующему
    if (nextQuestion.type === Types.condition) {
      this.conditionsResults[nextQuestion.id] = this.checkCondition(nextQuestion.condition);
      this.changeId(nextId);
      return;
      // Если у вопроса есть связь с Condition, проверяем корректность его отображения
    } else if (nextQuestion.relationId) {
      if (!this.conditionsResults[nextQuestion.relationId]) {
        this.changeId(nextId);
        return;
      }
    }

    this.setState({
      curIndex: nextId,
      question: nextQuestion
    })
  }

  saveResults(id, value) {
    this.results.push({
      id, value
    });
  }

  /**
   * Так как работы с сервером нет, просто выводим результаты в консоль
   */
  sendResultsOnServer() {
    console.log(this.results);
  }

  render() {
    return (
      <div className="question-container">
        {this.getQuestion(this.state.question)}
      </div>
    );
  }
}

export default Quiz;
