import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import Keyboard from "react-simple-keyboard";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function PlayZone() {
  const [word, setWord] = useState("");
  const [ki, setKi] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [score, setScore] = useState(0);
  const timerId = useRef(null);

  const [input, setInput] = useState("");
  const handleonChange = (input) => {
    setKi(input);
    // console.log("Word Now", input);
  };

  const handleAgain = () => {
    setInput("");
    setCounter(15);
    if (!timerId.current) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
      // setTimerId(id)
      timerId.current = timer;
    }
  };
  const name = localStorage.getItem("name");
  const dificulty = localStorage.getItem("dificulty");

  let dif;
  if (dificulty == "Easy") {
    dif = 30;
  } else if (dificulty == "Medium") {
    dif = 20;
  } else {
    dif = 10;
  }
  // console.log(dif);

  const [counter, setCounter] = useState(dif);

  const handleonChangeInput = (event) => {
    let input = event.target.value;
    setInput(input);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (counter === 0 || word.length === ki.length) {
      if (ki === word) {
        toast({
          title: "Correct",
          description: "You Typed Correct",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true
        });
        setScore((score) => score + word.length);
        getData();
        setKi("");
        setInput("");
      } else {
        toast({
          title: "In-Correct word",
          description: "You Typed InCorrect",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true
        });
        setScore((score) => score - word.length);
        getData();
        setKi("");
        setInput("");
      }
    }
  }, [counter]);

  // // handleTime();
  // console.log(counter);

  // console.log(word, input);
  useEffect(() => {
    if (counter === 0) {
      toast({
        title: "Game-Over",
        description: "Gave-Overed Check Your Score",
        status: "success",
        position: "top",
        duration: 6000,
        isClosable: true
      });
    }
  }, [counter]);

  function getData() {
    axios
      .get("https://api.api-ninjas.com/v1/randomword")
      .then((res) => setWord(res.data.word))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, []);

  const move = () => {
    //https://fakestoreproducts.herokuapp.com/heroku
    const payload = {
      name: name,
      dificulty: dificulty,
      score: score,
      time: dif
    };
    axios
      .post("https://rahimansari.herokuapp.com/rahi", payload)
      .then((res) => {
        navigate("/dashboard");
        toast({
          title: "Fetching Score...",
          description: "We Are Fetching Your Score",
          status: "success",
          position: "bottom",
          duration: 2000,
          isClosable: true
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error Occured",
          description: "An Error Occured While Fetching your Score",
          status: "error",
          position: "bottom",
          duration: 3000,
          isClosable: true
        });
      });
  };

  // console.log(name, dificulty);
  return (
    <>
      <Box>
        <Text
          style={{
            fontSize: "20px",
            textAlign: "center",
            color: "#38a169",
            fontStyle: "italic"
          }}
        >
          Please Type Word :{" "}
          <Text
            style={{
              fontSize: "35px",
              textAlign: "center",
              color: "#38a169",
              fontStyle: "italic"
            }}
          >
            {word ? word : null}
          </Text>
        </Text>{" "}
        <Text
          style={{
            fontSize: "20px",
            textAlign: "right",
            color: "#38a169",
            fontStyle: "italic"
          }}
        >
          Timer : {counter}
        </Text>
        <Text
          style={{
            fontSize: "20px",
            textAlign: "right",
            color: "#6859d1",
            fontStyle: "italic"
          }}
        >
          Your Score : {score}
        </Text>
        <div
          style={{
            marginTop: "50px",
            fontStyle: "italic"
          }}
        >
          <Text
            style={{
              fontStyle: "italic",
              fontSize: "20px"
            }}
          >
            Please Click On backSpace button In Virtual Keyboard For Removig
            Words From Input
          </Text>
          <Input
            style={{
              fontStyle: "italic"
            }}
            id="input"
            value={ki}
            width="400px"
            placeholder={"Type on The Virtual Keyboard To Start The Game"}
            onChange={(e) => handleonChangeInput(e)}
          />{" "}
          {counter === 0 ? (
            <Button
              style={{
                fontStyle: "italic"
              }}
              onClick={() => move()}
            >
              Check Your Score
            </Button>
          ) : null}
          <Box style={{ marginTop: "30px" }}>
            <Keyboard
              theme={"hg-theme-default myTheme1"}
              onChange={(input) => handleonChange(input)}
            />
          </Box>
        </div>
      </Box>
    </>
  );
}
