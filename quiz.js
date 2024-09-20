// Class Creates and Objects Creates and add these  objects into array

class Question {
  CorrectAns;
  SelectedAns;

  constructor(question, answers) {
    this.question = question;
    this.answers = answers;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let q1 = new Question("what is your name", ["john", "robin", "Ryan"]);
q1.CorrectAns = q1.answers[0];

let q2 = new Question("How Old Are You ?", [23, 31, 30]);
q2.CorrectAns = q2.answers[2];

let q3 = new Question("How Are You Now?", ["Good", "Neurtal", "Worst"]);
q3.CorrectAns = q3.answers[1];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let array = [q1, q2, q3];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Finsished Button adding Function
let displayFinish = function () {
  if (DisplayedQuestion == array[array.length - 1]) {
    let boxButton = document.getElementById("buttons");
    let finishAttempt = document.createElement("button");
    finishAttempt.textContent = "Check Marks";
    finishAttempt.setAttribute("id", "end");
    boxButton.appendChild(finishAttempt);
  } else {
    if (document.getElementById("end") != null) {
      let parent = document.getElementById("buttons");
      parent.removeChild(document.getElementById("end"));
    }
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Show Marks
let marksShow = function () {
  if (document.getElementById("end") != null) {
    document.getElementById("end").onclick = function () {
      document.getElementById("submits").hidden = true;
      document.getElementById("timer").hidden = true;
      let score = 0;
      let x = localStorage.getItem("arr");
      let y = JSON.parse(x);
      for (let i = 0; i < y.length; i++) {
        if (y[i].SelectedAns == y[i].CorrectAns) {
          score++;
        }
      }
      let markp = document.createElement("p");
      if (document.getElementById("mar") != null) {
        document.getElementById("mar").remove();
      }
      markp.setAttribute("id", "mar");
      let z = document.getElementById("marks").appendChild(markp);
      z.textContent = "Your Score is " + score + " out of " + y.length;
    };
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Navigate Function

let Navigate = function (DisplayedQ) {
  document.getElementById("desc").innerHTML = DisplayedQ.question;

  let Answerbox = document.getElementById("AnswerBox");
  Answerbox.replaceChildren();
  let buttons = document.getElementById("buttons");

  for (j = 0; j < 3; j++) {
    let option = document.createElement("li");
    Answerbox.appendChild(option);
    let li = Answerbox.children[j];
    li.innerHTML = DisplayedQ.answers[j];
    x = li.appendChild(document.createElement("input"));
    x.value = DisplayedQ.answers[j];
    x.name = "SelectedAnswer";
    x.type = "radio";
    if (count == 0) {
      if (DisplayedQ.answers[j] == DisplayedQ.CorrectAns) {
        option.style.color = "red";
      }
    }
  }
  displayFinish();
  marksShow();
  if (
    document.getElementById("mar") != null &&
    DisplayedQ != array[array.length - 1]
  ) {
    document.getElementById("mar").remove();
  }

  if (DisplayedQ == array[array.length - 1]) {
    document.getElementById("next").hidden = true;
  } else {
    document.getElementById("next").hidden = false;
  }

  if (DisplayedQ == array[0]) {
    document.getElementById("prev").hidden = true;
  } else {
    document.getElementById("prev").hidden = false;
  }
  let answerList = document.getElementsByName("SelectedAnswer");
  for (k = 0; k < array.length; k++) {
    if (answerList.item(k).value == DisplayedQ.SelectedAns) {
      answerList.item(k).checked = true;
    }
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Default View
let count = 10;
const timer = setInterval(function () {
  count--;
  document.getElementById("timer").innerHTML = count;
  if (count === 0) {
    clearInterval(timer);
    document.getElementById("timer").innerHTML = "Time's Up!";
    document.getElementById("submits").hidden = true;
  }
}, 1000);

let DisplayedQuestion = array[0];
let i = 0;

Navigate(DisplayedQuestion);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// When clicks Previous Button

document.getElementById("prev").onclick = function () {
  if (i != 0) {
    i = i - 1;
    DisplayedQuestion = array[i];
    Navigate(DisplayedQuestion);
  } else {
    alert("Cannot navigate");
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// When clicks Next Button
document.getElementById("next").onclick = function () {
  i = i + 1;
  if (i < array.length) {
    DisplayedQuestion = array[i];
    Navigate(DisplayedQuestion);
  } else {
    alert("Reach The End Of Questions");
    i = array.length - 1;
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let subs = document.getElementById("submits");
subs.onclick = function () {
  let selected = document.querySelector('input[name="SelectedAnswer"]:checked');
  if (selected == null) {
    alert("Please Select answer");
  } else {
    DisplayedQuestion.SelectedAns = selected.value;
    localStorage.setItem("arr", JSON.stringify(array));
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
