import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import '../style/dashboard.css';
import dayjs from 'dayjs';

function Cards(query){
  const { data: userList, isLoading,refetch } = useQuery('todos', () => fetch("http://localhost:3000/users").then((res) => res.json()))

  return (
      <>
      <h2>{(userList || []).length + ' utilisateur(s) trouvé(s)'}</h2>
      <div className={'container'}>
        {(userList || []).map(item => (
          <div className={'card'}>
            <img className={'cardimg'} src='/icon-santa.png' alt={'santa claus'}/>
            <div className={'cardcontent'}>
              {/*{setDob(item.dob.split('/'))}*/}
              {/*{console.log(dob)}*/}
              {/*<p>{dayjs(dob[2]+dob[1]+dob[0]).format('DD MMMM YYYY') }</p>*/}
              <p>Né(e) le : {item.dob}</p>
              <h3>{item.name}</h3>
              <p className={'email'}>{item.email}</p>
            </div>
            <div className={'cardfooter'}>
              <h3>Cadeaux</h3>
              {/*<a href="#"><i className="fa fa-arrow-circle-right cardreadme" style="font-size:24px"></i></a>*/}
              <a className={'click-arrow'} href="#"><img className={'icon'} alt={'right-arrow'} src='/right-arrow.png'/></a>
            </div>

            {/*<div className={'cardbutton'}>*/}
            {/*  /!*<i className="fa fa-envelope-open" style="font-size: 24px"></i>*!/*/}
            {/*  /!*<i className="fa fa-envelope-open" style="font-size: 24px"></i>*!/*/}
            {/*</div>*/}
          </div>
        ))}
      </div>
    </>
)}

const Dashboard = () => {
  const { register, reset, formState: { errors } } = useForm();
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState("http://localhost:3000/users")
  // const [dob, setDob] = useState([]);


  // useEffect(() => {
  //   setUsers(userList)
  // }, [userList]);

  // console.log(userList, users);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(search)
    //const { data: userSearchList, isLoading } = useQuery('todos2', () => fetch(``).then((res) => res.json()))
    setQuery(search)
    // if (search !== '') {
    //   // const { data: userSearchList, isLoading } = useQuery('todos', () => fetch(`http://localhost:3000/search?user=${search}`).then((res) => res.json()))
    //   refetch()
    //   setUsers(userSearchList)
    //
      reset();
    // }
  }

  return(
    <>
      <h1>Liste des utilisateurs</h1>
      <form onSubmit={ onSubmit }>
        <div className={ 'divInputCreate' }>
          <div>
            <img className={'book'} alt={'right-arrow'} src='/right-arrow.png'/>
          </div>
          <input
              { ...register('newtodo', {})}
              type='text'
              id='searchUser'
              autoComplete='off'
              placeholder='Recherche'
              onChange={ e => setSearch(e.target.value) }
          />
        </div>
        <button type='submit' className={ 'btnAdd' }>Rechercher</button>
      </form>
      <Cards></Cards>
      <p>Hello world 2</p>
    </>
  )
}

export default Dashboard;