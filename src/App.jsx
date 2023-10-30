import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [isler, setIsler] = useState(
    JSON.parse(localStorage.getItem("isler")) ?? []
  );
  const inputRef = useRef(0);
  const zamanRef = useRef(0);
  const ekle = () => {
    const eklenen = inputRef.current.value.trim();
    const zaman = zamanRef.current.value;
    if (eklenen === "") return;
    if (Date.parse(zaman) - Date.now() < 0) {
      alert("İleri bir tarih seçilmeli");
      return;
    }
    setIsler((x) => [
      { id: uuidv4(), txt: eklenen, bitti: false, zaman },
      ...x,
    ]);
  };
  const sil = (id) => {
    setIsler((isler) => isler.filter((is) => is.id !== id));
  };
  const bitti = (id) => {
    let yeniDizi = [];
    for (let is of isler) {
      if (is.id === id) is.bitti = !is.bitti;
      yeniDizi.push(is);
    }
    setIsler(yeniDizi);
  };
  useEffect(() => {
    localStorage.setItem("isler", JSON.stringify(isler));
    inputRef.current.value = "";
    zamanRef.current.value = "";
  }, [isler]);
  return (
    <div className="header">
      <div className="navbar">
        <input ref={inputRef} placeholder="Yapılacak iş..." type="text" />
        <input ref={zamanRef} type="datetime-local" />
        <button className="buton-ekle" onClick={ekle}>
          Ekle
        </button>
      </div>
      <div className="">
        <ul className="ul-app">
          {isler.map((is) => (
            <div className={is.bitti ? `bitti` : ""} key={is.id}>
              <div className="to-do">
                {is.txt}
                <div className="aa">
                  {/* {(
                  (Date.parse(is.zaman) - Date.now()) /
                  (1000 * 60 * 60 * 24)
                ).toFixed(2)}
                gün kaldı */}
                  <button className="buton-bitti" onClick={() => bitti(is.id)}>
                    Yapıldı
                  </button>
                  <button className="buton-sil" onClick={() => sil(is.id)}>
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
