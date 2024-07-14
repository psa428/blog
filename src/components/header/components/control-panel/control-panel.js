import { Link, useNavigate } from 'react-router-dom';
import { Icon} from '../../../../components';
import styled from "styled-components";

const RightAligned = styled.div`
    display:    flex;
    justify-content:    flex-end;

`;

const StyledLink = styled(Link)`
    display:    flex;
    justify-content:    center;
    font-size:  10px;
    width:  100px;
    height: 20px;
   
    border: 1px solid #000;
    background-color:   #eee;
`;
const StyleButton = styled.div`
    cursor: pointer;
`;


const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    return (
        <div className={className}>
            <RightAligned>
                <StyledLink to="/login">Войти</StyledLink>
            </RightAligned>
            <RightAligned>
                <StyleButton onClick = {() => navigate(-1)}>
                    <Icon id="fa-backward" margin="10px 0 0 0" />
                </StyleButton>
                
                <Link to="/post"><Icon id="fa-file-text-o" margin="10px 0 0 17px" /></Link>
                <Link to="/users"><Icon id="fa-users" margin="10px 0 0 17px" /></Link>
                

            </RightAligned>

        </div>    
    );    

};

export const ControlPanel = styled(ControlPanelContainer)`

`;
