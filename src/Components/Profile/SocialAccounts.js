import React, { useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";

/* Styles Start */
const styles = {
  main: "grid grid-cols-1 lg:grid-cols-2 py-14 px-5 md:px-28 gap-10 lg:gap-20",
  /* Right */
  title: "text-2xl font-semibold mt-3",
  socials: "flex items-center justify-between mt-5 font-medium",
  selectedSocial:
    "relative font-semibold before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-black before:-bottom-[2px] before:rounded-full",
};
/* Styles End */

const SocialAccounts = () => {
  const socials = ["Instagram", " Youtube", "Twitter", " Linkedin", "Tiktok"];
  const [selected, setSelected] = useState(socials[0]);

  return (
    <div>
      <p className={styles.title}>Social Accounts</p>
      <div className={styles.socials}>
        {socials.map((social) => (
          <p
            onClick={() => social !== selected && setSelected(social)}
            className={
              selected === social ? styles.selectedSocial : "cursor-pointer"
            }
            key={social}
          >
            {social}
          </p>
        ))}
      </div>
      {selected === "Instagram" && (
        <div className="flex flex-col items-center gap-5 mt-52 text-gray-500 text-sm font-medium">
          <p>No account linked</p>
          <a
            href="https://www.instagram.com/oauth/authorize?client_id=191312392530647&redirect_uri=https://flytant.com/&scope=user_profile,user_media&response_type=code"
            className="bg-black text-white text-3xl p-4 rounded-full"
          >
            <AiOutlineInstagram />
          </a>
          <p>Click here to link your Instagram</p>
        </div>
      )}
    </div>
  );
};

export default SocialAccounts;
