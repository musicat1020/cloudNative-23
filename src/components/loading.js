import styled, { keyframes } from "styled-components";

const spin = keyframes`
	0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
`;

const Spinner = styled.div`
	border: 7px solid #f3f3f3;
	border-top: 7px solid #AD5625;
	border-radius: 50%;
	width: 100px;
	height: 100px;
	animation: ${spin} 1.5s linear infinite;
`;

function Loading () {
	return (
		<LoadingContainer>
			<Spinner/>
		</LoadingContainer>
	);
}

export default Loading;
