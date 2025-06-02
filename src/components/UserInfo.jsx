import { useEffect, useRef, useState } from "react";

function UserInfo({ info, load }) {

    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const resetRotation = () => {
        cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    useEffect(() => {
        const loadElements = document.querySelectorAll(".load");
        const nameElements = document.querySelectorAll('.pop');
        const info_id = document.getElementById('info-id');

        loadElements.forEach(el => {
            el.style.display = load ? "block" : "none";
        });
        info_id.style.display = !load ? "flex" : "none";

        nameElements.forEach(el => {
            el.style.display = !load ? "block" : "none";
        })
    }, [load]);

    return (
        <section className="card">
            <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={resetRotation} id="user-info" className="user-info">
                <div className="user-info-img">
                    <div className="load-img load"></div>
                    <img className="pop" src={info.gender == 'male' ? 'src/assets/wallpaperflare.com_wallpaper.jpg' :
                        'img/natalya-letunova-FWxEbL34i4Y-unsplash.jpg'} alt="" />
                </div>
                <div className="user-info-text">
                    <div className="load-h1 load"></div>
                    <h1 id="info-id" className="info-id"><span>#</span>{info.id}</h1>
                    <div className="user-text">
                        <div className="load"></div>

                        <p className="pop"><span>Name: </span>{info.name ? info.name : info.title}</p>
                        <div className="load"></div>

                        <p className="pop"><span>Lastname:</span> {info.lastname}</p>
                        <div className="load"></div>

                        <p className="pop"><span>Age:</span> {info.age}</p>
                        <div className="load"></div>

                        <p className="pop"><span>Gender:</span> {info.gender}</p>
                        <div className="load"></div>

                        <p className="pop"><span>Country</span> {info.country}</p>
                        <div className="load"></div>

                        {info.isDeveloper == true ? <p className="pop">Developer</p> : <p className="pop">Not Developer</p>}
                    </div>
                </div>
            </div>

            {/* <div className="colors"></div>
            <div className="colors"></div>
            <div className="colors"></div> */}
        </section>
    );
}

export default UserInfo;