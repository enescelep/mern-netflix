import axios from "axios";
import { useEffect, useState } from "react";
import "./widgetLg.css";
import moment from "moment";

export default function WidgetLg() {
  const [newUsers, setNewUsers] = useState([]);
  
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  /* const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  }; */
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">New Users</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Username</th>
            <th className="widgetLgTh">Email Adresss</th>
            <th className="widgetLgTh">Register Date</th>
          </tr>
          {newUsers.map((user) => (
            <tr className="widgetLgTr" key={user._id}>
              <td className="widgetLgUser">
                <img
                  src={
                    user.profilePic ||
                    "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                  }
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{user.username}</span>
              </td>
              <td className="widgetLgDate">{user.email}</td>
              <td className="widgetLgDate">
                {moment(user.createdAt).format("LLL")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
