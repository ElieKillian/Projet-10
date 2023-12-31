import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // const byDateDesc = data?.focus.sort((evtA, evtB) =>
  //   new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  // );
  const byDateDesc = data?.focus.sort((a, b) => new Date(b.date) - new Date(a.date)); // changement de la variable pour obtenir au plus récent au plus vieux
  const nextCard = () => {
    setTimeout(
       () =>  byDateDesc ? setIndex(index < byDateDesc.length - 1 ? index + 1 : 0) : null, // ici ajout d'un -1 à la length afin d'éliminer la slide blanche // ajout d'un élément bydatedesc ? à la base, avec null en seconde option, afin d'éliminer l'erreur unedified
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3 key={event.title}>{event.title}</h3>
                <p key={event.description}>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((item, radioIdx) => (
                <input
                  key={item.title} // remplacement de event.id par item.title
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // ici remplacement d'idx par index, pour avoir la bonne correspondance
                  onChange={nextCard} // ajout d'un onChange 
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
