import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const createMarkup = (text) => {
  return { __html: text };
};

export const difficulties = [
  { id: "total_easy_question_count", name: "easy" },
  { id: "total_medium_question_count", name: "medium" },
  { id: "total_hard_question_count", name: "hard" },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    borderRadius: "20px",
  },
  mainTitle: {
    fontSize: "45px",
    marginBottom: "20px",
  },
  submitButton: {
    marginTop: "20px",
    background: "#9c27b0",
  },
}));

const QuizCategories = () => {
  const classes = useStyles();
  const [quizData, setQuizData] = useState([]);
  const [quizCategories, setQuizCategories] = useState([]);

  const [category, setCategory] = useState({ id: "", name: "" });

  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });

  const fetchQuizData = async () => {
    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=${quizNumber}&category=${
          category.id
        }&difficulty=${difficulty.name.toLowerCase()}`
      );
      const formattedData = data.results.map((cat) => {
        const incorrectAnswersIndexes = cat.incorrect_answers.length;
        const randomIndex = Math.random() * (incorrectAnswersIndexes - 0) + 0;
        cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer);

        return {
          ...cat,
          answers: cat.incorrect_answers,
        };
      });
      //   console.log({ formattedData });
      setQuizData(formattedData);
    } catch (error) {
      console.log("Fetch quiz error =====>>>>", error);
    }
  };

  const fetchQuizCategories = async () => {
    const { data } = await axios.get("https://opentdb.com/api_category.php");
    // console.log(data);
    setQuizCategories(data.trivia_categories);
  };

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizData.length && quizNumber && category.id && difficulty.name) {
      fetchQuizData();
    }
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = quizCategories.find(
      (cat) => cat.id === e.target.value
    );
    setCategory(selectedCategory);
  };

  const handleDifficultyChange = (e) => {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (diff) => diff.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuizNumber(e.target.value);
  };

  //   console.log({ quizCategories, quizNumber, difficulty, quizData });

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h1" className={classes.mainTitle}>
          Get Questions:
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category-select-label">
                  Select category:
                </InputLabel>
                <Select
                  required
                  name="category"
                  value={category.id || ""}
                  id="category-select"
                  label="Select category"
                  labelId="category-select-label"
                  onChange={handleSelectChange}
                >
                  {quizCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      <span
                        dangerouslySetInnerHTML={createMarkup(category.name)}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="difficulty-select-label">
                  Select Difficulty:
                </InputLabel>
                <Select
                  required
                  name="difficulty"
                  value={difficulty.id || ""}
                  id="difficulty-select"
                  label="Select Difficulty"
                  labelId="difficulty-select-label"
                  onChange={handleDifficultyChange}
                >
                  {difficulties.map((difficulty) => (
                    <MenuItem key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ min: 1, max: 10 }}
                required
                fullWidth
                type="number"
                id="quiz-number"
                variant="outlined"
                name="quiz-number"
                label={`Add a quiz number from 1 to 10`}
                value={quizNumber || ""}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default QuizCategories;
