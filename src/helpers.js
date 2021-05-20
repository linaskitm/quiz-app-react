export const createMarkup = (text) => {
  return { __html: text };
};

export const difficulties = [
  { id: "total_easy_question_count", name: "easy" },
  { id: "total_medium_question_count", name: "medium" },
  { id: "total_hard_question_count", name: "hard" },
];

export const styles = {
  paper: {
    padding: "20px",
    marginTop: "20px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px",
  },
  mainTitle: {
    fontSize: "45px",
    marginBottom: "20px",
  },
  submitButton: {
    marginTop: "20px",
    background: "#f44336",
  },
  question: {
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: "500",
    lineHeight: "35px",
  },
  results: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "150px",
    textAlign: "center",
    flexDirection: "column",
  },
  answer: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "500",
    lineHeight: "25px",
    marginLeft: "10px",
    display: "flex",
  },
  correctAnswer: {
    color: "green",
  },
};
