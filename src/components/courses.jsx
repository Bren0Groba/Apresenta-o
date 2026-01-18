import { useState } from "react";
import { useTranslation } from "react-i18next";
import python from '../assets/pythonLogo.png'
import reactLogo from '../assets/reactLogo.png'
import hardware from '../assets/hardware.png'
import database from '../assets/database.png'
import nodejs from '../assets/nodejs.png'
import csharp from '../assets/c-sharp.png'
import activedirectory from '../assets/active-directory.png'
import dash from '../assets/dash.png'
import rpa from '../assets/rpa.png'
import suporte from '../assets/suporte.png'
import powerBI from '../assets/powerBI.png'


function Courses() {
    const { t } = useTranslation();
    const [cursoAberto, setCursoAberto] = useState(null);

    const cursos = [
        {
            img: python,
            id: 1,
            titulo: t("cursos.list.curso1.title"),
            descricao: t("cursos.list.curso1.description"),
            horas: t("cursos.list.curso1.duration"),
            link: t("cursos.list.curso1.link"),
        },
        {
            img: reactLogo,
            id: 2,
            titulo: t("cursos.list.curso2.title"),
            descricao: t("cursos.list.curso2.description"),
            horas: t("cursos.list.curso2.duration"),
            link: t("cursos.list.curso2.link"),
        },
        {
            img: hardware,
            id: 3,
            titulo: t("cursos.list.curso3.title"),
            descricao: t("cursos.list.curso3.description"),
            horas: t("cursos.list.curso3.duration"),
            link: t("cursos.list.curso3.link"),
        },
        {
            img: suporte,
            id: 4,
            titulo: t("cursos.list.curso4.title"),
            descricao: t("cursos.list.curso4.description"),
            horas: t("cursos.list.curso4.duration"),
            link: t("cursos.list.curso4.link"),
        },
        {
            img: dash,
            id: 5,
            titulo: t("cursos.list.curso5.title"),
            descricao: t("cursos.list.curso5.description"),
            horas: t("cursos.list.curso5.duration"),
            link: t("cursos.list.curso5.link"),
        },
        {
            img: rpa,
            id: 6,
            titulo: t("cursos.list.curso6.title"),
            descricao: t("cursos.list.curso6.description"),
            horas: t("cursos.list.curso6.duration"),
            link: t("cursos.list.curso6.link"),
        },
        {
            img: database,
            id: 7,
            titulo: t("cursos.list.curso7.title"),
            descricao: t("cursos.list.curso7.description"),
            horas: t("cursos.list.curso7.duration"),
            link: t("cursos.list.curso7.link"),
        },
        {
            img: nodejs,
            id: 8,
            titulo: t("cursos.list.curso8.title"),
            descricao: t("cursos.list.curso8.description"),
            horas: t("cursos.list.curso8.duration"),
            link: t("cursos.list.curso8.link"),
        },
        {
            img: csharp,
            id: 9,
            titulo: t("cursos.list.curso9.title"),
            descricao: t("cursos.list.curso9.description"),
            horas: t("cursos.list.curso9.duration"),
            link: t("cursos.list.curso9.link"),
        },
        {
            img: activedirectory,
            id: 10,
            titulo: t("cursos.list.curso10.title"),
            descricao: t("cursos.list.curso10.description"),
            horas: t("cursos.list.curso10.duration"),
            link: t("cursos.list.curso10.link"),
        },
         {
            img: powerBI,
            id: 11,
            titulo: t("cursos.list.curso11.title"),
            descricao: t("cursos.list.curso11.description"),
            horas: t("cursos.list.curso11.duration"),
            link: t("cursos.list.curso11.link"),
        },
    ];

    function handleClick(id) {
        setCursoAberto(cursoAberto === id ? null : id);
    }

    return (

        <div className="courses">
            <div className="linha-vermelha" />
            
            <h2>{t("courses.title")}</h2>
            <p>{t("courses.description")}</p>

            {cursos.map((curso) => (
                <div
                    key={curso.id}
                    className={`card ${cursoAberto === curso.id ? "aberto" : ""}`}
                >
                    <div
                        className="card-header"
                        onClick={() => handleClick(curso.id)}
                    >   
                    <img src={curso.img} alt="teste" className="imgCourses"/>
                        <h1>{curso.titulo}</h1>
                        <span className="seta">▲</span>
                    </div>

                    {cursoAberto === curso.id && (
                        <div className="card-body">
                            <p>{curso.descricao}</p>

                            <div className="card-footer">
                                <a href={curso.link} target="_blank">LINK TO ACCESS</a>
                                <span>{curso.horas}</span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}


export default Courses