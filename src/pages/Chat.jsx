
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import "../css/style.css";
function Chat() {
  const [chat, setChat] = useState([]);
  const [mess, setMess]= useState('');
  const checkLogin = () => {
    if (
      !localStorage.getItem("id") ||
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") === undefined
    ) {
      window.location.replace("login");
    }
  };
  const logOut = () => {
    googleLogout();
    localStorage.removeItem('id');
    window.location.replace('/');
  };
  const sendMessage =()=>{
    if(mess!==''){
      axios.post("https://students.trungthanhweb.com/api/sendchat", {
        id: localStorage.getItem('id'),
        mess:mess
      })
      .then((res) =>{
        setChat(res.data);
        setMess('');
      });
    }
  }
  const loadChat = () => {
    if (localStorage.getItem("id") && localStorage.getItem("id") !== null) {
      fetch(
        "https://students.trungthanhweb.com/api/loadchat?id=" +
          localStorage.getItem("id")
      )
        .then((res) => res.json())
        .then((res) => {
          setChat(res);
          setMess('');
          window.scrollTo({ 
            top: document.documentElement.scrollHeight, 
            behavior: 'auto'
            /* you can also use 'auto' behaviour 
               in place of 'smooth' */
          }); 
        });
    }
  };
  const endOfMessagesRef = useRef(null);
  useEffect(() => {
    checkLogin();
    loadChat();
    
  }, []);
  useEffect(()=>{
    endOfMessagesRef.current?.scrollIntoView({ behavior: "instant" });
  },[chat])
  return (
    <div className="wrapper">
      <section className="msger">
        <header className="msger-header  w-100">
          <div className="col-md-11">
                ChatBot
            </div>
            <div className="col-md">
                <button onClick={logOut} className="btn btn-primary"> Log out</button>
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </header>
        {chat && chat.length > 0 && (
          <main className="msger-chat">
            {chat.map((item) => (
              <>
                <div className="msg right-msg">
                  <div
                    className="msg-img"
                    style={{
                      "background-image":
                        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXh66ZR5-pcHt-LvRPo40zHoCCnzJa_hqzBaO6FSm5pE9j7FMUcD26sIgdOdh-oUILn8&usqp=CAU)",
                    }}
                  ></div>

                  <div className="msg-bubble">
                    <div className="msg-info">
                      <div className="msg-info-name">Person</div>
                      <div className="msg-info-time">{item.created_at}</div>
                    </div>

                    <div className="msg-text">
                      {item.question}
                    </div>
                  </div>
                </div>
                <div className="msg left-msg">
                  <div
                    className="msg-img"
                    style={{
                      "background-image":
                        "url(https://cdn-icons-png.flaticon.com/512/4712/4712035.png)",
                    }}
                  ></div>

                  <div className="msg-bubble">
                    <div className="msg-info">
                      <div className="msg-info-name">Bot</div>
                      <div className="msg-info-time">{item.created_at}</div>
                    </div>

                    <div className="msg-text">
                    {item.response}
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div ref={endOfMessagesRef}></div>
          </main>
        )}
        <div className="msger-inputarea">
          <input
            type="text"
            className="msger-input"
            placeholder="Chat nào..."
            value={mess}
            onChange={(e)=> setMess(e.target.value)}
          />
          <button type="submit" onClick={sendMessage} className="msger-send-btn">
            Gửi
          </button>
        </div>
      </section>
    </div>
  );
}

export default Chat;
