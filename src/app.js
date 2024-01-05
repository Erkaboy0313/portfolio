import React, { useState, useEffect } from "react";
import {
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaAngleDown,
  FaRobot,
  FaServer,
  FaLaptopCode,
  FaDownload
} from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import Typed from 'react-typed'
import axios from "axios";
import { saveAs } from 'file-saver'
export default function App() {
  const {t} =useTranslation();
  const language=[
    {
        code: 'uz',
        name: 'UZ',
        country_code: 'uz'
    },
    {
        code: 'en',
        name: 'EN',
        country_code: 'gb'
    },
    {
        code: 'ru',
        name: 'RU',
        country_code: 'ru'

    }
  ];
  const [filterProject,setFilterProject] = useState('all')
  const [active,SetActive] = useState(0)
  const [user,setUser] = useState({})
  const [menu,setMenu] = useState(false)
  const [projects,setProjects] = useState([]) 
  const [service,setService] = useState([])
  const [education,setEducation] = useState([])
  const [skill,setSkill] = useState([])
  const [experience,setExperience] = useState([])
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [body,setBody] = useState('')
  const [activeMenu,setActiveMenu] = useState('home')

  const findIcon = (icon) =>{
    if(icon === 'FaServer'){
      return (<FaServer className="icon"/>)
    }
    else if(icon === 'FaLaptopCode'){
      return (<FaLaptopCode className="icon"/>)
    }
    else if(icon === 'FaRobot'){
      return (<FaRobot className="icon"/>)
    }
  }

  function url(endpoint){
    // return `http://127.0.0.1:8000/api/${endpoint}`
    return `https://api.fayyozbekov.uz/api/${endpoint}`
  }

  function headers(){
    return {
      headers:{
        "Accept-Language":`${localStorage.getItem('lng')}`,
        "Authorization":'Token 3ef2992b639157540517f7ac618e89d4bd64c1dea0d15449bf73d9eb89f62148'
        // "Authorization":'Token 88b4cc2e6508c6b79ceeda5fd90a6c1d2b018a6914c8bf8bcfad7dadd426eb6c'
      }
    }
  }

  const sendMessage = ()=>{
    if (name && email && body){
      var data = {
        'name':name,
        'email':email,
        'subject':body
      }
      axios.post(url('cuntuct/'),data,headers()).then((res)=>{
        window.alert("Xabaringiz yuborildi")
        setName('')
        setEmail('')
        setBody('')
      }).catch((err)=>{
        console.log(err)
        window.alert('Xabaringiz yuborilmadi')
      })
    }
    else{
      window.alert('malumotlarni toldiring')
    }
  }
  const getDownloadFile = async (file) => {
    console.log(user)
    console.log(file)
    return axios.get(file, {
        responseType: 'blob',
    })
    .then((response)=>{
      saveAs(response.data, 'resume.pdf')
    }).catch((err) => {
      console.log(err)
    })
  }

  const getUserData = () =>{
    axios.get(url('portfolio/'),headers()).then((res)=>{
      setProjects(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })


    axios.get(url('userinfo/'),headers()).then((res)=>{    
      setUser(res.data) 
    }).catch((err)=>{
      console.log(err)
    })

    axios.get(url('education/'),headers()).then((res)=>{
      
      setEducation(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(url('service/'),headers()).then((res)=>{
      
      setService(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })


    axios.get(url('skill/'),headers()).then((res)=>{
      
      setSkill(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })


    axios.get(url('experiece/'),headers()).then((res)=>{
      
      setExperience(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    Aos.init({duration:1000});
    getUserData();
  },[])

    return (
      <div>
        <div className="container-fluid p-0">
          <div className="navigation-bar d-lg-none d-flex align-items-center">
            <div className="username">
              <p className="dropdown-toggle language" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{t('language')}:  {i18next.language}</p>
              <div className="dropdown">
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {
                    language.map(({code, name, country_code}) => (
                        <li className="dropdown-item" key={country_code} 
                            onClick={() => {
                              localStorage.setItem("lng", code);
                              getUserData();
                              i18next.changeLanguage(code);
                            }}>
                            {name}
                        </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="social-media d-lg-block d-md-block d-flex justify-content-end align-items-center">
              <a href="https://t.me/Fayyozbekov">
                <FaTelegram className="icon" />
              </a>
              <a href="https://www.linkedin.com/in/erkaboy-fayyozbekov-594a0220a/">
                <FaLinkedin className="icon" />
              </a>
              <a href="https://github.com/Erkaboy0313">
                <FaGithub className="icon" />
              </a>
            </div>
            <div className="menu-toggle d-flex justify-content-center">
              <div onClick={()=>setMenu(!menu)} className={menu ? "active" : ""}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          {menu ?           
          <div className="navigation-menu d-lg-none">
            <ul id="list-example2" className="list-group">
              <li onClick={()=>{setMenu(!menu);setActiveMenu('home')}} className={activeMenu === 'home' ? "active" : ''}>
                <a className="list-group-item list-group-item-action" href="#home">{t('home')}</a>
              </li>
              <li onClick={()=>{setMenu(!menu);setActiveMenu('about')}} className={activeMenu === 'about' ? "active" : ''}>
                <a className="list-group-item list-group-item-action" href="#about">{t('about')}</a>
              </li>
              <li onClick={()=>{setMenu(!menu);setActiveMenu('what')}} className={activeMenu === 'what' ? "active" : ''}>
                <a className="list-group-item list-group-item-action" href="#what">{t('what')}</a>
              </li>
              <li onClick={()=>{setMenu(!menu);setActiveMenu('resume')}} className={activeMenu === 'resume' ? "active" : ''}>
                <a className="list-group-item list-group-item-action" href="#resume">{t('resume')}</a>
              </li>
              <li onClick={()=>{setMenu(!menu);setActiveMenu('portfolio')}} className={activeMenu === 'portfolio' ? "active" : ''}>
                <a className="list-group-item list-group-item-action" href="#portfolio">{t('porfolio')}</a>
              </li>
              <li onClick={()=>{setMenu(!menu);setActiveMenu('contact')}} className={activeMenu === 'contact' ? "active" : ''}>
                <a className="list-group-item list-group-item-action" href="#contact">{t('contact')}</a>
              </li>

            </ul>
          </div> : ''}

          <div className="d-flex">
            <div className="navigation-panel d-lg-flex flex-column d-none">
              <div className="profile d-flex flex-column justify-content-center align-items-center ">
                <div className="profile-image">
                  <img
                    src="./images/me.jpg"
                    className="rounded-circle"
                    alt=""
                  />
                </div>
                <div className="profile-text">
                  <h3>{user.full_name}</h3>
                </div>
                <p className="dropdown-toggle language" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{t('language')}:  {i18next.language} </p>
                <div className="dropdown">
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                      language.map(({code, name, country_code}) => (
                          <li className="dropdown-item" key={country_code} 
                              onClick={() => {
                                localStorage.setItem("lng", code);
                                getUserData();
                                i18next.changeLanguage(code);
                              }}>
                              {name}
                          </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="navigation d-flex justify-content-center align-items-center">
                <ul id="list-example" className="list-group">
                <li onClick={()=>{setActiveMenu('home')}} className={activeMenu === 'home' ? "active" : ''}>
                  <a className="list-group-item list-group-item-action" href="#home">{t('home')}</a>
                </li>
                <li onClick={()=>{setActiveMenu('about')}} className={activeMenu === 'about' ? "active" : ''}>
                  <a className="list-group-item list-group-item-action" href="#about">{t('about')}</a>
                </li>
                <li onClick={()=>{setActiveMenu('what')}} className={activeMenu === 'what' ? "active" : ''}>
                  <a className="list-group-item list-group-item-action" href="#what">{t('what')}</a>
                </li>
                <li onClick={()=>{setActiveMenu('resume')}} className={activeMenu === 'resume' ? "active" : ''}>
                  <a className="list-group-item list-group-item-action" href="#resume">{t('resume')}</a>
                </li>
                <li onClick={()=>{setActiveMenu('portfolio')}} className={activeMenu === 'portfolio' ? "active" : ''}>
                  <a className="list-group-item list-group-item-action" href="#portfolio">{t('porfolio')}</a>
                </li>
                <li onClick={()=>{setActiveMenu('contact')}} className={activeMenu === 'contact' ? "active" : ''}>
                  <a className="list-group-item list-group-item-action" href="#contact">{t('contact')}</a>
                </li>
                </ul>
              </div>
              <div className="social-media d-flex justify-content-around align-content-center px-5">
                <a href="https://t.me/Fayyozbekov">
                  <FaTelegram className="icon" />
                </a>
                <a href="https://www.linkedin.com/in/erkaboy-fayyozbekov-594a0220a/">
                  <FaLinkedin className="icon" />
                </a>
                <a href="https://github.com/Erkaboy0313" blank="_">
                  <FaGithub className="icon" />
                </a>
              </div>
            </div>
            <div className="portfolio">
              <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" className="portfolio-container" tabIndex="0">
                <div id="home"   className="home d-flex flex-column align-items-center">
                  <div className="background"></div>
                  <div className="background-blur"></div>
                  <div data-aos="fade-down" className="home-text d-flex flex-column justify-content-center col-12">
                    <h3>{t("welcome")}</h3>
                    <h1><Typed
                      strings={[t('hello'),t('me1'),t('me2')]}
                      typeSpeed={50}
                      backSpeed={50}
                      loop
                    /></h1>
                    <h4>{t("address")}</h4>
                    <a href="#contact"><button type="button">{t('hire')}</button></a>
                  </div>
                  <div className="home-arrow">
                    <FaAngleDown className="icon" />
                  </div>
                </div>
                <div id="about" data-aos="zoom-in" className="about-me">
                  <div className="row">
                    <div className="header col-12">
                      <div className="background">{t("about2")}</div>
                      <div className="main">
                        <h1>{t("about3")}</h1>
                        <div></div>
                      </div>
                    </div>
                    <div className="body-1 col-lg-8 col-12">
                      <h2>
                        {t("i")} <span>{user.full_name},</span> {user.title}
                      </h2>
                      <p>
                        {user.bio}
                      </p>
                    </div>
                    <div className="body-2 col-lg-4 col-12">
                      <ul>
                        <li>
                          <b>{t('name')}:</b> {user.full_name}
                        </li>
                        <li>
                          <b>{t('email')}:</b> {user.email}
                        </li>
                        <li>
                          <b>{t('age')}:</b> {user.age}
                        </li>
                        <li>
                          <b>{t('from')}:</b> {user.address}
                        </li>
                      </ul>
                        <a href={user.cv} target="_blank" className="btn">{t("download")}<FaDownload/></a>
                          {/* <button onClick={()=>getDownloadFile(user.cv)} className="btn" type="button">
                            {t('download')}
                          </button> */}
                      </div>
                    <div className="statistics col-12 d-inline-flex justify-content-center">
                      <div className="item col-lg-3 col-6 border-right">
                        <h1>{user.experince}+</h1>
                        <p>{t('experience')}</p>
                      </div>
                      <div className="item col-lg-3 col-6">
                        <h1>{user.projects}+</h1>
                        <p>{t('projects')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="what"  className="ability">
                  <div data-aos="zoom-in" className="header col-12">
                    <div className="background">{t("what1")}</div>
                    <div className="main">
                      <h1>{t("what2")}</h1>
                      <div></div>
                    </div>
                  </div>

                  <div data-aos="zoom-in" className="row">
                    {service.map((item,index)=>{
                      return (
                      <div key={index} className="skill col-lg-6 col-md-6 col-12 d-flex align-items-center mt-3">
                        <div className="skill-icon">
                         {findIcon(item.icon)}
                        </div>
                        <div className="skill-description">
                          <h3>{item.title}</h3>
                          <p>{item.desciption}</p>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                </div>
                <div id="resume" data-aos="zoom-in" className="rusume">
                  <div className="header col-12">
                    <div className="background">{t("resume1")}</div>
                    <div className="main">
                      <h1>{t("resume2")}</h1>
                      <div></div>
                    </div>
                  </div>
                  <div className="row info">
                    <div className="education col-lg-6 col-md-6 col-12 ">
                      <h1>{t("myeducation")}</h1>
                      {education.map((item,index)=>{
                        return (
                          <div key={index} className="item">
                          <div className="duration">
                            {item.education_years}
                          </div>
                          <h3>{item.education_place}</h3>
                          <h6>{item.degree}</h6>
                          <p>{item.desciption}</p>
                        </div>
                        )
                      })}
                    </div>
                    <div className="experince col-lg-6 col-md-6 col-12 ">
                      <h1>{t("myexperience")}</h1>
                      {experience.map((item,index)=>{
                        return(
                          <div key={index} className="item">
                            <div className="duration">
                              {item.work_years}
                            </div>
                            <h3>{item.job_title}</h3>
                            <h6>{item.work_place}</h6>
                            <p>{item.desciption}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="row skills">
                    <h1>{t("skills")}</h1>
                    {skill.map((item,index)=>{
                      return(
                        <div key={index} data-aos="fade-up" className="col-lg-6 col-md-6 col-12 skill">
                          <div className="skill-info">
                            <p>{item.skill_name}</p>
                            <p>{item.percent}%</p>
                          </div>
                          <div className="skill-diagram">
                            <div className="diagram">
                              <div className="diagram-pointer" style={{width: item.percent+"%"}}>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  </div>
                  <div className="col-12 download ">
                    <a href={user.cv} target="_blank">
                      <button type="button">{t("download")}<FaDownload/></button>
                    </a>
                  </div>
                </div>
                <div id="portfolio" data-aos="zoom-in" className="projects" >
                  <div className="header col-12">
                    <div className="background">{t("portfolio1")}</div>
                    <div className="main">
                      <h1>{t("portfolio2")}</h1>
                      <div></div>
                    </div>
                  </div>
                    <div className="navigation d-flex justify-content-center align-items-center">
                      <ul className="list-unstyled">
                        <li className={filterProject === 'all' ? "active" : ""} onClick={()=> setFilterProject('all')}>{t("all")}</li>
                        <li className={filterProject === 'web' ? "active" : ""} onClick={()=> setFilterProject('web')}>{t("web")}</li>
                        <li className={filterProject === 'bot' ? "active" : ""} onClick={()=> setFilterProject('bot')}>{t("bot")}</li>
                      </ul>
                    </div>
                    <div className="row">     
                      { projects.map((item,index)=>{
                        return(
                          item.type === filterProject || filterProject === 'all' ?
                          <div key={index} onClick={() => SetActive(index) } data-bs-toggle="modal" data-bs-target="#exampleModal" data-aos="fade-up" className="col-lg-4 col-md-6 col-12" >
                            <div className="project">
                              <div className="imageContainer">
                                <img  src={item.image} alt=""/>
                              </div>
                              <div className="description">
                                <h3>{item.title}</h3>
                                <p>{item.type}</p>
                              </div>
                            </div>
                          </div>:
                          ""
                        )
                      }) }
                    </div>
                  </div>
                <div id="contact" className="contact">
                  <div data-aos="zoom-in" className="header col-12">
                    <div className="background">{t("contact1")}</div>
                    <div className="main">
                      <h1>{t("contact2")}</h1>
                      <div></div>
                    </div>
                  </div>
                  <div data-aos="zoom-in" className="container">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 info">
                        <h3>{t("contact3")}</h3>
                        <p>{user.address}</p>
                        <p>+998 93 787 4661</p>
                        <p>fayyozbekov20@gmail.com</p>
                      </div>
                      <div className="col-lg-9 col-md-9 col-12 send">
                        <h3>{t("send")}</h3>
                        <div className="col-lg-6 col-md-6 col-12 d-inline-block name">
                          <input value={name} onChange={(e)=>setName(e.target.value)} type="text"  placeholder={t("placeholder1")}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 d-inline-block email">
                          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email"  placeholder={t("placeholder2")}/>
                        </div>
                        <div className="col-12 mt-3">
                          <textarea value={body} onChange={(e)=>setBody(e.target.value)} rows="10" cols="30" placeholder={t("placeholder3")}></textarea>
                        </div>
                        <div className="col-12 mt-3 d-flex justify-content-center">
                          <button onClick={sendMessage} type="button">{t("send")}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="copyright">
                  <div className="text">
                    <p>Copyright © 2023 Erkaboy. All Rights Reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {projects.length > 0 ? 
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{projects[active].title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex flex-lg-row flex-md-row flex-column">
                <div className="modal-image col-lg-4 col-md-4 col-12 p-3">
                  <img className="img-fluid rounded" src={projects[active].image} alt=""/>
                </div>
                <div className="modal-description col-lg-8 col-md-8 col-12 p-3">
                  <p>
                    {projects[active].desciption}
                  </p>
                    {projects[active].type === 'web'?
                      <p className="siteName">
                        {t('project_url')}
                        <a href={projects[active].url}>
                          {projects[active].title}
                        </a>
                      </p>
                    :
                    <p className="siteName">
                      {t('bot_url')}
                      <a href={projects[active].url}>
                        {projects[active].title}
                      </a>
                    </p>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        : ""}
      </div>
      
    );
  
}
