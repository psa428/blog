import { SiZebpay } from "react-icons/si";
import styled from "styled-components";

const IconContainer = ({className, id}) => (
    <div className={className}>
        <i class={`fa ${id}`} aria-hidden="true"></i>
    </div>
);

export const Icon = styled(IconContainer)`
    font-size:  ${({size="24px"}) => size};
    margin-right:   ${({margin="0"}) => margin};
`;