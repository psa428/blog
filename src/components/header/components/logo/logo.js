import styled from 'styled-components';
import { FcCollapse } from 'react-icons/fc';

const LargeText = styled.div`
    font-size:  32px;
    font-weight:    bold;
`;

const SmallText = styled.div`
    font-size:  18px;
    font-weight:    bold;
`;

const LogoContainer = ({ className }) => (
    <div className={className}>
        <i class="fc FcCollapse" aria-hidden="true"></i>
        <div>
            <LargeText>Блог</LargeText>
            <SmallText>веб-разработчика</SmallText>

        </div>
    </div>
);

export const Logo = styled(LogoContainer)`
    display:    flex;  
    margin-top: -14px; 
`;