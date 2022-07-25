import React, { useState } from "react";
import qArrow from "../../Assets/qArrow.png";
import useAnalytics from "../../Hooks/useAnalytics";

const data = [
  {
    title:
      " simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a eros eget arcu pretium tincidunt. Aliquam eget nibh lectus. Ut mollis varius odio vel lobortis. Ut in pharetra lorem, quis vestibulum felis. Nunc posuere sodales leo, vel scelerisque lacus scelerisque nec. Donec sagittis lectus ac arcu feugiat, quis tincidunt justo sollicitudin. Ut condimentum convallis urna. Ut interdum quam non eros euismod viverra. Nulla augue mi, ultrices in tortor vitae, finibus condimentum ante. Integer semper lectus placerat, tempus sem a, fermentum nulla. Vestibulum viverra vel sem at tincidunt. Phasellus luctus varius commodo.",
  },
  {
    title:
      "praesentium ipsum quidem sed, sit vitae, ipsa nemo quisquam quaerat accusamus",
    des: "Aenean commodo iaculis fringilla. Ut quam elit, laoreet volutpat malesuada quis, iaculis eu diam. Sed et aliquet ex. Aliquam vel nulla congue, pharetra felis vel, faucibus nulla. Donec varius orci a nibh porta scelerisque. Nulla quis sagittis sem. Phasellus dui ipsum, rutrum nec mattis sit amet, laoreet et libero. Ut et urna eget quam iaculis faucibus in eget ipsum. Pellentesque gravida orci eget neque gravida, sit amet malesuada leo rhoncus. Proin tellus odio, accumsan quis justo non, imperdiet pretium mauris. Nullam fermentum, eros ut egestas luctus, lorem mi maximus ligula, eget semper lectus turpis in odio. Etiam iaculis rutrum metus ac eleifend. Pellentesque lacinia urna tincidunt lorem vestibulum tristique.",
  },
  {
    title:
      "nostrum ad molestias fugiat quidem debitis suscipit animi molestiae recusandae quis",
    des: "Nunc lacus mauris, efficitur scelerisque mollis ut, placerat non eros. Cras tristique tortor id pretium gravida. Suspendisse potenti. Pellentesque sit amet elit blandit, feugiat sem at, elementum neque. Integer vestibulum lectus sit amet risus placerat condimentum. Curabitur euismod lorem non congue pharetra. Donec leo ex, pretium eget ornare eu, tempor sed lectus. Curabitur maximus lobortis mauris, in lacinia nisl. Nullam id urna maximus, convallis enim at, bibendum leo. Nullam tincidunt dignissim purus id porta. Fusce vel iaculis ipsum. Cras eget ante mattis, hendrerit odio id, vehicula libero. Cras dictum dui ut elit vestibulum, venenatis varius dui dapibus. Aliquam in sodales nisl, interdum scelerisque augue.",
  },
  {
    title:
      "molestias sunt odio numquam non, rerum facere! Expedita, praesentium ipsum quidem sed, sit vitae, ipsa nemo",
    des: "Nullam sagittis neque eu tempus placerat. Vestibulum eget rhoncus augue. Nulla facilisi. Vestibulum tincidunt nulla sit amet nulla volutpat pellentesque. Nunc commodo egestas tellus. Morbi condimentum malesuada ipsum id tristique. Maecenas id ante sed libero sagittis eleifend a sed dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas ac eleifend lectus. Nulla lobortis mauris ac ligula tristique maximus. Nullam augue lectus, viverra in tempus sit amet, cursus vitae nibh. Etiam tristique fringilla risus, eu sollicitudin ligula feugiat sed. Aliquam ac mollis lectus.",
  },
];

const Questions = () => {
  const [selected, setSelected] = useState(0);
  const { addLog } = useAnalytics();
  return (
    <div className="my-28">
      <p className="text-2xl lg:text-3xl font-semibold mb-10 text-center">
        Common questions
      </p>
      {data.map((item, index) => (
        <div
          key={index}
          className="mb-8 bg-gray-100 rounded-lg w-[95%] max-w-[1000px] mx-auto"
        >
          <div
            className="flex justify-between gap-5 items-start p-5 cursor-pointer select-none"
            onClick={() => {
              addLog("question");
              setSelected(selected === index ? false : index);
            }}
          >
            <p className="text-lg">{item.title}</p>
            <img
              style={{
                transform: selected === index && "rotate(90deg)",
              }}
              className="w-8 duration-150"
              src={qArrow}
              alt=""
            />
          </div>
          <div
            className={`overflow-hidden ${
              selected === index ? "h-auto" : "h-0"
            }`}
          >
            <p className="mx-5 mb-5 p-2 bg-white rounded-md text-gray-600">
              {item.des}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
