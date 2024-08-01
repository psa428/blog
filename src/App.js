import { Routes, Route } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
 import { Header} from './components';
 import { Post } from './pages/post/post';
 import { Autorization, Users } from './pages';
 import { Registration } from './pages';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { Modal } from './components/modal/modal';

const AppColumn = styled.div`
  display:  flex;
  flex-direction: column;
  justify-content:  space-between;
  width:  1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  
`;

const Page = styled.div`
  padding:  120px 0 20px;
`;

const H2 = styled.h2`
  text-align:  center;
`;



const Footer = () => <div>Футер</div>;

const StyleHeader = styled(Header)`
  height: 120px;
`;

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    };  

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(setUser({
      ...currentUserData,
      roleId: Number(currentUserData.roleId),
    
  }));

  }, [dispatch]);
  return (
    <AppColumn>
      
      <StyleHeader />
      <Page>
      
          <H2>Контент страницы</H2>
          <Routes>
            <Route path='/' element={<div>Главная страница</div>} />
            <Route path='/login' element={<Autorization />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/users' element={<Users />} />
            <Route path='/post' element={<div>Новая статья</div>} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='*' element={<div>Ошибка</div>} />


          </Routes>
      </Page>
      <Footer />
      <Modal />
    
    </AppColumn>
  );
}

export default App;
