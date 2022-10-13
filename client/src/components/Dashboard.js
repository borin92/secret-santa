import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import "../style/dashboard.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, TextField } from "@material-ui/core";
import { useMutation } from "react-query";
import Cookies from 'universal-cookie';

const createGift = async (data) => {
  if (!data) return null;
  console.log(data)

  const response = fetch("http://localhost:3000/gift/addOne", {
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
  return response;
};

function DialogGift({ open, onClose, santaData, userId }) {

  const [gift, setGift] = useState("");
  const [message, setMessage] = useState("");

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

function Cards({ query }) {
  const cookies = new Cookies();
  const santaData = cookies.get('santaId')
  const { data: userList, isLoading, refetch } = useQuery(["user", query], () =>
    fetch(query).then((res) => res.json())
  );
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <h2>{(userList || []).length + " utilisateur(s) trouvé(s)"}</h2>
      <div className={"container"}>
        {(userList || []).map((item) => (
          <div className={"card"}>
            <img
              className={"cardimg"}
              src="/icon-santa.png"
              alt={"santa claus"}
            />
            <div className={"cardcontent"}>
              <p>Né(e) le : {item.dob}</p>
              <h3>{item.name}</h3>
              <p className={"email"}>{item.email}</p>
            </div>
            <div className={"cardfooter"}>
              <h3>Cadeaux</h3>
              <a className={"click-arrow"} onClick={handleClickOpen}>
                <img
                  className={"icon"}
                  alt={"right-arrow"}
                  src="/right-arrow.png"
                />
              </a>
              <DialogGift santaData={santaData} userId={item.id} open={open} onClose={(e) => handleClose(e)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const Dashboard = () => {
  const {
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [query, setQuery] = useState("http://localhost:3000/users");
  const HandleChange = useCallback((e) => {
    console.log(e.target.value);
    setQuery("http://localhost:3000/users/" + e.target.value);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setQuery("http://localhost:3000/users/" + event.currentTarget[0].value);
  };

  return (
    <>
      <h1>Liste des utilisateurs</h1>
      <form onSubmit={onSubmit}>
        <div className={"divInputCreate"}>
          <div>
            <img
              className={"book"}
              alt={"right-arrow"}
              src="/right-arrow.png"
            />
          </div>
          <input
            {...register("newtodo", {})}
            type="text"
            id="searchUser"
            autoComplete="off"
            placeholder="Recherche"
            onChange={(e) => HandleChange(e)}
          />
        </div>
        <button type="submit" className={"btnAdd"}>
          Rechercher
        </button>
      </form>
      <Cards query={query}></Cards>
    </>
  );
};

export default Dashboard;
