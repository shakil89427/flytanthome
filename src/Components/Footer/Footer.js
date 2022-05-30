import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillApple,
} from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import playstoreWhite from "../../Assets/playstoreWhite.png";

const styles = {
  main: "bg-black text-white py-14",
  wrapper:
    "grid grid-cols-1 lg:grid-cols-3 gap-y-20 border-b border-white r-box py-20",
  info: "flex flex-col justify-between",
  logo: "w-64 cursor-pointer",
  infoText: "my-5",
  iconMain: "flex flex-col md:flex-row gap-y-5 gap-x-2",
  iconWrapper: "flex items-center gap-2 mt-3",
  icon: "w-[60px] h-[60px] md:w-12 md:h-12 border-[3px] md:border-[2px] rounded-full flex items-center justify-center text-3xl md:text-2xl hover:scale-110 duration-150",
  linksMain: "flex justify-evenly",
  sublink: "flex flex-col justify-between gap-5",
  link: "text-xl cursor-pointer font-medium text-gray-400 hover:text-white duration-150",
  appMain:
    " flex flex-col mx-auto md:ml-auto gap-y-5 items-center lg:items-start",
  appHead: "mt-1 lg:mt-0",
  appBtn:
    "bg-[#303030] w-52 flex items-center pl-5 py-1 border-2 border-white rounded-lg z-10 cursor-pointer overflow-hidden before:duration-300 relative before:absolute before:content-[''] before:w-0 before:h-full before:top-0 before:left-0 before:bg-black hover:before:w-full before:-z-10",
  appIcon: "text-3xl mr-2",
  download: "text-sm font-medium text-gray-300",
  appCatagory: "font-semibold text-xl leading-none mb-1",
  copyright: "text-center text-[#ABABAB] mt-7",
};

const Footer = () => {
  const navigate = useNavigate();
  const icons = [
    [
      { url: "https://www.instagram.com/flytant/", icon: <AiFillInstagram /> },
      { url: "https://www.facebook.com/flytantapp/", icon: <AiFillFacebook /> },
      { url: "https://twitter.com/flytant", icon: <AiFillTwitterSquare /> },
    ],
    [
      { url: "mailto:contact@flytant.com", icon: <HiMail /> },
      {
        url: "https://www.youtube.com/channel/UC_r46_UgBvaG2k94LDjEIWQ",
        icon: <AiFillYoutube />,
      },
      {
        url: "https://www.linkedin.com/company/flytant/mycompany/",
        icon: <AiFillLinkedin />,
      },
    ],
  ];

  const links = [
    ["Home", "About", "Blogs"],
    ["Contact", "Career", "Ads"],
    ["Terms", "Privacy", "FAQs"],
  ];

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* Logo Part */}
        <div className={styles.info}>
          <span>
            <img
              onClick={() => navigate("/")}
              className={styles.logo}
              src={logo}
              alt=""
            />
            <p className={styles.infoText}>Connecting Brands & Influencers</p>
          </span>
          {/* Icons Part */}
          <div className={styles.iconMain}>
            {icons.map((arr, i) => (
              <div key={i} className={styles.iconWrapper}>
                {arr.map((item, i) => (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    key={i}
                    className={styles.icon}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Links Part */}
        <div className={styles.linksMain}>
          {links.map((arr, i) => (
            <div className={styles.sublink} key={i}>
              {arr.map((item) => (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  key={item}
                  className={styles.link}
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>
        {/* Apps Part */}
        <div className={styles.appMain}>
          <p className={styles.appHead}>Get the apps!</p>
          <a
            href="https://play.google.com/store/apps/details?id=influencer.marketing.flytant"
            target="_blank"
            rel="noreferrer"
            className={styles.appBtn}
          >
            <img className="w-6 mr-3" src={playstoreWhite} alt="" />
            <div>
              <p className={styles.download}>GET IT ON</p>
              <p className={styles.appCatagory}>Play Store</p>
            </div>
          </a>
          <a
            href="https://apps.apple.com/in/app/flytant/id1530158515"
            target="_blank"
            rel="noreferrer"
            className={styles.appBtn}
          >
            <AiFillApple className={styles.appIcon} />
            <div>
              <p style={{ fontSize: "11px" }} className={styles.download}>
                DOWNLOAD ON THE
              </p>
              <p className={styles.appCatagory}>App Store</p>
            </div>
          </a>
        </div>
      </div>
      <p className={styles.copyright}>© Flytant 2022</p>
    </div>
  );
};

export default Footer;
