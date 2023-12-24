import React from "react";
import headerImage from "../../assets/headerImage.png";
import seprator from "../../assets/seprator.png";
import "./header.css";
function Header() {
  return (
    <div className="header section-padding snowflakes">
      <div class="snowflake">❅</div>
      <div class="snowflake">❅</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❅</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❅</div>
      <div class="snowflake">❆</div>
      <div class="snowflake">❄</div>
      <div className="header-image scale-up-center">
        <img src={headerImage} alt="header" />
      </div>
      <div className="header-content slide-in-bottom">
        <div className="seprator-pic">
          <img src={seprator} alt="mistletoe-seprator" />
        </div>
        <h1 className="gradient-text">Merry Christams!</h1>
        <p>
          Welcome to my christmas website, I've prepared some gifts for you
          which you can get them as soon as you click on the button below
        </p>

        <button>
          <a href="#gifts">Get your presents right now</a>
        </button>
      </div>
    </div>
  );
}

export default Header;
