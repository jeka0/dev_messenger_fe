import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth.js';
import { TextField, Box, Button } from '@material-ui/core';
import UserInfo from '../userInfo/userInfo.js';
import Container from '../container/container.js';
import MenuBlock from '../menu_block/menu_block.js';
import Modal from '../Modal/modal.js';
import ModalForm from '../modal-form/modal-form.js';
import { MenuItem } from '@material-ui/core';
import { getUserCommunitys } from '../../services/communityService.js';
import { getUserById } from '../../services/userService.js';
import { getUserSkills, deleteSkill, createSkill } from '../../services/skillService.js';
import { getUserEducations, createEducation, deleteEducation} from '../../services/educationService.js'
import deleteImg from '../../img/delete.png';
import plusImg from '../../img/plus.png';
import './user.css'

function User() {
  const { id } = useParams();
  const { user } = useAuth();
  const [nowUser, setUser] = useState();
  const [communitys, setCommunitys] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalActiveE, setIsModalActiveE] = useState(false);
  const [isAddSkillActive, setIsAddSkillActive] = useState(false);
  const [isAddEduActive, setIsAddEduActive] = useState(false);
  const [deleteSkillId, setDeleteSkillId] = useState();
  const [deleteEducationId, setDeleteEducationId] = useState();
  const [skillError, setSkillError] = useState({isError:false, mess:""});
  const [skillForm, setSkillForm] = useState({name:""});
  const [eduForm, setEduForm] = useState({institution_name:'', Speciality:"", start_year:"", end_year:""});
  const [eduError, setEduError] = useState({isError:false, mess:""});
  const [skills, setSkills] = useState([]);
  const [educations, setEducations] = useState([]);

  useEffect(()=> {
    init();
  }, [id])

  const init = async ()=>{
    setUser(await getUserById(id));
    setCommunitys(await getUserCommunitys(id));
    setSkills(await getUserSkills(id));
    setEducations(await getUserEducations(id));
  }

  const startModal = (id)=>{
    setDeleteSkillId(id);
    setIsModalActive(true);
  }

  const startModalE = (id)=>{
    setDeleteEducationId(id);
    setIsModalActiveE(true);
  }

  const startAddSkillModal = ()=>{
    setIsAddSkillActive(true);
  }

  const delete_skill = ()=>{
    deleteSkill(deleteSkillId).then(async ()=>{
      setSkills(await getUserSkills(id));
      setDeleteSkillId(undefined);
      setIsModalActive(false);
    })
  }

  const delete_education = ()=>{
    deleteEducation(deleteEducationId).then(async ()=>{
      setEducations(await getUserEducations(id));
      setDeleteEducationId(undefined);
      setIsModalActiveE(false);
    })
  }

  const updateSkillName = (event)=>{
    setSkillError({isError:false, mess:""});
    setSkillForm({[event.target.name]: event.target.value})
  }

  const updateEduForm = (event)=>{
    setEduError(false);
    setEduForm({...eduForm,  [event.target.name]: event.target.value})
  }

  const SendSkill = ()=>{
    if(!skillForm.name || skillForm.name===''){
      setSkillError({isError:true, mess:"Skill name can't be empty"});
      return;
    }

    createSkill(skillForm).then(async ()=>{
      setSkills(await getUserSkills(id));
      setIsAddSkillActive(false);
      setSkillForm({name:""});
    }).catch(err=>{
      setSkillError({isError:true, mess:err.response.data});
    })
  }

  const SendEdu = ()=>{
    if(eduForm.institution_name === "" || eduForm.Speciality === "" ||eduForm.start_year === "" ||eduForm.end_year === ""){
      setEduError({isError:true, mess:"Input fields must be filled"});
      return;
    }

    eduForm.start_year = Number(eduForm.start_year);
    eduForm.end_year = Number(eduForm.end_year);

    if(eduForm.start_year < 1900 ||eduForm.end_year < 1900){
      setEduError({isError:true, mess:"Invalid year format"});
      return;
    }

    createEducation(eduForm).then(async ()=>{
      setEducations(await getUserEducations(id));
      setIsAddEduActive(false);
      setEduForm({institution_name:'', Speciality:"", start_year:"", end_year:""})
    }).catch(err=>{
      setEduError({isError:true, mess:err.response.data});
    })
  }

  if(!nowUser) return (<div>Loading</div>)

      return (
          <div className="user-content">
            <UserInfo className="user-info" user = { nowUser } edit={user.id===nowUser.id}/>
            <hr/>
            <div className="additional-information">
             <Container className="user-cont">
                <div className="user_education-info">
                  <h3>Educations</h3>
                  {user.id===nowUser.id && <input className='add-education' type="image" src={plusImg} alt="Кнопка «menu»" onClick={()=>setIsAddEduActive(true)}/>}
                </div>
                <div className="user-educations-list">
                  {educations.length?educations.map(education=><div className="user-education" key={education.id}>
                    <div className="user_education-info">
                      <div className='user_education-texts'>
                        <h3>{education.institution_name}</h3>
                        <h4>{education.Speciality}</h4>
                        <h5>{`${education.start_year}-${education.end_year}`}</h5>
                      </div>
                      {user.id===nowUser.id && <input className='delete-skill' type="image" src={deleteImg} alt="Кнопка «menu»" onClick={()=>startModalE(education.id)}/>}
                    </div>
                    <hr/>
                  </div>):<MenuItem>No Educations</MenuItem>}
                </div>
              </Container>
              <Container className="user-cont">
                <div className="user_skill-info">
                  <h3>Skills</h3>
                  {user.id===nowUser.id && <input className='add-skill' type="image" src={plusImg} alt="Кнопка «menu»" onClick={startAddSkillModal}/>}
                </div>
                <div className="user-skills-list">
                  {skills.length?skills.map(skill=><div className="user-skill" key={skill.id}>
                    <div className="user_skill-info">
                      <h4>{skill.name}</h4>
                      {user.id===nowUser.id && <input className='delete-skill' type="image" src={deleteImg} alt="Кнопка «menu»" onClick={()=>startModal(skill.id)}/>}
                    </div>
                    <hr/>
                  </div>):<MenuItem>No Skills</MenuItem>}
                </div>
              </Container>
              <Container className="user-interests">
                <h3>Interests</h3>
                <div className="user-communitys-list">
                  {communitys.length?communitys.map(community=><Link className='user-community' to={`/community/${community.id}`} key={community.id}><MenuBlock name={community.name} image={community.image} /></Link>):<MenuItem className='no-communitys'>No Communitys</MenuItem>}
                </div>
              </Container>
            </div>
            <Modal active={isModalActive} setActive={setIsModalActive} text="Are you sure you want to delete the skill?" 
                confirmationButtonText="Delete" confirmation = {delete_skill} />
              <Modal active={isModalActiveE} setActive={setIsModalActiveE} text="Are you sure you want to delete the education?" 
                confirmationButtonText="Delete" confirmation = {delete_education} />
            <ModalForm active={isAddSkillActive} setActive={setIsAddSkillActive}>
              <h2>Adding user skill</h2>
              <Box className = "form-margin">
                <TextField 
                  className = "skill-name" 
                  type = "text" 
                  name = "name" 
                  label = "Skill"
                  placeholder = "Enter skill name"
                  variant = "standard"
                  error={skillError.isError}
                  value={skillForm.name}
                  helperText={skillError.mess}
                  onChange = {updateSkillName}
                />
              </Box>
              <Box className = "form-margin">
                <Button className = "form-button" name = "submit" variant = "contained" onClick={SendSkill}>Add</Button>
              </Box>
              <Box className = "form-margin">
                <Button className = "form-button" name = "exit" variant = "contained" onClick={()=>{setIsAddSkillActive(false); setSkillForm({name:""});}}>Cancel</Button>
              </Box>
            </ModalForm>

            <ModalForm active={isAddEduActive} setActive={setIsAddEduActive}>
            <h2>Adding user education</h2>
              <Box className = "form-margin">
                <TextField 
                  type = "text" 
                  name = "institution_name" 
                  label = "Institution name"
                  placeholder = "Enter institution name"
                  variant = "standard"
                  error={eduError.isError}
                  value={eduForm.institution_name}
                  helperText={eduError.isError?eduError.mess:""}
                  onChange = {updateEduForm}
                />
              </Box>
              <Box className = "form-margin">
                <TextField 
                  type = "text" 
                  name = "Speciality" 
                  label = "Speciality"
                  placeholder = "Enter speciality"
                  variant = "standard"
                  error={eduError.isError}
                  value={eduForm.Speciality}
                  helperText={eduError.isError?eduError.mess:""}
                  onChange = {updateEduForm}
                />
              </Box>
              <Box className = "form-margin">
                <TextField
                  name="start_year"
                  label="Start year"
                  placeholder = "Enter start year"
                  type="number"
                  variant="standard"
                  error={eduError.isError}
                  value={eduForm.start_year}
                  helperText={eduError.isError?eduError.mess:""}
                  onChange = {updateEduForm}
                />
              </Box>
              <Box className = "form-margin">
                <TextField
                  name="end_year"
                  label="End year"
                  placeholder = "Enter end year"
                  type="number"
                  variant="standard"
                  error={eduError.isError}
                  value={eduForm.end_year}
                  helperText={eduError.isError?eduError.mess:""}
                  onChange = {updateEduForm}
                />
              </Box>
              <Box className = "form-margin">
                <Button className = "form-button" name = "submit" variant = "contained" onClick={SendEdu}>Add</Button>
              </Box>
              <Box className = "form-margin">
                <Button className = "form-button" name = "exit" variant = "contained" onClick={()=>{setIsAddEduActive(false); setEduForm({institution_name:'', Speciality:"", start_year:"", end_year:""});}}>Cancel</Button>
              </Box>
            </ModalForm>
          </div>
      );
    }
    
    export default User;
