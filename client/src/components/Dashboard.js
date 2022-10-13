import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import '../style/dashboard.css';

function Cards({ query }) {
  const { data: userList, isLoading, refetch } = useQuery(['user', query], () => fetch(query).then((res) => res.json()))

  return (
    <>
      <h2>{(userList || []).length + ' utilisateur(s) trouvé(s)'}</h2>
      <div className={'container'}>
        {(userList || []).map(item => (
          <div className={'card'}>
            <img className={'cardimg'} src='/icon-santa.png' alt={'santa claus'} />
            <div className={'cardcontent'}>
              <p>Né(e) le : {item.dob}</p>
              <h3>{item.name}</h3>
              <p className={'email'}>{item.email}</p>
            </div>
            <div className={'cardfooter'}>
              <h3>Cadeaux</h3>
              <a className={'click-arrow'} href="#"><img className={'icon'} alt={'right-arrow'} src='/right-arrow.png' /></a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const Dashboard = () => {
  const { register, reset, formState: { errors } } = useForm();
  const [query, setQuery] = useState("http://localhost:3000/users")
  const HandleChange = useCallback(
    (e) => {
      console.log(e.target.value)
      setQuery('http://localhost:3000/users/' + e.target.value)
    },
    [],
  )


  const onSubmit = (event) => {
    event.preventDefault()
    setQuery('http://localhost:3000/users/' + event.currentTarget[0].value)

    // reset();
  }

  return (
    <>
      <h1>Liste des utilisateurs</h1>
      <form onSubmit={onSubmit}>
        <div className={'divInputCreate'}>
          <div>
            <img className={'book'} alt={'right-arrow'} src='/right-arrow.png' />
          </div>
          <input
            {...register('newtodo', {})}
            type='text'
            id='searchUser'
            autoComplete='off'
            placeholder='Recherche'
            onChange={(e) => HandleChange(e)}

          />
        </div>
        <button type='submit' className={'btnAdd'} >Rechercher</button>
      </form>
      <Cards query={query}></Cards>
    </>
  )
}

export default Dashboard;