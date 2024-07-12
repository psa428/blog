import styled from "styled-components";

const RightAligned = styled.div`
    display:    flex;
    justify-content:    flex-end;

`;

const ControlPanelContainer = ({ className }) => {
    return (
        <div className={className}>
            <RightAligned>
                <button>Войти</button>
            </RightAligned>
            <RightAligned>
                <button>2</button>
            </RightAligned>

        </div>    
    );    

};

export const ControlPanel = styled(ControlPanelContainer)`

`;
