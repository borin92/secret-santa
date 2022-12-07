import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import "../style/dashboard.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, Card, TextField } from "@material-ui/core";
import Cookies from "universal-cookie";

const createGift = async (data) => {
  if (!data) return null;

  return fetch("http://localhost:3000/gift/addOne", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      santa: data.santa,
      userGifted: data.userGifted,
      gift: data.gift,
      giftMessage: data.giftMessage,
      isValid: "pending",
    }),
  }).then((res) => res.json());
};

function DialogGift({ open, onClose, santaData, userId }) {
  const [gift, setGift] = useState("");
  const [message, setMessage] = useState("");
  console.log(santaData, userId)
  const mutation = useMutation(createGift, {
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 500) {
      } else {
      }
    },
  });

  const HandleClick = async () => {
    mutation.mutate({
      santa: santaData,
      userGifted: userId,
      gift: gift,
      giftMessage: message,
      isValid: "pending",
    });
  };

  return (
    <Dialog
      PaperProps={{ sx: { width: "30%", height: "50%" } }}
      onClose={onClose}
      open={open}
    >
      <DialogTitle>Gift editor</DialogTitle>
      <TextField
        required
        id="outlined-required"
        label="Required"
        placeholder="Your gift"
        onChange={(e) => setGift(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Required"
        placeholder="Your gift message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button color="primary" onClick={HandleClick}>
        Submit
      </Button>
    </Dialog>
  );
}

function CardItem({ item }) {
  const cookies = new Cookies();
  const santaData = cookies.get("santaId");
  const [open, setOpen] = useState(false);
  console.log(santaData)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  return <div className={"userCard"}>
    <div className={"userInfo"}>
      <div>
        <img
          className={"santa"}
          src="/icon-santa.png"
          alt={"santa claus"}
        />
      </div>
      <div>
        <p className={"userInfoName"}><strong>{item.name}</strong> (Né le {item.dob})</p>
        <p className={"userInfoEmail"}>{item.email}</p>
      </div>
    </div>
    <div>
      <button className={"giftBtn"} onClick={handleClickOpen}>
        Cadeau
      </button>
      <DialogGift
        santaData={santaData}
        userId={item.id}
        open={open}
        onClose={(e) => handleClose(e)}
      />
    </div>
  </div>

}

function Cards({ query }) {

  const { data: userList } = useQuery(["user", query], () =>
    fetch(query).then((res) => res.json())
  );


  return (
    <>
      <h2>{(userList || []).length + " utilisateur(s) trouvé(s)"}</h2>
      <div className={"container"}>
        {(userList || []).map((item) => (
          <CardItem item={item}></CardItem>




        ))}
      </div>
    </>
  );
}

const Dashboard = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    event.preventDefault();
    setQuery("http://localhost:3000/users/" + event.currentTarget[0].value);
  };
  const [query, setQuery] = useState("http://localhost:3000/users/limit/6");
  const HandleChange = useCallback((e) => {
    console.log(e.target.value);
    setQuery("http://localhost:3000/users/" + e.target.value);
  }, []);

  return (
    <>
      <div className={"wrapper"}>
        <div className={"panel"}>
          <h1>Liste des utilisateurs</h1>
          <form onSubmit={onSubmit}>
            <input
              {...register("newtodo", {})}
              type="text"
              id="searchUser"
              autoComplete="off"
              placeholder="Recherche"
              onChange={(e) => HandleChange(e)}
              className={"search"}
            />
            <button type="submit" className={"searchBtn"}>
              Rechercher
            </button>
          </form>
        </div>
        <div className={"panel"}>
          <Cards query={query}></Cards>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
