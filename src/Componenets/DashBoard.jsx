import { Button, Toast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const [data, setData] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://rahimansari.herokuapp.com/rahi")
      .then((res) => setData(res.data))
      .catch((err) =>
        Toast({
          title: "Error ",
          description: "An Error-Occured While Fetching Your Score",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true
        })
      );
  }, []);
  return (
    <>
      <div>DashBoard</div>
      <Button onClick={() => navigate("/playZone")}>Play Again</Button>
      <table>
        <tr>
          <th>Name</th>
          <th>Score</th>
          <th>TimeTaken</th>
        </tr>
        {data &&
          data.map((d) => (
            <tr id={d.id}>
              <td>{d.name}</td>
              <td>{d.score}</td>
              <td>{d.time} Seconds</td>
            </tr>
          ))}
      </table>
    </>
  );
}
