import { Box, Button, Input, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const [name, setName] = useState("");
  const [dificulty, setDificulty] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && dificulty) {
      localStorage.setItem("name", name);
      localStorage.setItem("dificulty", dificulty);
      navigate("/playZone");
    } else {
      toast({
        title: "Missing Details",
        description: "Please Enter All Details",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true
      });
    }
  };
  return (
    <>
      <div>
        <Text
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            color: "grey"
          }}
        >
          Enter Details To Start Word Game
        </Text>
        <Box
          style={{
            border: "2px dotted grey",
            width: "400px",
            margin: "auto",
            borderRadius: "8px",
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#c2e0ff",
            color: "black",
            fontSize: "18px",
            fontStyle: "italic"
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">Enter Name</label> <br />
            <Input
              style={{
                backgroundColor: "#001e3c",
                outline: "none",
                color: "grey",
                fontSize: "18px",
                fontStyle: "italic"
              }}
              onChange={(e) => setName(e.target.value)}
              width="300px"
              placeholder="Enter Name"
            />
            <br /> <br />
            <label htmlFor="">Select Dificulty</label>{" "}
            <Select
              style={{
                backgroundColor: "#001e3c",
                outline: "none",
                color: "grey",
                fontSize: "18px",
                fontStyle: "italic"
              }}
              onChange={(e) => setDificulty(e.target.value)}
              width="300px"
              m="auto"
            >
              <option>Select Difficulty Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>{" "}
            <br />
            <Button
              style={{
                width: "300px",
                color: "#c2e0ff",
                backgroundColor: "#f50157",
                fontStyle: "italic"
              }}
              onClick={(e) => handleSubmit(e)}
            >
              Start Game
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
}
