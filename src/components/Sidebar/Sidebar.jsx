import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const TypingText = ({ text }) => {
    return (
      <span className={extended ? "typing visible" : "typing hidden"}>
        {text}
      </span>
    );
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended && <TypingText text="New Chat" />}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">
              {extended && <TypingText text="Recent" />}
            </p>
            {prevPrompt.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  key={index}
                  className="recent-entry"
                >
                  {extended && <img src={assets.message_icon} alt="Message" />}
                  {extended && <TypingText text={`${item.slice(0, 18)} ...`} />}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended && <TypingText text="Help" />}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <TypingText text="Activity" />}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <TypingText text="Settings" />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
