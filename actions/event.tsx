import axios from "axios";
export const createEvent = async (
  title: string,
  description: string,
  date: Date,
  time: Date,
  price: number,
  owner: string
) => {
  const res = await axios
    .post("https://stagio-backend.herokuapp.com/api/event/create", {
      title,
      description,
      date,
      time,
      price,
      owner,
    })
    .then((response) => {
      console.log(response);
    });
};
