import { Routes, Route } from 'react-router-dom';
 import { Header} from './components';
 import { Autorization, Registration } from './pages';
import styled from 'styled-components';

const AppColumn = styled.div`
  display:  flex;
  flex-direction: column;
  justify-content:  space-between;
  width:  1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  
`;

const Content = styled.div`
  padding:  120px 0;
`;

const H2 = styled.h2`
  text-align:  center;
`;



const Footer = () => <div>Футер</div>;

const StyleHeader = styled(Header)`
  height: 120px;
`;

function App() {
  return (
    <AppColumn>
      
      <StyleHeader />
      <Content>
      
          <H2>Контент страницы</H2>
          <Routes>
            <Route path='/' element={<div>Главная страница</div>} />
            <Route path='/login' element={<Autorization />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/users' element={<div>Пользователи</div>} />
            <Route path='/post' element={<div>Новая статья</div>} />
            <Route path='/post/:postId' element={<div>Статья</div>} />
            <Route path='*' element={<div>Ошибка</div>} />


          </Routes>
      </Content>
      <Footer />
    
    </AppColumn>
  );
}

export default App;
